import Debug from "debug";
import { messageBodyTypes } from '~/tesClient/constants';
import { Observable } from "rxjs";
import { share, skipWhile, takeWhile } from 'rxjs/operators';

import MessageParser from './MessageParser'

const debug = Debug("MessageResponder");

class MessageResponder {

    constructor({ tesSocket }) {
        this.tesSocket = tesSocket;
        this.listenForResponses();
        this.responseTypeSubscriberDict = {};
        this.pendingRequestIdSet = new Set([]);
    }

    listenForResponses = () => {
        this.messageObserver = new Observable((observer) => {
            debug('set on message');
            this.tesSocket.setOnMessage({
                onMessage: message => {
                    const {
                        incomingRequestId,
                        messageBodyType,
                        messageBodyContents
                    } =
                        MessageParser.parseMessage({ message });
                    debug('in parse: ' + incomingRequestId + ' ' +
                        messageBodyType + ' ' + messageBodyContents);
                    observer.next({
                        incomingRequestId,
                        messageBodyType,
                        messageBodyContents
                    });
                }
            });
        }).pipe(share())
    };

    subscribeCallbackToRequestId = ({
        expectedRequestId,
        requestIdCallback,
        responseMessageBodyType,
        responseTypeCallback
    }) => {
        this.pendingRequestIdSet.add(expectedRequestId);
        this.messageObserver.pipe(takeWhile(() => this.pendingRequestIdSet.has(
            expectedRequestId)))
        .subscribe(({
            incomingRequestId,
            messageBodyType,
            messageBodyContents
        }) => {
            debug('in id callback: ' + expectedRequestId + ' ' +
                incomingRequestId + ' ' + messageBodyType + ' ' +
                messageBodyContents);
            if (incomingRequestId === 0) {
                // Only fallback when requestId is default value.
                if (responseMessageBodyType !== undefined &&
                    responseTypeCallback !== undefined &&
                    responseMessageBodyType === messageBodyType) {
                    responseTypeCallback(messageBodyContents);
                }
            } else if(incomingRequestId === expectedRequestId &&
                      requestIdCallback !== undefined) {
                if (this.pendingRequestIdSet.has(incomingRequestId)) {
                    this.pendingRequestIdSet.delete(incomingRequestId);
                    requestIdCallback(messageBodyContents);
                }
            }
        });
    };

    subscribePlaceholderCallback = () => {
        this.messageObserver.pipe(skipWhile(() => true))
            .subscribe(({
            incomingRequestId,
            messageBodyType,
            messageBodyContents
        }) => {});
    };

    subscribeCallbackToResponseType = ({
        responseMessageBodyType,
        responseTypeCallback
    }) => {
        if (responseMessageBodyType in this.responseTypeSubscriberDict) {
            this.unsubscribeCallbackFromResponseType({
                responseMessageBodyType
            })
        }
        let subscriber = this.messageObserver.subscribe(({
            incomingRequestId,
            messageBodyType,
            messageBodyContents
        }) => {
            debug('in response callback: ' + incomingRequestId + ' ' +
                messageBodyType + ' ' + responseMessageBodyType);

            if (responseMessageBodyType !== undefined &&
                responseTypeCallback !== undefined &&
                responseMessageBodyType === messageBodyType) {
                // Only fallback when requestId is default value.
                if (responseMessageBodyType === messageBodyTypes.EXECUTION_REPORT
                    || incomingRequestId === 0
                ){
                    responseTypeCallback(messageBodyContents);
                }
            }

        });
        this.responseTypeSubscriberDict[responseMessageBodyType] = subscriber;
        return true;
    };

    unsubscribeCallbackFromResponseType = ({ responseMessageBodyType }) => {
        if (responseMessageBodyType in this.responseTypeSubscriberDict) {
            this.responseTypeSubscriberDict[
                responseMessageBodyType].unsubscribe();
            delete this.responseTypeSubscriberDict[responseMessageBodyType];
            return true;
        }
        return false;
    };
}

export default MessageResponder;
