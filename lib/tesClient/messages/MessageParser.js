"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../../../lib/tesClient/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var capnp = require("capnp");

var msgsCapnp = require("../../../lib/CommunicationProtocol/TradeMessage.capnp");

var MessageParser = function MessageParser() {
  _classCallCheck(this, MessageParser);
};

_defineProperty(MessageParser, "parseMessage", function (_ref) {
  var message = _ref.message;

  var _MessageParser$parseB = MessageParser.parseBinaryMessageBody({
    binaryMessage: message
  }),
      incomingRequestId = _MessageParser$parseB.incomingRequestId,
      messageBodyType = _MessageParser$parseB.messageBodyType,
      messageBodyContents = _MessageParser$parseB.messageBodyContents;

  return {
    incomingRequestId: incomingRequestId,
    messageBodyType: messageBodyType,
    messageBodyContents: messageBodyContents
  };
});

_defineProperty(MessageParser, "parseBinaryMessageBody", function (_ref2) {
  var binaryMessage = _ref2.binaryMessage;
  var message = capnp.parse(msgsCapnp.TradeMessage, binaryMessage);
  var messageBody = message.type.response.body;
  var incomingRequestId = parseInt(message.type.response.requestID);
  var messageBodyType = Object.keys(messageBody)[0];
  var messageBodyContents = messageBody[messageBodyType];
  return {
    incomingRequestId: incomingRequestId,
    messageBodyType: messageBodyType,
    messageBodyContents: messageBodyContents
  };
});

var _default = MessageParser;
exports.default = _default;