"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var zmq = _interopRequireWildcard(require("zeromq"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BackendSocket = function BackendSocket(_ref) {
  var _this = this;

  var tesSocket = _ref.tesSocket,
      socketEndpoint = _ref.socketEndpoint;

  _classCallCheck(this, BackendSocket);

  _defineProperty(this, "connect", function () {
    _this.socket.on('message', function (_, message) {
      return _this.tesSocket.sendMessage({
        message: message
      });
    });

    _this.socket.bindSync(_this.socketEndpoint);
  });

  _defineProperty(this, "get", function () {
    return _this.socket;
  });

  this.socketEndpoint = socketEndpoint;
  this.socket = zmq.socket("router");
  this.socket.on("close_zmq_sockets", function () {
    return _this.socket.close();
  });
  this.tesSocket = tesSocket;
};

var _default = BackendSocket;
exports.default = _default;