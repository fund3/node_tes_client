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

	initializeSockets = ({ curveServerKey, tesSocketEndpoint,
							 backendSocketEndpoint }) => {
		this.tesSocket = new TesSocket({
			curveServerKey,
			socketEndpoint: tesSocketEndpoint
		});

		this.backendSocket = new BackendSocket({
			tesSocket: this.tesSocket,
			socketEndpoint: backendSocketEndpoint
		});

		this.messageSocket = new MessageSocket({
			socketEndpoint: backendSocketEndpoint
		});

		process.on("SIGINT", () => {
			this.cleanupSockets();
			process.exit();
		});

		this.connectSockets();
	};

	cleanupSockets = () => {
		this.cleanupSocket({ socket: this.tesSocket.get() });
		this.cleanupSocket({ socket: this.backendSocket.get() });
		this.cleanupSocket({ socket: this.messageSocket.get() });
	};

	cleanupSocket = ({ socket }) => {
		socket.emit("close_zmq_sockets");
	};

	connectSockets = () => {
		this.tesSocket.connect();
		this.backendSocket.connect();
		this.messageSocket.connect();
	};
}

export default Messenger;
