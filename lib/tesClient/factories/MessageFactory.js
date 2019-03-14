"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MessageBodyFactory = _interopRequireDefault(require("./MessageBodyFactory"));

var _constants = require("../../../lib/tesClient/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MessageFactory = function MessageFactory() {
  var _this = this;

  _classCallCheck(this, MessageFactory);

  _defineProperty(this, "buildMessage", function (_ref) {
    var requestHeader = _ref.requestHeader,
        messageBody = _ref.messageBody;
    return _objectSpread({}, requestHeader, {
      body: messageBody
    });
  });

  _defineProperty(this, "buildMessageContainer", function (_ref2) {
    var message = _ref2.message,
        messageType = _ref2.messageType;

    switch (messageType) {
      case _constants.messageTypes.REQUEST:
        return {
          type: _defineProperty({}, _constants.messageTypes.REQUEST, message)
        };

      case _constants.messageTypes.RESPONSE:
        return {
          type: _defineProperty({}, _constants.messageTypes.RESPONSE, message)
        };

      default:
        return {};
    }
  });

  _defineProperty(this, "buildRequestMessage", function (_ref3) {
    var requestHeader = _ref3.requestHeader,
        messageBody = _ref3.messageBody;

    var message = _this.buildMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });

    return _this.buildMessageContainer({
      message: message,
      messageType: _constants.messageTypes.REQUEST
    });
  });

  _defineProperty(this, "buildHeartbeatMessage", function (_ref4) {
    var requestHeader = _ref4.requestHeader;

    var messageBody = _MessageBodyFactory.default.buildHeartbeatMessageBody();

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildTestMessage", function (_ref5) {
    var requestHeader = _ref5.requestHeader,
        testMessageParams = _ref5.testMessageParams;

    var messageBody = _MessageBodyFactory.default.buildTestMessageBody({
      testMessageParams: testMessageParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetServerTimeMessage", function (_ref6) {
    var requestHeader = _ref6.requestHeader;

    var messageBody = _MessageBodyFactory.default.buildGetServerTimeMessageBody();

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildLogonMessage", function (_ref7) {
    var requestHeader = _ref7.requestHeader,
        logonParams = _ref7.logonParams;

    var messageBody = _MessageBodyFactory.default.buildLogonMessageBody({
      logonParams: logonParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildLogoffMessage", function (_ref8) {
    var requestHeader = _ref8.requestHeader;

    var messageBody = _MessageBodyFactory.default.buildLogoffMessageBody();

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildPlaceSingleOrderMessage", function (_ref9) {
    var requestHeader = _ref9.requestHeader,
        placeOrderParams = _ref9.placeOrderParams;

    var messageBody = _MessageBodyFactory.default.buildPlaceSingleOrderMessageBody({
      placeOrderParams: placeOrderParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildReplaceOrderMessage", function (_ref10) {
    var requestHeader = _ref10.requestHeader,
        replaceOrderParams = _ref10.replaceOrderParams;

    var messageBody = _MessageBodyFactory.default.buildReplaceOrderMessageBody({
      replaceOrderParams: replaceOrderParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildCancelOrderMessage", function (_ref11) {
    var requestHeader = _ref11.requestHeader,
        cancelOrderParams = _ref11.cancelOrderParams;

    var messageBody = _MessageBodyFactory.default.buildCancelOrderMessageBody({
      cancelOrderParams: cancelOrderParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetOrderStatusMessage", function (_ref12) {
    var requestHeader = _ref12.requestHeader,
        getOrderStatusParams = _ref12.getOrderStatusParams;

    var messageBody = _MessageBodyFactory.default.buildGetOrderStatusMessageBody({
      getOrderStatusParams: getOrderStatusParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetAccountDataMessage", function (_ref13) {
    var requestHeader = _ref13.requestHeader,
        getAccountDataParams = _ref13.getAccountDataParams;

    var messageBody = _MessageBodyFactory.default.buildGetAccountDataMessageBody({
      getAccountDataParams: getAccountDataParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetAccountBalancesMessage", function (_ref14) {
    var requestHeader = _ref14.requestHeader,
        getAccountBalancesParams = _ref14.getAccountBalancesParams;

    var messageBody = _MessageBodyFactory.default.buildGetAccountBalancesMessageBody({
      getAccountBalancesParams: getAccountBalancesParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetOpenPositionsMessage", function (_ref15) {
    var requestHeader = _ref15.requestHeader,
        getOpenPositionsParams = _ref15.getOpenPositionsParams;

    var messageBody = _MessageBodyFactory.default.buildGetOpenPositionsMessageBody({
      getOpenPositionsParams: getOpenPositionsParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetWorkingOrdersMessage", function (_ref16) {
    var requestHeader = _ref16.requestHeader,
        getWorkingOrderParams = _ref16.getWorkingOrderParams;

    var messageBody = _MessageBodyFactory.default.buildGetWorkingOrdersMessageBody({
      getWorkingOrderParams: getWorkingOrderParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetCompletedOrdersMessage", function (_ref17) {
    var requestHeader = _ref17.requestHeader,
        getCompletedOrdersParams = _ref17.getCompletedOrdersParams;

    var messageBody = _MessageBodyFactory.default.buildGetCompletedOrdersMessageBody({
      getCompletedOrdersParams: getCompletedOrdersParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetExchangePropertiesMessage", function (_ref18) {
    var requestHeader = _ref18.requestHeader,
        getExchangePropertiesParams = _ref18.getExchangePropertiesParams;

    var messageBody = _MessageBodyFactory.default.buildGetExchangePropertiesMessageBody({
      getExchangePropertiesParams: getExchangePropertiesParams
    });

    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });
};

var _default = MessageFactory;
exports.default = _default;