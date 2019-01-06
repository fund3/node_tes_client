const capnp = require("capnp");
const msgs_capnp = require("~/CommunicationProtocol/TradeMessage.capnp");

class MessageSender {

    constructor({ message_socket }) {
        this.message_socket = message_socket
    }

    serializeMessage = ({ message }) => capnp.serialize(msgs_capnp.TradeMessage, message)

    sendMessage = ({ message }) => {
        const serialized_message = this.serializeMessage({ message });
        this.message_socket.sendSerializedMessage({ serialized_message });
    }
}

export default MessageSender;