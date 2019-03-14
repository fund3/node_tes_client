"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BackendSocket = _interopRequireDefault(require("../../../lib/tesClient/sockets/BackendSocket"));

var _MessageResponder = _interopRequireDefault(require("./MessageResponder"));

var _MessageSender = _interopRequireDefault(require("./MessageSender"));

var _MessageSocket = _interopRequireDefault(require("../../../lib/tesClient/sockets/MessageSocket"));

var _TesSocket = _interopRequireDefault(require("../../../lib/tesClient/sockets/TesSocket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Messenger = function Messenger(_ref) {
  var _this = this;

  var _curveServerKey = _ref.curveServerKey,
      _tesSocketEndpoint = _ref.tesSocketEndpoint,
      _backendSocketEndpoint = _ref.backendSocketEndpoint;

  _classCallCheck(this, Messenger);

  _defineProperty(this, "sendMessage", function (_ref2) {
    var message = _ref2.message,
        expectedRequestId = _ref2.expectedRequestId,
        requestIdCallback = _ref2.requestIdCallback,
        responseMessageBodyType = _ref2.responseMessageBodyType,
        responseTypeCallback = _ref2.responseTypeCallback;

    _this.messageResponder.subscribeCallbackToResponseType({
      expectedRequestId: expectedRequestId,
      requestIdCallback: requestIdCallback,
      responseMessageBodyType: responseMessageBodyType,
      responseTypeCallback: responseTypeCallback
    });

    _this.messageSender.sendMessage({
      message: message
    });
  });

  _defineProperty(this, "initializeSockets", function (_ref3) {
    var curveServerKey = _ref3.curveServerKey,
        tesSocketEndpoint = _ref3.tesSocketEndpoint,
        backendSocketEndpoint = _ref3.backendSocketEndpoint;
    _this.tesSocket = new _TesSocket.default({
      curveServerKey: curveServerKey,
      socketEndpoint: tesSocketEndpoint
    });
    _this.backendSocket = new _BackendSocket.default({
      tesSocket: _this.tesSocket,
      socketEndpoint: backendSocketEndpoint
    });
    _this.messageSocket = new _MessageSocket.default({
      socketEndpoint: backendSocketEndpoint
    });
    process.on("SIGINT", function () {
      _this.cleanupSockets();

      process.exit();
    });

    _this.connectSockets();
  });

  _defineProperty(this, "cleanupSockets", function () {
    _this.cleanupSocket({
      socket: _this.tesSocket.get()
    });

    _this.cleanupSocket({
      socket: _this.backendSocket.get()
    });

    _this.cleanupSocket({
      socket: _this.messageSocket.get()
    });
  });

  _defineProperty(this, "cleanupSocket", function (_ref4) {
    var socket = _ref4.socket;
    socket.emit("close_zmq_sockets");
  });

  _defineProperty(this, "connectSockets", function () {
    _this.tesSocket.connect();

    _this.backendSocket.connect();

    _this.messageSocket.connect();
  });

  this.initializeSockets({
    curveServerKey: _curveServerKey,
    tesSocketEndpoint: _tesSocketEndpoint,
    backendSocketEndpoint: _backendSocketEndpoint
  });
  this.messageResponder = new _MessageResponder.default({
    tesSocket: this.tesSocket
  });
  this.messageSender = new _MessageSender.default({
    messageSocket: this.messageSocket
  });
};

var _default = Messenger;
exports.default = _default;