"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var zmq = _interopRequireWildcard(require("zeromq"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MessageSocket = function MessageSocket(_ref) {
  var _this = this;

  var socketEndpoint = _ref.socketEndpoint;

  _classCallCheck(this, MessageSocket);

  _defineProperty(this, "connect", function () {
    _this.socket.connect(_this.socketEndpoint);
  });

  _defineProperty(this, "sendSerializedMessage", function (_ref2) {
    var serializedMessage = _ref2.serializedMessage;
    return _this.socket.send(serializedMessage);
  });

  this.socket = zmq.socket("dealer");
  this.socketEndpoint = socketEndpoint;
};

var _default = MessageSocket;
exports.default = _default;