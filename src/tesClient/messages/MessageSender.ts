const capnp = require("capnp");
const msgsCapnp = require("omegaprotocol/TradeMessage.capnp");

class MessageSender {

    public messageSocket;

    constructor({ messageSocket }) {
        this.messageSocket = messageSocket
    };

    serializeMessage = ({ message }) => capnp.serialize(
        msgsCapnp.TradeMessage, message);

    sendMessage = ({ message }) => {
        const serializedMessage = this.serializeMessage({ message });
        this.messageSocket.sendSerializedMessage({ serializedMessage });
    };
}

export default MessageSender;
