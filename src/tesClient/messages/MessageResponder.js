import { Observable } from "rxjs";
import { share } from 'rxjs/operators';

import MessageParser from './MessageParser'

class MessageResponder {

    constructor({ tesSocket }) {
        this.tesSocket = tesSocket;
        this.listenForResponses();
        this.responseTypeSubscriberDict = {};
    }

    listenForResponses = () => {
        this.messageObserver = new Observable((observer) => {
            this.tesSocket.setOnMessage({
                onMessage: message => {
                    const {
                        incomingRequestId,
                        messageBodyType,
                        messageBodyContents
                    } =
                        MessageParser.parseMessage({ message });
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
        let subscriber = this.messageObserver.subscribe(({
            incomingRequestId,
            messageBodyType,
            messageBodyContents
        }) => {
            if (incomingRequestId === 0) {
                // Only fallback when requestId is default value.
                if (responseMessageBodyType !== undefined &&
                    responseTypeCallback !== undefined &&
                    responseMessageBodyType === messageBodyType) {
                    responseTypeCallback(messageBodyContents);
                }
            } else if(incomingRequestId === expectedRequestId &&
                      requestIdCallback !== undefined) {
                requestIdCallback(messageBodyContents);
                subscriber.unsubscribe();
            }
        })
    };

    subscribeCallbackToResponseType = ({
        responseMessageBodyType,
        responseTypeCallback
    }) => {
        let subscriber = this.messageObserver.subscribe(({
            incomingRequestId,
            messageBodyType,
            messageBodyContents
        }) => {
            if (incomingRequestId === 0) {
                // Only fallback when requestId is default value.
                if (responseMessageBodyType !== undefined &&
                    responseTypeCallback !== undefined &&
                    responseMessageBodyType === messageBodyType) {
                    responseTypeCallback(messageBodyContents);
                }
            }
        });
        this.responseTypeSubscriberDict[responseMessageBodyType] = subscriber;
    };

    unsubscribeCallbackFromResponseType = ({ responseMessageBodyType }) => {
        this.responseTypeSubscriberDict[responseMessageBodyType].unsubscribe();
        delete this.responseTypeSubscriberDict[responseMessageBodyType];
    };
}

export default MessageResponder;
