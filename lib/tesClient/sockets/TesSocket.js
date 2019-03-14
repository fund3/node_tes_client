"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var zmq = _interopRequireWildcard(require("zeromq"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TesSocket = function TesSocket(_ref) {
  var _this = this;

  var _curveServerKey = _ref.curveServerKey,
      socketEndpoint = _ref.socketEndpoint;

  _classCallCheck(this, TesSocket);

  _defineProperty(this, "authenticate", function (_ref2) {
    var curveServerKey = _ref2.curveServerKey;
    var curveKeypair = zmq.curveKeypair();
    _this.socket.curve_publickey = curveKeypair.public;
    _this.socket.curve_secretkey = curveKeypair.secret;
    _this.socket.curve_serverkey = curveServerKey;
  });

  _defineProperty(this, "connect", function () {
    _this.socket.connect(_this.socketEndpoint);
  });

  _defineProperty(this, "setOnMessage", function (_ref3) {
    var onMessage = _ref3.onMessage;

    _this.socket.on('message', onMessage);
  });

  _defineProperty(this, "sendMessage", function (_ref4) {
    var message = _ref4.message;
    return _this.socket.send(message);
  });

  _defineProperty(this, "get", function () {
    return _this.socket;
  });

  this.socketEndpoint = socketEndpoint;
  this.socket = zmq.socket("dealer");
  this.authenticate({
    curveServerKey: _curveServerKey
  });
  this.socket.on("close_zmq_sockets", function () {
    return _this.socket.close();
  });
};

var _default = TesSocket;
exports.default = _default;