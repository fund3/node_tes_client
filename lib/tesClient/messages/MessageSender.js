"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var capnp = require("capnp");

var msgsCapnp = require("../../../lib/CommunicationProtocol/TradeMessage.capnp");

var MessageSender = function MessageSender(_ref) {
  var _this = this;

  var messageSocket = _ref.messageSocket;

  _classCallCheck(this, MessageSender);

  _defineProperty(this, "serializeMessage", function (_ref2) {
    var message = _ref2.message;
    return capnp.serialize(msgsCapnp.TradeMessage, message);
  });

  _defineProperty(this, "sendMessage", function (_ref3) {
    var message = _ref3.message;

    var serializedMessage = _this.serializeMessage({
      message: message
    });

    _this.messageSocket.sendSerializedMessage({
      serializedMessage: serializedMessage
    });
  });

  this.messageSocket = messageSocket;
};

var _default = MessageSender;
exports.default = _default;