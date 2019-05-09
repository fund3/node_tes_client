import BackendSocket from "../sockets/BackendSocket";
import MessageResponder from "./MessageResponder";
import MessageSender from "./MessageSender";
import MessageSocket from "../sockets/MessageSocket";
import TesSocket from "../sockets/TesSocket";

class Messenger {
	
	constructor({ curveServerKey, tesSocketEndpoint, backendSocketEndpoint }) {
		this.initializeSockets({ curveServerKey, tesSocketEndpoint,
			backendSocketEndpoint });
		this.messageResponder = new MessageResponder({
			tesSocket: this.tesSocket });
		this.messageSender = new MessageSender({
			messageSocket: this.messageSocket });
	}

	sendMessage = ({
        message,
        expectedRequestId,
        requestIdCallback,
        responseMessageBodyType,
        responseTypeCallback
	}) => {
        this.messageResponder.subscribeCallbackToRequestId({
            expectedRequestId,
            requestIdCallback,
            responseMessageBodyType,
            responseTypeCallback
        });
        this.messageSender.sendMessage({ message });
    };

    subscribeCallbackToResponseType = ({
        responseMessageBodyType,
        responseTypeCallback
    }) => {
        this.messageResponder.subscribeCallbackToResponseType({
            responseMessageBodyType,
            responseTypeCallback
        });
    };

    unsubscribeCallbackFromResponseType = ({ responseMessageBodyType }) => {
        this.messageResponder.unsubscribeCallbackFromResponseType({
            responseMessageBodyType
        });
    };

    subscribePlaceholderCallback = () => {
        this.messageResponder.subscribePlaceholderCallback();
    };

    initializeSockets = ({
        curveServerKey,
        tesSocketEndpoint,
        backendSocketEndpoint
    }) => {
        this.tesSocket = new TesSocket({
            curveServerKey,
            socketEndpoint: tesSocketEndpoint
        });

        // Although there is no explicit reference to backend socket, messages
        // get sent to backendSocket from messageSocket via inproc address and
        // then the message gets routed to TES
        this.backendSocket = new BackendSocket({
            tesSocket: this.tesSocket,
            socketEndpoint: backendSocketEndpoint
        });

        this.messageSocket = new MessageSocket({
            socketEndpoint: backendSocketEndpoint
        });

        this.connectSockets();
    };

    cleanup = () => {
        this.cleanupSockets();
	};

    cleanupSockets = () => {
        this.tesSocket.close();
        this.backendSocket.close();
        this.messageSocket.close();
    };

    connectSockets = () => {
        this.tesSocket.connect();
        this.backendSocket.connect();
        this.messageSocket.connect();
    };
}

export default Messenger;
