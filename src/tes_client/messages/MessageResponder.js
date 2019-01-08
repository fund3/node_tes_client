import { Observable } from "rxjs";

import MessageParser from './MessageParser'

class MessageResponder {

	constructor({ tes_socket }) {
		this.tes_socket = tes_socket
		this.listenForResponses()
	}

	listenForResponses = () => {
		this.message_observer = Observable.create((observer) => {
			this.tes_socket.setOnMessage({
				onMessage: message => {
					const { message_body_type, parsed_message_body_contents } = MessageParser.parseMessage({ message });
					observer.next({
						message_body_type,
						parsed_message_body_contents
					});
				}
			});
		})
	}

	subscribeCallbackToResponseType = ({ callback, response_message_body_type }) => {
		this.message_observer.subscribe(({ 
			message_body_type, 
			parsed_message_body_contents 
		}) => {
			if(message_body_type !== response_message_body_type) return;
			callback(parsed_message_body_contents) 
		})
	}
}

export default MessageResponder;