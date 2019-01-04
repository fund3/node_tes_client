import capnp from "capnp";
import msgs_capnp from "~/CommunicationProtocol/TradeMessage.capnp";

import TesSocket from "./sockets/TesSocket";
import BackendSocket from "./sockets/BackendSocket";
import MessageSocket from "./sockets/MessageSocket";

import { message_body_types } from '~/tes_client/constants'

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

		process.on("SIGINT", () => {
			this.cleanupSockets();
			process.exit();
		});

		this.connectSockets();
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

	serializeMessage = ({ message }) => capnp.serialize(msgs_capnp.TradeMessage, message)

	sendMessage = ({ message, onResponse }) => {
        this.tes_socket.setOnMessage({
            onMessage: (message) => {
                const response = this.parseResponseFromMessage({ message });
                onResponse(response);
            }
        })
		const serialized_message = this.serializeMessage({ message });
		this.message_socket.sendSerializedMessage({ serialized_message });
	};

	parseResponseFromMessage = ({ message }) => {
		const { message_body_type, message_body_contents } = this.parseBinaryMessageBody({
			binary_message: message
		});
		return this.parseMessageBodyContents({ message_body_type, message_body_contents });
	};

	parseBinaryMessageBody = ({ binary_message }) => {
		const message = capnp.parse(msgs_capnp.TradeMessage, binary_message);
		const message_body = message.type.response.body;
		const message_body_type = Object.keys(message_body)[0];
		const message_body_contents = message_body[message_body_type];
		return { message_body_type, message_body_contents };
	};

	parseMessageBodyContents = ({ message_body_type, message_body_contents }) => {
		switch (message_body_type) {
			case message_body_types.LOGON_COMPLETE:
				const { success, message, clientAccounts } = message_body_contents;
				return { success, message, client_accounts: clientAccounts };

			case message_body_types.ACCOUNT_BALANCES_REPORT:
				const { accountInfo, balances } = message_body_contents;
				return { account_info: accountInfo, balances };

			case message_body_types.LOGOFF_COMPLETE:
				return message_body_contents

			default:
				return {};
		}
	};
}

export default Messenger