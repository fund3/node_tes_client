import TesSocket from "~/tes_client/sockets/TesSocket";
import BackendSocket from "~/tes_client/sockets/BackendSocket";
import MessageSocket from "~/tes_client/sockets/MessageSocket";
import MessageResponder from "./MessageResponder";
import MessageSender from "./MessageSender";

class Messenger {
	
	constructor({ curve_server_key, tes_socket_endpoint, backend_socket_endpoint }) {
		this.initializeSockets({ curve_server_key, tes_socket_endpoint, backend_socket_endpoint });
		this.message_responder = new MessageResponder({ tes_socket: this.tes_socket });
		this.message_sender = new MessageSender({ message_socket: this.message_socket });
	}

	sendMessage = ({ message, response_message_body_type, onResponse }) => {
		this.message_responder.subscribeCallbackToResponseType({
			callback: onResponse,
			response_message_body_type
		});
		this.message_sender.sendMessage({ message });
	};

	initializeSockets = ({ curve_server_key, tes_socket_endpoint, backend_socket_endpoint }) => {
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

		process.on("SIGINT", () => {
			this.cleanupSockets();
			process.exit();
		});

		this.connectSockets();
	};

	cleanupSockets = () => {
		this.cleanupSocket({ socket: this.tes_socket.get() });
		this.cleanupSocket({ socket: this.backend_socket.get() });
	};

	cleanupSocket = ({ socket }) => {
		socket.emit("close_zmq_sockets");
	};

	connectSockets = () => {
		this.tes_socket.connect();
		this.backend_socket.connect();
		this.message_socket.connect();
	};
}

export default Messenger;
