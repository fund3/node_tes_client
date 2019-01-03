import capnp from "capnp";
import msgs_capnp from "~/CommunicationProtocol/TradeMessage.capnp";

import TESSocket from "./sockets/TESSocket";
import BackendSocket from "./sockets/BackendSocket";
import MessageSocket from "./sockets/MessageSocket";

import { message_body_types } from '~/tes_client/constants'

class Messenger {

    constructor({
        curve_server_key,
        tes_socket_endpoint,
        backend_socket_endpoint,
    }) {
        this.tes_socket =
            new TESSocket({
                curve_server_key,
                socket_endpoint: tes_socket_endpoint
            });

        this.backend_socket =
            new BackendSocket({
                tes_socket: this.tes_socket,
                socket_endpoint: backend_socket_endpoint
            });

        this.message_socket =
            new MessageSocket({
                socket_endpoint: backend_socket_endpoint
            });

        process.on('SIGINT', () => {
            this.cleanupSockets()
            process.exit();
        });
    }

    cleanupSocket = ({ socket }) => {
        socket.emit("close_zmq_sockets");
    }

    cleanupSockets = () => {
        this.cleanupSocket({ socket: this.tes_socket.get() });
        this.cleanupSocket({ socket: this.backend_socket.get() });
    }

    parseResponseFromMessage = ({ message }) => {
        const { message_body_type, message_body_contents } = this.parseBinaryMessageBody({ binary_message: message })
        return this.parseMessageBodyContents({ message_body_type, message_body_contents })
    }

    parseBinaryMessageBody = ({ binary_message }) => {
        const message = capnp.parse(msgs_capnp.TradeMessage, binary_message);
        const message_body = message.type.response.body;
        const message_body_type = Object.keys(message_body)[0];
        const message_body_contents = message_body[message_body_type]
        return { message_body_type, message_body_contents }
    }

    parseMessageBodyContents = ({ message_body_type, message_body_contents }) => {
        switch (message_body_type) {
            case message_body_types.LOGON_COMPLETE:
                const { success, message, clientAccounts } = message_body_contents
                return { success, message, client_accounts: clientAccounts }

            case message_body_types.ACCOUNT_BALANCES_REPORT:
                const { accountInfo, balances } = message_body_contents
                return { account_info: accountInfo, balances }

            default: return {}
        }
    }

    activateSockets = ({ onResponse }) => {
        this.tes_socket.activate({ 
            onMessage: (message) => {
                const response = this.parseResponseFromMessage({ message });
                onResponse(response);
            }
        })
        this.backend_socket.activate()
        this.message_socket.activate()
    }

    sendMessage = ({ message, onResponse }) => {
        this.activateSockets({ onResponse })
        const serialized_message = this.serializeMessage({ message })
        this.message_socket.sendSerializedMessage({ serialized_message });
    }

    serializeMessage = ({ message }) => capnp.serialize(msgs_capnp.TradeMessage, message);
}

export default Messenger