import { Observable } from "rxjs";
import { share } from 'rxjs/operators';

import MessageParser from './MessageParser'

class MessageResponder {

    constructor({ tesSocket }) {
        this.tesSocket = tesSocket;
        this.listenForResponses();
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
    }

    subscribeCallbackToResponseType = ({
        expectedRequestId,
        callback,
        responseMessageBodyType,
        responseTypeCallback
    }) => {
        let subscriber = this.messageObserver.subscribe(({
            incomingRequestId,
            messageBodyType,
            messageBodyContents
        }) => {
            if(incomingRequestId === expectedRequestId) {
                callback(messageBodyContents);
                subscriber.unsubscribe();
            } else if (responseMessageBodyType !== undefined &&
                       responseTypeCallback !== undefined &&
                       responseMessageBodyType === messageBodyType) {
                responseTypeCallback(messageBodyContents);
            }
        })
    }
}

export default MessageResponder;
