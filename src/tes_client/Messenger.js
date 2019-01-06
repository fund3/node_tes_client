const capnp = require("capnp");
const msgs_capnp = require("~/CommunicationProtocol/TradeMessage.capnp");

import TesSocket from "./sockets/TesSocket";
import BackendSocket from "./sockets/BackendSocket";
import MessageSocket from "./sockets/MessageSocket";
import MessageResponder from './messages/MessageResponder'

class Messenger {
	constructor({ curve_server_key, tes_socket_endpoint, backend_socket_endpoint }) {
		this.tes_socket = new TesSocket({
			curve_server_key,
			socket_endpoint: tes_socket_endpoint
		});

		this.backend_socket = new BackendSocket({
			tes_socket: this.tes_socket,
			socket_endpoint: backend_socket_endpoint
		});

		this.message_socket = new MessageSocket({
			socket_endpoint: backend_socket_endpoint
		});

		this.message_responder = new MessageResponder();

		process.on("SIGINT", () => {
			this.cleanupSockets();
			process.exit();
		});

		this.connectSockets();
		this.listenForResponses()
	}

	cleanupSocket = ({ socket }) => {
		socket.emit("close_zmq_sockets");
	};

	cleanupSockets = () => {
		this.cleanupSocket({ socket: this.tes_socket.get() });
		this.cleanupSocket({ socket: this.backend_socket.get() });
	};

	connectSockets = () => {
		this.tes_socket.connect();
		this.backend_socket.connect();
		this.message_socket.connect();
	};

	listenForResponses = () => {
		this.tes_socket.setOnMessage({
			onMessage: message => this.message_responder.handleResponse({ message })
		});
	}

	serializeMessage = ({ message }) => capnp.serialize(msgs_capnp.TradeMessage, message)

	sendMessage = ({ message, response_message_body_type, onResponse }) => {
		this.message_responder.queueCallbackForResponse({
			callback: onResponse,
			response_message_body_type
		});
		const serialized_message = this.serializeMessage({ message });
		this.message_socket.sendSerializedMessage({ serialized_message });
	};
}

export default Messenger