"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestHeader = _interopRequireDefault(require("./requestParams/RequestHeader"));

var _MessageFactory = _interopRequireDefault(require("./factories/MessageFactory"));

var _Messenger = _interopRequireDefault(require("./messages/Messenger"));

var _constants = require("../../lib/tesClient/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Client = function Client(_ref) {
  var _this = this;

  var clientId = _ref.clientId,
      senderCompId = _ref.senderCompId,
      _ref$accessToken = _ref.accessToken,
      accessToken = _ref$accessToken === void 0 ? undefined : _ref$accessToken,
      accountCredentialsList = _ref.accountCredentialsList,
      curveServerKey = _ref.curveServerKey,
      tesSocketEndpoint = _ref.tesSocketEndpoint;

  _classCallCheck(this, Client);

  _defineProperty(this, "sendMessage", function (_ref2) {
    var expectedRequestId = _ref2.expectedRequestId,
        responseMessageBodyType = _ref2.responseMessageBodyType,
        message = _ref2.message,
        requestIdCallback = _ref2.requestIdCallback,
        responseTypeCallback = _ref2.responseTypeCallback;

    _this.generateNewRequestId({
      message: message
    });

    _this.messenger.sendMessage({
      expectedRequestId: message.type.request.requestID,
      responseMessageBodyType: responseMessageBodyType,
      message: message,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "getRandomInt", function (_ref3) {
    var max = _ref3.max;
    return Math.floor(Math.random() * Math.floor(max));
  });

  _defineProperty(this, "generateNewRequestId", function (_ref4) {
    var message = _ref4.message;

    var newRequestId = _this.getRandomInt({
      max: 1000000000
    });

    _this.defaultRequestHeader.requestID = newRequestId;
    message.type.request.requestID = newRequestId;
  });

  _defineProperty(this, "updateAccessToken", function (_ref5) {
    var newAccessToken = _ref5.newAccessToken;
    _this.accessToken = newAccessToken;
    _this.defaultRequestHeader.accessToken = newAccessToken;
  });

  _defineProperty(this, "sendHeartbeatMessage", function (_ref6) {
    var _ref6$requestHeader = _ref6.requestHeader,
        requestHeader = _ref6$requestHeader === void 0 ? _this.defaultRequestHeader : _ref6$requestHeader,
        onResponse = _ref6.onResponse,
        requestIdCallback = _ref6.requestIdCallback,
        _ref6$responseTypeCal = _ref6.responseTypeCallback,
        responseTypeCallback = _ref6$responseTypeCal === void 0 ? undefined : _ref6$responseTypeCal;

    var heartbeatMessage = _this.messageFactory.buildHeartbeatMessage({
      requestHeader: requestHeader
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.HEARTBEAT,
      message: heartbeatMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendTestMessage", function (_ref7) {
    var _ref7$requestHeader = _ref7.requestHeader,
        requestHeader = _ref7$requestHeader === void 0 ? _this.defaultRequestHeader : _ref7$requestHeader,
        testMessageParams = _ref7.testMessageParams,
        requestIdCallback = _ref7.requestIdCallback,
        _ref7$responseTypeCal = _ref7.responseTypeCallback,
        responseTypeCallback = _ref7$responseTypeCal === void 0 ? undefined : _ref7$responseTypeCal;

    var testMessage = _this.messageFactory.buildTestMessage({
      requestHeader: requestHeader,
      testMessageParams: testMessageParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.TEST,
      message: testMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetServerTimeMessage", function (_ref8) {
    var _ref8$requestHeader = _ref8.requestHeader,
        requestHeader = _ref8$requestHeader === void 0 ? _this.defaultRequestHeader : _ref8$requestHeader,
        requestIdCallback = _ref8.requestIdCallback,
        _ref8$responseTypeCal = _ref8.responseTypeCallback,
        responseTypeCallback = _ref8$responseTypeCal === void 0 ? undefined : _ref8$responseTypeCal;

    var getServerTimeMessage = _this.messageFactory.buildGetServerTimeMessage({
      requestHeader: requestHeader
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.SERVER_TIME,
      message: getServerTimeMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendLogonMessage", function (_ref9) {
    var _ref9$requestHeader = _ref9.requestHeader,
        requestHeader = _ref9$requestHeader === void 0 ? _this.defaultRequestHeader : _ref9$requestHeader,
        logonParams = _ref9.logonParams,
        _requestIdCallback = _ref9.requestIdCallback,
        _ref9$responseTypeCal = _ref9.responseTypeCallback,
        responseTypeCallback = _ref9$responseTypeCal === void 0 ? undefined : _ref9$responseTypeCal;

    var logonMessage = _this.messageFactory.buildLogonMessage({
      requestHeader: requestHeader,
      logonParams: logonParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.LOGON_ACK,
      message: logonMessage,
      requestIdCallback: function requestIdCallback(logonAck) {
        _this.updateAccessToken({
          newAccessToken: logonAck.authorizationGrant.accessToken
        });

        _requestIdCallback(logonAck);
      },
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendLogoffMessage", function (_ref10) {
    var _ref10$requestHeader = _ref10.requestHeader,
        requestHeader = _ref10$requestHeader === void 0 ? _this.defaultRequestHeader : _ref10$requestHeader,
        requestIdCallback = _ref10.requestIdCallback,
        _ref10$responseTypeCa = _ref10.responseTypeCallback,
        responseTypeCallback = _ref10$responseTypeCa === void 0 ? undefined : _ref10$responseTypeCa;

    var logoffMessage = _this.messageFactory.buildLogoffMessage({
      requestHeader: requestHeader
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.LOGOFF_ACK,
      message: logoffMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendPlaceSingleOrderMessage", function (_ref11) {
    var _ref11$requestHeader = _ref11.requestHeader,
        requestHeader = _ref11$requestHeader === void 0 ? _this.defaultRequestHeader : _ref11$requestHeader,
        placeOrderParams = _ref11.placeOrderParams,
        requestIdCallback = _ref11.requestIdCallback,
        _ref11$responseTypeCa = _ref11.responseTypeCallback,
        responseTypeCallback = _ref11$responseTypeCa === void 0 ? undefined : _ref11$responseTypeCa;

    var placeOrderMessage = _this.messageFactory.buildPlaceSingleOrderMessage({
      requestHeader: requestHeader,
      placeOrderParams: placeOrderParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.EXECUTION_REPORT,
      message: placeOrderMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendReplaceOrderMessage", function (_ref12) {
    var _ref12$requestHeader = _ref12.requestHeader,
        requestHeader = _ref12$requestHeader === void 0 ? _this.defaultRequestHeader : _ref12$requestHeader,
        replaceOrderParams = _ref12.replaceOrderParams,
        requestIdCallback = _ref12.requestIdCallback,
        _ref12$responseTypeCa = _ref12.responseTypeCallback,
        responseTypeCallback = _ref12$responseTypeCa === void 0 ? undefined : _ref12$responseTypeCa;

    var replaceOrderMessage = _this.messageFactory.buildReplaceOrderMessage({
      requestHeader: requestHeader,
      replaceOrderParams: replaceOrderParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.EXECUTION_REPORT,
      message: replaceOrderMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendCancelOrderMessage", function (_ref13) {
    var _ref13$requestHeader = _ref13.requestHeader,
        requestHeader = _ref13$requestHeader === void 0 ? _this.defaultRequestHeader : _ref13$requestHeader,
        cancelOrderParams = _ref13.cancelOrderParams,
        requestIdCallback = _ref13.requestIdCallback,
        _ref13$responseTypeCa = _ref13.responseTypeCallback,
        responseTypeCallback = _ref13$responseTypeCa === void 0 ? undefined : _ref13$responseTypeCa;

    var cancelOrderMessage = _this.messageFactory.buildCancelOrderMessage({
      requestHeader: requestHeader,
      cancelOrderParams: cancelOrderParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.EXECUTION_REPORT,
      message: cancelOrderMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetOrderStatusMessage", function (_ref14) {
    var _ref14$requestHeader = _ref14.requestHeader,
        requestHeader = _ref14$requestHeader === void 0 ? _this.defaultRequestHeader : _ref14$requestHeader,
        getOrderStatusParams = _ref14.getOrderStatusParams,
        requestIdCallback = _ref14.requestIdCallback,
        _ref14$responseTypeCa = _ref14.responseTypeCallback,
        responseTypeCallback = _ref14$responseTypeCa === void 0 ? undefined : _ref14$responseTypeCa;

    var getOrderStatusMessage = _this.messageFactory.buildGetOrderStatusMessage({
      requestHeader: requestHeader,
      getOrderStatusParams: getOrderStatusParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.EXECUTION_REPORT,
      message: getOrderStatusMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetAccountDataMessage", function (_ref15) {
    var _ref15$requestHeader = _ref15.requestHeader,
        requestHeader = _ref15$requestHeader === void 0 ? _this.defaultRequestHeader : _ref15$requestHeader,
        getAccountDataParams = _ref15.getAccountDataParams,
        requestIdCallback = _ref15.requestIdCallback,
        _ref15$responseTypeCa = _ref15.responseTypeCallback,
        responseTypeCallback = _ref15$responseTypeCa === void 0 ? undefined : _ref15$responseTypeCa;

    var getAccountDataMessage = _this.messageFactory.buildGetAccountDataMessage({
      requestHeader: requestHeader,
      getAccountDataParams: getAccountDataParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.ACCOUNT_DATA_REPORT,
      message: getAccountDataMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetAccountBalancesMessage", function (_ref16) {
    var _ref16$requestHeader = _ref16.requestHeader,
        requestHeader = _ref16$requestHeader === void 0 ? _this.defaultRequestHeader : _ref16$requestHeader,
        getAccountBalancesParams = _ref16.getAccountBalancesParams,
        requestIdCallback = _ref16.requestIdCallback,
        _ref16$responseTypeCa = _ref16.responseTypeCallback,
        responseTypeCallback = _ref16$responseTypeCa === void 0 ? undefined : _ref16$responseTypeCa;

    var getAccountBalancesMessage = _this.messageFactory.buildGetAccountBalancesMessage({
      requestHeader: requestHeader,
      getAccountBalancesParams: getAccountBalancesParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.ACCOUNT_BALANCES_REPORT,
      message: getAccountBalancesMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetOpenPositionsMessage", function (_ref17) {
    var _ref17$requestHeader = _ref17.requestHeader,
        requestHeader = _ref17$requestHeader === void 0 ? _this.defaultRequestHeader : _ref17$requestHeader,
        getOpenPositionsParams = _ref17.getOpenPositionsParams,
        requestIdCallback = _ref17.requestIdCallback,
        _ref17$responseTypeCa = _ref17.responseTypeCallback,
        responseTypeCallback = _ref17$responseTypeCa === void 0 ? undefined : _ref17$responseTypeCa;

    var getOpenPositionsMessage = _this.messageFactory.buildGetOpenPositionsMessage({
      requestHeader: requestHeader,
      getOpenPositionsParams: getOpenPositionsParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.OPEN_POSITIONS_REPORT,
      message: getOpenPositionsMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetWorkingOrdersMessage", function (_ref18) {
    var _ref18$requestHeader = _ref18.requestHeader,
        requestHeader = _ref18$requestHeader === void 0 ? _this.defaultRequestHeader : _ref18$requestHeader,
        getWorkingOrderParams = _ref18.getWorkingOrderParams,
        requestIdCallback = _ref18.requestIdCallback,
        _ref18$responseTypeCa = _ref18.responseTypeCallback,
        responseTypeCallback = _ref18$responseTypeCa === void 0 ? undefined : _ref18$responseTypeCa;

    var getWorkingOrdersMessage = _this.messageFactory.buildGetWorkingOrdersMessage({
      requestHeader: requestHeader,
      getWorkingOrderParams: getWorkingOrderParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.WORKING_ORDERS_REPORT,
      message: getWorkingOrdersMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetCompletedOrdersMessage", function (_ref19) {
    var _ref19$requestHeader = _ref19.requestHeader,
        requestHeader = _ref19$requestHeader === void 0 ? _this.defaultRequestHeader : _ref19$requestHeader,
        getCompletedOrdersParams = _ref19.getCompletedOrdersParams,
        requestIdCallback = _ref19.requestIdCallback,
        _ref19$responseTypeCa = _ref19.responseTypeCallback,
        responseTypeCallback = _ref19$responseTypeCa === void 0 ? undefined : _ref19$responseTypeCa;

    var getCompletedOrdersMessage = _this.messageFactory.buildGetCompletedOrdersMessage({
      requestHeader: requestHeader,
      getCompletedOrdersParams: getCompletedOrdersParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.COMPLETED_ORDERS_REPORT,
      message: getCompletedOrdersMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetExchangePropertiesMessage", function (_ref20) {
    var _ref20$requestHeader = _ref20.requestHeader,
        requestHeader = _ref20$requestHeader === void 0 ? _this.defaultRequestHeader : _ref20$requestHeader,
        getExchangePropertiesParams = _ref20.getExchangePropertiesParams,
        requestIdCallback = _ref20.requestIdCallback,
        _ref20$responseTypeCa = _ref20.responseTypeCallback,
        responseTypeCallback = _ref20$responseTypeCa === void 0 ? undefined : _ref20$responseTypeCa;

    var getExchangePropertiesMessage = _this.messageFactory.buildGetExchangePropertiesMessage({
      requestHeader: requestHeader,
      getExchangePropertiesParams: getExchangePropertiesParams
    });

    _this.sendMessage({
      expectedRequestId: requestHeader.requestID,
      responseMessageBodyType: _constants.messageBodyTypes.EXCHANGE_PROPERTIES_REPORT,
      message: getExchangePropertiesMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  this.clientId = clientId;
  this.senderCompId = senderCompId;
  this.accountCredentialsList = accountCredentialsList;
  this.accessToken = accessToken;
  this.defaultRequestHeader = new _RequestHeader.default({
    clientId: clientId,
    senderCompId: senderCompId,
    accessToken: accessToken
  });
  var backendSocketEndpoint = "inproc://" + String(clientId) + senderCompId;
  this.messageFactory = new _MessageFactory.default();
  this.messenger = new _Messenger.default({
    curveServerKey: curveServerKey,
    tesSocketEndpoint: tesSocketEndpoint,
    backendSocketEndpoint: backendSocketEndpoint
  });
};

var _default = Client;
exports.default = _default;