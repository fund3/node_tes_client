"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../../../lib/tesClient/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MessageBodyFactory = function MessageBodyFactory() {
  _classCallCheck(this, MessageBodyFactory);
};

_defineProperty(MessageBodyFactory, "buildMessageBody", function (_ref) {
  var messageBodyType = _ref.messageBodyType,
      messageBodyContents = _ref.messageBodyContents;

  switch (messageBodyType) {
    case _constants.messageBodyTypes.HEARTBEAT:
      return _defineProperty({}, _constants.messageBodyTypes.HEARTBEAT, "");

    case _constants.messageBodyTypes.TEST:
      return _defineProperty({}, _constants.messageBodyTypes.TEST, messageBodyContents);

    case _constants.messageBodyTypes.GET_SERVER_TIME:
      return _defineProperty({}, _constants.messageBodyTypes.GET_SERVER_TIME, messageBodyContents);

    case _constants.messageBodyTypes.LOGON:
      return _defineProperty({}, _constants.messageBodyTypes.LOGON, messageBodyContents);

    case _constants.messageBodyTypes.LOGOFF:
      return _defineProperty({}, _constants.messageBodyTypes.LOGOFF, "");

    case _constants.messageBodyTypes.AUTHORIZATION_REFRESH:
      return _defineProperty({}, _constants.messageBodyTypes.AUTHORIZATION_REFRESH, messageBodyContents);

    case _constants.messageBodyTypes.PLACE_SINGLE_ORDER:
      return _defineProperty({}, _constants.messageBodyTypes.PLACE_SINGLE_ORDER, messageBodyContents);

    case _constants.messageBodyTypes.REPLACE_ORDER:
      return _defineProperty({}, _constants.messageBodyTypes.REPLACE_ORDER, messageBodyContents);

    case _constants.messageBodyTypes.CANCEL_ORDER:
      return _defineProperty({}, _constants.messageBodyTypes.CANCEL_ORDER, messageBodyContents);

    case _constants.messageBodyTypes.GET_ORDER_STATUS:
      return _defineProperty({}, _constants.messageBodyTypes.GET_ORDER_STATUS, messageBodyContents);

    case _constants.messageBodyTypes.GET_ACCOUNT_DATA:
      return _defineProperty({}, _constants.messageBodyTypes.GET_ACCOUNT_DATA, messageBodyContents);

    case _constants.messageBodyTypes.GET_ACCOUNT_BALANCES:
      return _defineProperty({}, _constants.messageBodyTypes.GET_ACCOUNT_BALANCES, messageBodyContents);

    case _constants.messageBodyTypes.GET_OPEN_POSITIONS:
      return _defineProperty({}, _constants.messageBodyTypes.GET_OPEN_POSITIONS, messageBodyContents);

    case _constants.messageBodyTypes.GET_WORKING_ORDERS:
      return _defineProperty({}, _constants.messageBodyTypes.GET_WORKING_ORDERS, messageBodyContents);

    case _constants.messageBodyTypes.GET_COMPLETED_ORDERS:
      return _defineProperty({}, _constants.messageBodyTypes.GET_COMPLETED_ORDERS, messageBodyContents);

    case _constants.messageBodyTypes.GET_EXCHANGE_PROPERTIES:
      return _defineProperty({}, _constants.messageBodyTypes.GET_EXCHANGE_PROPERTIES, messageBodyContents);

    default:
      return {};
  }
});

_defineProperty(MessageBodyFactory, "buildHeartbeatMessageBody", function () {
  var messageBodyType = _constants.messageBodyTypes.HEARTBEAT;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType
  });
});

_defineProperty(MessageBodyFactory, "buildTestMessageBody", function (_ref18) {
  var testMessageParams = _ref18.testMessageParams;
  var messageBodyType = _constants.messageBodyTypes.TEST;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: testMessageParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetServerTimeMessageBody", function () {
  var messageBodyType = _constants.messageBodyTypes.GET_SERVER_TIME;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType
  });
});

_defineProperty(MessageBodyFactory, "buildLogonMessageBody", function (_ref19) {
  var logonParams = _ref19.logonParams;
  var messageBodyType = _constants.messageBodyTypes.LOGON;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: logonParams
  });
});

_defineProperty(MessageBodyFactory, "buildLogoffMessageBody", function () {
  var messageBodyType = _constants.messageBodyTypes.LOGOFF;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType
  });
});

_defineProperty(MessageBodyFactory, "buildPlaceSingleOrderMessageBody", function (_ref20) {
  var placeOrderParams = _ref20.placeOrderParams;
  var messageBodyType = _constants.messageBodyTypes.PLACE_SINGLE_ORDER;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: placeOrderParams
  });
});

_defineProperty(MessageBodyFactory, "buildReplaceOrderMessageBody", function (_ref21) {
  var replaceOrderParams = _ref21.replaceOrderParams;
  var messageBodyType = _constants.messageBodyTypes.REPLACE_ORDER;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: replaceOrderParams
  });
});

_defineProperty(MessageBodyFactory, "buildCancelOrderMessageBody", function (_ref22) {
  var cancelOrderParams = _ref22.cancelOrderParams;
  var messageBodyType = _constants.messageBodyTypes.CANCEL_ORDER;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: cancelOrderParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetOrderStatusMessageBody", function (_ref23) {
  var getOrderStatusParams = _ref23.getOrderStatusParams;
  var messageBodyType = _constants.messageBodyTypes.GET_ORDER_STATUS;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getOrderStatusParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetAccountDataMessageBody", function (_ref24) {
  var getAccountDataParams = _ref24.getAccountDataParams;
  var messageBodyType = _constants.messageBodyTypes.GET_ACCOUNT_DATA;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getAccountDataParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetAccountBalancesMessageBody", function (_ref25) {
  var getAccountBalancesParams = _ref25.getAccountBalancesParams;
  var messageBodyType = _constants.messageBodyTypes.GET_ACCOUNT_BALANCES;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getAccountBalancesParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetOpenPositionsMessageBody", function (_ref26) {
  var getOpenPositionsParams = _ref26.getOpenPositionsParams;
  var messageBodyType = _constants.messageBodyTypes.GET_OPEN_POSITIONS;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getOpenPositionsParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetWorkingOrdersMessageBody", function (_ref27) {
  var getWorkingOrderParams = _ref27.getWorkingOrderParams;
  var messageBodyType = _constants.messageBodyTypes.GET_WORKING_ORDERS;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getWorkingOrderParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetCompletedOrdersMessageBody", function (_ref28) {
  var getCompletedOrdersParams = _ref28.getCompletedOrdersParams;
  var messageBodyType = _constants.messageBodyTypes.GET_COMPLETED_ORDERS;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getCompletedOrdersParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetExchangePropertiesMessageBody", function (_ref29) {
  var getExchangePropertiesParams = _ref29.getExchangePropertiesParams;
  var messageBodyType = _constants.messageBodyTypes.GET_EXCHANGE_PROPERTIES;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getExchangePropertiesParams
  });
});

var _default = MessageBodyFactory;
exports.default = _default;