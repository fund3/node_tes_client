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
					const { messageBodyType, parsedMessageBodyContents } =
						MessageParser.parseMessage({ message });
					observer.next({
						messageBodyType,
						parsedMessageBodyContents
					});
				}
			});
		}).pipe(share())
	}

	subscribeCallbackToResponseType =
        ({ callback, responseMessageBodyType }) => {
	        this.messageObserver.subscribe(({
                messageBodyType,
                parsedMessageBodyContents
		    }) => {
			    if(messageBodyType !== responseMessageBodyType) return;
			    callback(parsedMessageBodyContents);
		    })
	    }
}

export default MessageResponder;
