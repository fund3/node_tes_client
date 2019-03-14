"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _MessageParser = _interopRequireDefault(require("./MessageParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MessageResponder = function MessageResponder(_ref) {
  var _this = this;

  var tesSocket = _ref.tesSocket;

  _classCallCheck(this, MessageResponder);

  _defineProperty(this, "listenForResponses", function () {
    _this.messageObserver = new _rxjs.Observable(function (observer) {
      _this.tesSocket.setOnMessage({
        onMessage: function onMessage(message) {
          var _MessageParser$parseM = _MessageParser.default.parseMessage({
            message: message
          }),
              incomingRequestId = _MessageParser$parseM.incomingRequestId,
              messageBodyType = _MessageParser$parseM.messageBodyType,
              messageBodyContents = _MessageParser$parseM.messageBodyContents;

          observer.next({
            incomingRequestId: incomingRequestId,
            messageBodyType: messageBodyType,
            messageBodyContents: messageBodyContents
          });
        }
      });
    }).pipe((0, _operators.share)());
  });

  _defineProperty(this, "subscribeCallbackToResponseType", function (_ref2) {
    var expectedRequestId = _ref2.expectedRequestId,
        requestIdCallback = _ref2.requestIdCallback,
        responseMessageBodyType = _ref2.responseMessageBodyType,
        responseTypeCallback = _ref2.responseTypeCallback;

    var subscriber = _this.messageObserver.subscribe(function (_ref3) {
      var incomingRequestId = _ref3.incomingRequestId,
          messageBodyType = _ref3.messageBodyType,
          messageBodyContents = _ref3.messageBodyContents;

      if (incomingRequestId === 0) {
        // Only fallback when requestId is default value.
        if (responseMessageBodyType !== undefined && responseTypeCallback !== undefined && responseMessageBodyType === messageBodyType) {
          responseTypeCallback(messageBodyContents);
        }
      } else if (incomingRequestId === expectedRequestId) {
        requestIdCallback(messageBodyContents);
        subscriber.unsubscribe();
      }
    });
  });

  this.tesSocket = tesSocket;
  this.listenForResponses();
};

var _default = MessageResponder;
exports.default = _default;