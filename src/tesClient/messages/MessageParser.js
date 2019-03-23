const capnp = require("capnp");
import { messageBodyTypes } from "../constants/index";
const msgsCapnp = require("@fund3/communicationprotocol/TradeMessage.capnp");

class MessageParser {

    static parseMessage = ({ message }) => {
        const { incomingRequestId, messageBodyType, messageBodyContents } =
            MessageParser.parseBinaryMessageBody({ binaryMessage: message });
        return { incomingRequestId, messageBodyType,
            messageBodyContents }
    }

    static parseBinaryMessageBody = ({ binaryMessage }) => {
        const message = capnp.parse(msgsCapnp.TradeMessage, binaryMessage);
        const messageBody = message.type.response.body;
        const incomingRequestId = parseInt(message.type.response.requestID);
        const messageBodyType = Object.keys(messageBody)[0];
        const messageBodyContents = messageBody[messageBodyType];
        return { incomingRequestId, messageBodyType, messageBodyContents };
    }
}

export default MessageParser;
