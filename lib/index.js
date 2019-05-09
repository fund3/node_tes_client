'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var zmq = require('zeromq');
var Debug = _interopDefault(require('debug'));
var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var request = _interopDefault(require('request'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var AuthorizationRefreshParams = function AuthorizationRefreshParams(_ref) {
  var refreshToken = _ref.refreshToken;

  _classCallCheck(this, AuthorizationRefreshParams);

  /**
   * @param refreshToken: (String) refreshToken to refresh auth on TES.
  */
  this.refreshToken = refreshToken;
};

var RequestHeader = function RequestHeader(_ref) {
  var clientId = _ref.clientId,
      senderCompId = _ref.senderCompId,
      _ref$accessToken = _ref.accessToken,
      accessToken = _ref$accessToken === void 0 ? undefined : _ref$accessToken,
      _ref$requestId = _ref.requestId,
      requestId = _ref$requestId === void 0 ? 0 : _ref$requestId;

  _classCallCheck(this, RequestHeader);

  /**
   * @param clientId: (int) clientId assigned by Fund3.
   * @param senderCompId: (String) Unique uuid machine Id for TES to route
   *     messages to the correct recipient.
   * @param accessToken: (String) accessToken assigned by TES after
   *     authenticated with clientSecret.
   * @param requestId: (int) Optional id to link request and response.
  */
  this.clientID = clientId;
  this.senderCompID = senderCompId;
  this.accessToken = accessToken;
  this.requestID = requestId;
};

var messageBodyTypes = {
  // Requests
  // System
  HEARTBEAT: "heartbeat",
  TEST: "test",
  GET_SERVER_TIME: "getServerTime",
  // Logon-Logoff
  LOGON: "logon",
  LOGOFF: "logoff",
  AUTHORIZATION_REFRESH: "authorizationRefresh",
  // Trading Requests
  PLACE_SINGLE_ORDER: "placeSingleOrder",
  PLACE_CONTINGENT_ORDER: "placeContingentOrder",
  REPLACE_ORDER: "replaceOrder",
  CANCEL_ORDER: "cancelOrder",
  CANCEL_ALL_ORDERS: "cancelAllOrders",
  GET_ORDER_STATUS: "getOrderStatus",
  // Account-related Requests
  GET_ACCOUNT_DATA: "getAccountData",
  GET_ACCOUNT_BALANCES: "getAccountBalances",
  GET_OPEN_POSITIONS: "getOpenPositions",
  GET_WORKING_ORDERS: "getWorkingOrders",
  GET_COMPLETED_ORDERS: "getCompletedOrders",
  GET_EXCHANGE_PROPERTIES: "getExchangeProperties",
  // Responses
  // System
  SERVER_TIME: "serverTime",
  SYSTEM: "system",
  // Logon-Logoff
  LOGON_ACK: "logonAck",
  // Logon Acknowledgement
  LOGOFF_ACK: "logoffAck",
  // Logoff Acknowledgement
  AUTHORIZATION_GRANT: "authorizationGrant",
  // Trading
  EXECUTION_REPORT: "executionReport",
  // Accounting
  ACCOUNT_DATA_REPORT: "accountDataReport",
  ACCOUNT_BALANCES_REPORT: "accountBalancesReport",
  OPEN_POSITIONS_REPORT: "openPositionsReport",
  WORKING_ORDERS_REPORT: "workingOrdersReport",
  COMPLETED_ORDERS_REPORT: "completedOrdersReport",
  EXCHANGE_PROPERTIES_REPORT: "exchangePropertiesReport"
};

var messageTypes = {
  REQUEST: "request",
  RESPONSE: "response"
};

var exchanges = {
  POLONIEX: 'poloniex',
  KRAKEN: 'kraken',
  GEMINI: "gemini",
  BITFINEX: 'bitfinex',
  BITTREX: 'bittrex',
  BINANCE: 'binance',
  COINBASE_PRO: 'coinbasePro',
  COINBASE_PRIME: "coinbasePrime",
  BITSTAMP: 'bitstamp',
  ITBIT: 'itBit',
  OKEX: 'okEx',
  HITBTC: 'hitbtc'
};

var MessageBodyFactory = function MessageBodyFactory() {
  _classCallCheck(this, MessageBodyFactory);
};

_defineProperty(MessageBodyFactory, "buildMessageBody", function (_ref) {
  var messageBodyType = _ref.messageBodyType,
      messageBodyContents = _ref.messageBodyContents;

  switch (messageBodyType) {
    case messageBodyTypes.HEARTBEAT:
      return _defineProperty({}, messageBodyTypes.HEARTBEAT, "");

    case messageBodyTypes.LOGOFF:
      return _defineProperty({}, messageBodyTypes.LOGOFF, "");

    default:
      return _defineProperty({}, messageBodyType, messageBodyContents);
  }
});

_defineProperty(MessageBodyFactory, "buildHeartbeatMessageBody", function () {
  var messageBodyType = messageBodyTypes.HEARTBEAT;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType
  });
});

_defineProperty(MessageBodyFactory, "buildTestMessageBody", function (_ref5) {
  var testMessageParams = _ref5.testMessageParams;
  var messageBodyType = messageBodyTypes.TEST;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: testMessageParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetServerTimeMessageBody", function () {
  var messageBodyType = messageBodyTypes.GET_SERVER_TIME;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType
  });
});

_defineProperty(MessageBodyFactory, "buildLogonMessageBody", function (_ref6) {
  var logonParams = _ref6.logonParams;
  var messageBodyType = messageBodyTypes.LOGON;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: logonParams
  });
});

_defineProperty(MessageBodyFactory, "buildLogoffMessageBody", function () {
  var messageBodyType = messageBodyTypes.LOGOFF;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType
  });
});

_defineProperty(MessageBodyFactory, "buildAuthorizationRefreshMessageBody", function (_ref7) {
  var authorizationRefreshParams = _ref7.authorizationRefreshParams;
  var messageBodyType = messageBodyTypes.AUTHORIZATION_REFRESH;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: authorizationRefreshParams
  });
});

_defineProperty(MessageBodyFactory, "buildPlaceSingleOrderMessageBody", function (_ref8) {
  var placeOrderParams = _ref8.placeOrderParams;
  var messageBodyType = messageBodyTypes.PLACE_SINGLE_ORDER;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: placeOrderParams
  });
});

_defineProperty(MessageBodyFactory, "buildPlaceContingentOrderMessageBody", function (_ref9) {
  var placeContingentOrderParams = _ref9.placeContingentOrderParams;
  var messageBodyType = messageBodyTypes.PLACE_CONTINGENT_ORDER;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: placeContingentOrderParams
  });
});

_defineProperty(MessageBodyFactory, "buildReplaceOrderMessageBody", function (_ref10) {
  var replaceOrderParams = _ref10.replaceOrderParams;
  var messageBodyType = messageBodyTypes.REPLACE_ORDER;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: replaceOrderParams
  });
});

_defineProperty(MessageBodyFactory, "buildCancelOrderMessageBody", function (_ref11) {
  var cancelOrderParams = _ref11.cancelOrderParams;
  var messageBodyType = messageBodyTypes.CANCEL_ORDER;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: cancelOrderParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetOrderStatusMessageBody", function (_ref12) {
  var getOrderStatusParams = _ref12.getOrderStatusParams;
  var messageBodyType = messageBodyTypes.GET_ORDER_STATUS;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getOrderStatusParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetAccountDataMessageBody", function (_ref13) {
  var getAccountDataParams = _ref13.getAccountDataParams;
  var messageBodyType = messageBodyTypes.GET_ACCOUNT_DATA;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getAccountDataParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetAccountBalancesMessageBody", function (_ref14) {
  var getAccountBalancesParams = _ref14.getAccountBalancesParams;
  var messageBodyType = messageBodyTypes.GET_ACCOUNT_BALANCES;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getAccountBalancesParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetOpenPositionsMessageBody", function (_ref15) {
  var getOpenPositionsParams = _ref15.getOpenPositionsParams;
  var messageBodyType = messageBodyTypes.GET_OPEN_POSITIONS;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getOpenPositionsParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetWorkingOrdersMessageBody", function (_ref16) {
  var getWorkingOrdersParams = _ref16.getWorkingOrdersParams;
  var messageBodyType = messageBodyTypes.GET_WORKING_ORDERS;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getWorkingOrdersParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetCompletedOrdersMessageBody", function (_ref17) {
  var getCompletedOrdersParams = _ref17.getCompletedOrdersParams;
  var messageBodyType = messageBodyTypes.GET_COMPLETED_ORDERS;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getCompletedOrdersParams
  });
});

_defineProperty(MessageBodyFactory, "buildGetExchangePropertiesMessageBody", function (_ref18) {
  var getExchangePropertiesParams = _ref18.getExchangePropertiesParams;
  var messageBodyType = messageBodyTypes.GET_EXCHANGE_PROPERTIES;
  return MessageBodyFactory.buildMessageBody({
    messageBodyType: messageBodyType,
    messageBodyContents: getExchangePropertiesParams
  });
});

var MessageFactory = function MessageFactory() {
  var _this = this;

  _classCallCheck(this, MessageFactory);

  _defineProperty(this, "getRandomInt", function (_ref) {
    var max = _ref.max;
    return Math.floor(Math.random() * Math.floor(max));
  });

  _defineProperty(this, "generateNewRequestId", function () {
    _this.requestIdPrefix += 1;
    return _this.requestIdPrefix * _this.requestIdMultiplier + _this.getRandomInt({
      max: 1000000
    });
  });

  _defineProperty(this, "buildMessage", function (_ref2) {
    var requestHeader = _ref2.requestHeader,
        messageBody = _ref2.messageBody;
    return _objectSpread({}, requestHeader, {
      body: messageBody
    });
  });

  _defineProperty(this, "buildMessageContainer", function (_ref3) {
    var message = _ref3.message,
        messageType = _ref3.messageType;

    switch (messageType) {
      case messageTypes.REQUEST:
        return {
          type: _defineProperty({}, messageTypes.REQUEST, message)
        };

      case messageTypes.RESPONSE:
        return {
          type: _defineProperty({}, messageTypes.RESPONSE, message)
        };

      default:
        return {};
    }
  });

  _defineProperty(this, "buildRequestMessage", function (_ref4) {
    var requestHeader = _ref4.requestHeader,
        messageBody = _ref4.messageBody;
    requestHeader.requestID = _this.generateNewRequestId();

    var message = _this.buildMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });

    return _this.buildMessageContainer({
      message: message,
      messageType: messageTypes.REQUEST
    });
  });

  _defineProperty(this, "buildHeartbeatMessage", function (_ref5) {
    var requestHeader = _ref5.requestHeader;
    var messageBody = MessageBodyFactory.buildHeartbeatMessageBody();
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildTestMessage", function (_ref6) {
    var requestHeader = _ref6.requestHeader,
        testMessageParams = _ref6.testMessageParams;
    var messageBody = MessageBodyFactory.buildTestMessageBody({
      testMessageParams: testMessageParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetServerTimeMessage", function (_ref7) {
    var requestHeader = _ref7.requestHeader;
    var messageBody = MessageBodyFactory.buildGetServerTimeMessageBody();
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildLogonMessage", function (_ref8) {
    var requestHeader = _ref8.requestHeader,
        logonParams = _ref8.logonParams;
    var messageBody = MessageBodyFactory.buildLogonMessageBody({
      logonParams: logonParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildLogoffMessage", function (_ref9) {
    var requestHeader = _ref9.requestHeader;
    var messageBody = MessageBodyFactory.buildLogoffMessageBody();
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildAuthorizationRefreshMessage", function (_ref10) {
    var requestHeader = _ref10.requestHeader,
        authorizationRefreshParams = _ref10.authorizationRefreshParams;
    var messageBody = MessageBodyFactory.buildAuthorizationRefreshMessageBody({
      authorizationRefreshParams: authorizationRefreshParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildPlaceSingleOrderMessage", function (_ref11) {
    var requestHeader = _ref11.requestHeader,
        placeOrderParams = _ref11.placeOrderParams;
    var messageBody = MessageBodyFactory.buildPlaceSingleOrderMessageBody({
      placeOrderParams: placeOrderParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildPlaceContingentOrderMessage", function (_ref12) {
    var requestHeader = _ref12.requestHeader,
        placeContingentOrderParams = _ref12.placeContingentOrderParams;
    var messageBody = MessageBodyFactory.buildPlaceContingentOrderMessageBody({
      placeContingentOrderParams: placeContingentOrderParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildReplaceOrderMessage", function (_ref13) {
    var requestHeader = _ref13.requestHeader,
        replaceOrderParams = _ref13.replaceOrderParams;
    var messageBody = MessageBodyFactory.buildReplaceOrderMessageBody({
      replaceOrderParams: replaceOrderParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildCancelOrderMessage", function (_ref14) {
    var requestHeader = _ref14.requestHeader,
        cancelOrderParams = _ref14.cancelOrderParams;
    var messageBody = MessageBodyFactory.buildCancelOrderMessageBody({
      cancelOrderParams: cancelOrderParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetOrderStatusMessage", function (_ref15) {
    var requestHeader = _ref15.requestHeader,
        getOrderStatusParams = _ref15.getOrderStatusParams;
    var messageBody = MessageBodyFactory.buildGetOrderStatusMessageBody({
      getOrderStatusParams: getOrderStatusParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetAccountDataMessage", function (_ref16) {
    var requestHeader = _ref16.requestHeader,
        getAccountDataParams = _ref16.getAccountDataParams;
    var messageBody = MessageBodyFactory.buildGetAccountDataMessageBody({
      getAccountDataParams: getAccountDataParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetAccountBalancesMessage", function (_ref17) {
    var requestHeader = _ref17.requestHeader,
        getAccountBalancesParams = _ref17.getAccountBalancesParams;
    var messageBody = MessageBodyFactory.buildGetAccountBalancesMessageBody({
      getAccountBalancesParams: getAccountBalancesParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetOpenPositionsMessage", function (_ref18) {
    var requestHeader = _ref18.requestHeader,
        getOpenPositionsParams = _ref18.getOpenPositionsParams;
    var messageBody = MessageBodyFactory.buildGetOpenPositionsMessageBody({
      getOpenPositionsParams: getOpenPositionsParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetWorkingOrdersMessage", function (_ref19) {
    var requestHeader = _ref19.requestHeader,
        getWorkingOrdersParams = _ref19.getWorkingOrdersParams;
    var messageBody = MessageBodyFactory.buildGetWorkingOrdersMessageBody({
      getWorkingOrdersParams: getWorkingOrdersParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetCompletedOrdersMessage", function (_ref20) {
    var requestHeader = _ref20.requestHeader,
        getCompletedOrdersParams = _ref20.getCompletedOrdersParams;
    var messageBody = MessageBodyFactory.buildGetCompletedOrdersMessageBody({
      getCompletedOrdersParams: getCompletedOrdersParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  _defineProperty(this, "buildGetExchangePropertiesMessage", function (_ref21) {
    var requestHeader = _ref21.requestHeader,
        getExchangePropertiesParams = _ref21.getExchangePropertiesParams;
    var messageBody = MessageBodyFactory.buildGetExchangePropertiesMessageBody({
      getExchangePropertiesParams: getExchangePropertiesParams
    });
    return _this.buildRequestMessage({
      requestHeader: requestHeader,
      messageBody: messageBody
    });
  });

  this.requestIdPrefix = 0;
  this.requestIdMultiplier = 10000000;
};

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

  _defineProperty(this, "close", function () {
    return _this.socket.close();
  });

  this.socketEndpoint = socketEndpoint;
  this.socket = zmq.socket("router");
  this.tesSocket = tesSocket;
};

var capnp = require("capnp");

var msgsCapnp = require("omegaprotocol/TradeMessage.capnp");

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

var debug = Debug("MessageResponder");

var MessageResponder = function MessageResponder(_ref) {
  var _this = this;

  var tesSocket = _ref.tesSocket;

  _classCallCheck(this, MessageResponder);

  _defineProperty(this, "listenForResponses", function () {
    _this.messageObserver = new rxjs.Observable(function (observer) {
      debug('set on message');

      _this.tesSocket.setOnMessage({
        onMessage: function onMessage(message) {
          var _MessageParser$parseM = MessageParser.parseMessage({
            message: message
          }),
              incomingRequestId = _MessageParser$parseM.incomingRequestId,
              messageBodyType = _MessageParser$parseM.messageBodyType,
              messageBodyContents = _MessageParser$parseM.messageBodyContents;

          debug('in parse: ' + incomingRequestId + ' ' + messageBodyType + ' ' + messageBodyContents);
          observer.next({
            incomingRequestId: incomingRequestId,
            messageBodyType: messageBodyType,
            messageBodyContents: messageBodyContents
          });
        }
      });
    }).pipe(operators.share());
  });

  _defineProperty(this, "subscribeCallbackToRequestId", function (_ref2) {
    var expectedRequestId = _ref2.expectedRequestId,
        requestIdCallback = _ref2.requestIdCallback,
        responseMessageBodyType = _ref2.responseMessageBodyType,
        responseTypeCallback = _ref2.responseTypeCallback;

    _this.pendingRequestIdSet.add(expectedRequestId);

    _this.messageObserver.pipe(operators.takeWhile(function () {
      return _this.pendingRequestIdSet.has(expectedRequestId);
    })).subscribe(function (_ref3) {
      var incomingRequestId = _ref3.incomingRequestId,
          messageBodyType = _ref3.messageBodyType,
          messageBodyContents = _ref3.messageBodyContents;
      debug('in id callback: ' + expectedRequestId + ' ' + incomingRequestId + ' ' + messageBodyType + ' ' + messageBodyContents);

      if (incomingRequestId === 0) {
        // Only fallback when requestId is default value.
        if (responseMessageBodyType !== undefined && responseTypeCallback !== undefined && responseMessageBodyType === messageBodyType) {
          responseTypeCallback(messageBodyContents);
        }
      } else if (incomingRequestId === expectedRequestId && requestIdCallback !== undefined) {
        if (_this.pendingRequestIdSet.has(incomingRequestId)) {
          _this.pendingRequestIdSet.delete(incomingRequestId);

          requestIdCallback(messageBodyContents);
        }
      }
    });
  });

  _defineProperty(this, "subscribePlaceholderCallback", function () {
    _this.messageObserver.pipe(operators.skipWhile(function () {
      return true;
    })).subscribe(function (_ref4) {
      var incomingRequestId = _ref4.incomingRequestId,
          messageBodyType = _ref4.messageBodyType,
          messageBodyContents = _ref4.messageBodyContents;
    });
  });

  _defineProperty(this, "subscribeCallbackToResponseType", function (_ref5) {
    var responseMessageBodyType = _ref5.responseMessageBodyType,
        responseTypeCallback = _ref5.responseTypeCallback;

    if (responseMessageBodyType in _this.responseTypeSubscriberDict) {
      _this.unsubscribeCallbackFromResponseType({
        responseMessageBodyType: responseMessageBodyType
      });
    }

    var subscriber = _this.messageObserver.subscribe(function (_ref6) {
      var incomingRequestId = _ref6.incomingRequestId,
          messageBodyType = _ref6.messageBodyType,
          messageBodyContents = _ref6.messageBodyContents;
      debug('in response callback: ' + incomingRequestId + ' ' + messageBodyType + ' ' + responseMessageBodyType);

      if (responseMessageBodyType !== undefined && responseTypeCallback !== undefined && responseMessageBodyType === messageBodyType) {
        // Only fallback when requestId is default value.
        if (responseMessageBodyType === messageBodyTypes.EXECUTION_REPORT || incomingRequestId === 0) {
          responseTypeCallback(messageBodyContents);
        }
      }
    });

    _this.responseTypeSubscriberDict[responseMessageBodyType] = subscriber;
    return true;
  });

  _defineProperty(this, "unsubscribeCallbackFromResponseType", function (_ref7) {
    var responseMessageBodyType = _ref7.responseMessageBodyType;

    if (responseMessageBodyType in _this.responseTypeSubscriberDict) {
      _this.responseTypeSubscriberDict[responseMessageBodyType].unsubscribe();

      delete _this.responseTypeSubscriberDict[responseMessageBodyType];
      return true;
    }

    return false;
  });

  this.tesSocket = tesSocket;
  this.listenForResponses();
  this.responseTypeSubscriberDict = {};
  this.pendingRequestIdSet = new Set([]);
};

var capnp$1 = require("capnp");

var msgsCapnp$1 = require("omegaprotocol/TradeMessage.capnp");

var MessageSender = function MessageSender(_ref) {
  var _this = this;

  var messageSocket = _ref.messageSocket;

  _classCallCheck(this, MessageSender);

  _defineProperty(this, "serializeMessage", function (_ref2) {
    var message = _ref2.message;
    return capnp$1.serialize(msgsCapnp$1.TradeMessage, message);
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

  _defineProperty(this, "get", function () {
    return _this.socket;
  });

  _defineProperty(this, "close", function () {
    return _this.socket.close();
  });

  this.socket = zmq.socket("dealer");
  this.socketEndpoint = socketEndpoint;
};

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

  _defineProperty(this, "close", function () {
    return _this.socket.close();
  });

  this.socketEndpoint = socketEndpoint;
  this.socket = zmq.socket("dealer");
  this.authenticate({
    curveServerKey: _curveServerKey
  });
};

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

    _this.messageResponder.subscribeCallbackToRequestId({
      expectedRequestId: expectedRequestId,
      requestIdCallback: requestIdCallback,
      responseMessageBodyType: responseMessageBodyType,
      responseTypeCallback: responseTypeCallback
    });

    _this.messageSender.sendMessage({
      message: message
    });
  });

  _defineProperty(this, "subscribeCallbackToResponseType", function (_ref3) {
    var responseMessageBodyType = _ref3.responseMessageBodyType,
        responseTypeCallback = _ref3.responseTypeCallback;

    _this.messageResponder.subscribeCallbackToResponseType({
      responseMessageBodyType: responseMessageBodyType,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "unsubscribeCallbackFromResponseType", function (_ref4) {
    var responseMessageBodyType = _ref4.responseMessageBodyType;

    _this.messageResponder.unsubscribeCallbackFromResponseType({
      responseMessageBodyType: responseMessageBodyType
    });
  });

  _defineProperty(this, "subscribePlaceholderCallback", function () {
    _this.messageResponder.subscribePlaceholderCallback();
  });

  _defineProperty(this, "initializeSockets", function (_ref5) {
    var curveServerKey = _ref5.curveServerKey,
        tesSocketEndpoint = _ref5.tesSocketEndpoint,
        backendSocketEndpoint = _ref5.backendSocketEndpoint;
    _this.tesSocket = new TesSocket({
      curveServerKey: curveServerKey,
      socketEndpoint: tesSocketEndpoint
    }); // Although there is no explicit reference to backend socket, messages
    // get sent to backendSocket from messageSocket via inproc address and
    // then the message gets routed to TES

    _this.backendSocket = new BackendSocket({
      tesSocket: _this.tesSocket,
      socketEndpoint: backendSocketEndpoint
    });
    _this.messageSocket = new MessageSocket({
      socketEndpoint: backendSocketEndpoint
    });

    _this.connectSockets();
  });

  _defineProperty(this, "cleanup", function () {
    _this.cleanupSockets();
  });

  _defineProperty(this, "cleanupSockets", function () {
    _this.tesSocket.close();

    _this.backendSocket.close();

    _this.messageSocket.close();
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
  this.messageResponder = new MessageResponder({
    tesSocket: this.tesSocket
  });
  this.messageSender = new MessageSender({
    messageSocket: this.messageSocket
  });
};

/**
 * We should validate presence of some argumennts
 */
var errors = {
  InvalidArgument: function InvalidArgument(f) {
    return "Argument error: ".concat(f, " is required but it is undefined/null");
  },
  NoValidArguments: 'No valid arguments present'
};
/**
 * Validates array of arguments
 * @param  {...any} args - list of arguments
 * Array.prototype.some - executes fn unless fn returns true
 */

var validateArguments = function validateArguments() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var hasInvalidArgument = args.some(function (argument) {
    return !argument;
  });

  if (hasInvalidArgument) {
    throw new Error(errors.InvalidArgument(argument));
  }
};
/**
 * Validates single argument
 * @param {*} argument 
 */


var validatePresenceOf = function validatePresenceOf(argument) {
  if (!argument) {
    throw new Error(errors.InvalidArgument(argument));
  }
};

var Client = function Client(_ref) {
  var _this = this;

  var clientId = _ref.clientId,
      senderCompId = _ref.senderCompId,
      accountCredentialsList = _ref.accountCredentialsList,
      curveServerKey = _ref.curveServerKey,
      tesSocketEndpoint = _ref.tesSocketEndpoint;

  _classCallCheck(this, Client);

  _defineProperty(this, "checkAccountData", function (resolve, reject) {
    if (_this.accountDataUpdated) {
      return resolve();
    } else if (_this.accountDataSystemError) {
      return reject({
        errorMessage: "Error occurred on some exchange accounts.",
        erroneousAccountIds: _this.erroneousAccountIds
      });
    } else {
      setTimeout(function () {
        return _this.checkAccountData(resolve, reject);
      }, 100);
    }
  });

  _defineProperty(this, "sendMessage", function (_ref2) {
    var expectedRequestId = _ref2.expectedRequestId,
        responseMessageBodyType = _ref2.responseMessageBodyType,
        message = _ref2.message,
        requestIdCallback = _ref2.requestIdCallback,
        responseTypeCallback = _ref2.responseTypeCallback;

    _this.messenger.sendMessage({
      expectedRequestId: expectedRequestId,
      responseMessageBodyType: responseMessageBodyType,
      message: message,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "updateAccessToken", function (_ref3) {
    var newAccessToken = _ref3.newAccessToken;
    _this.accessToken = newAccessToken;
    _this.defaultRequestHeader.accessToken = newAccessToken;
  });

  _defineProperty(this, "internalAuthorizationGrantCallback", function (authorizationGrant) {
    if (authorizationGrant) {
      if (authorizationGrant.success) {
        _this.updateAuthorization({
          authorizationGrant: authorizationGrant
        });
      } else {
        _this.scheduleAuthorizationRefresh({
          delayInSeconds: 60
        });
      }
    }
  });

  _defineProperty(this, "refreshAuthorization", function () {
    _this.sendAuthorizationRefreshMessage({
      authorizationRefreshParams: new AuthorizationRefreshParams({
        refreshToken: _this.refreshToken
      }),
      requestIdCallback: _this.internalAuthorizationGrantCallback
    });
  });

  _defineProperty(this, "scheduleAuthorizationRefresh", function (_ref4) {
    var delayInSeconds = _ref4.delayInSeconds;
    setTimeout(function () {
      return _this.refreshAuthorization;
    }, delayInSeconds);
  });

  _defineProperty(this, "updateAuthorization", function (_ref5) {
    var authorizationGrant = _ref5.authorizationGrant;
    _this.refreshToken = authorizationGrant.refreshToken;

    _this.updateAccessToken({
      newAccessToken: authorizationGrant.accessToken
    });

    _this.scheduleAuthorizationRefresh({
      delayInSeconds: authorizationGrant.expireAt - Date.now() - 120
    });
  });

  _defineProperty(this, "processAccountId", function (_ref6) {
    var accountId = _ref6.accountId;

    _this.pendingAccountIds.delete(accountId);

    if (_this.pendingAccountIds.size === 0) {
      if (!_this.accountDataSystemError) {
        _this.accountDataUpdated = true;
      }

      _this.messenger.unsubscribeCallbackFromResponseType({
        responseMessageBodyType: messageBodyTypes.ACCOUNT_DATA_REPORT
      });

      _this.messenger.unsubscribeCallbackFromResponseType({
        responseMessageBodyType: messageBodyTypes.SYSTEM
      });
    }
  });

  _defineProperty(this, "receiveSystemMessage", function (systemMessage) {
    _this.accountDataSystemError = true;
    var accountId = systemMessage.accountInfo.accountID;

    _this.erroneousAccountIds.add(accountId);

    _this.processAccountId({
      accountId: accountId
    });
  });

  _defineProperty(this, "receiveInitialAccountDataReport", function (accountDataReport) {
    _this.processAccountId({
      accountId: accountDataReport.accountInfo.accountID
    });
  });

  _defineProperty(this, "ready",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              _this.checkAccountData(resolve, reject);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

  _defineProperty(this, "close", function () {
    _this.messenger.cleanup();
  });

  _defineProperty(this, "subscribeCallbackToResponseType", function (_ref8) {
    var responseMessageBodyType = _ref8.responseMessageBodyType,
        responseTypeCallback = _ref8.responseTypeCallback;

    _this.messenger.subscribeCallbackToResponseType({
      responseMessageBodyType: responseMessageBodyType,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "unsubscribeCallbackFromResponseType", function (_ref9) {
    var responseMessageBodyType = _ref9.responseMessageBodyType;

    _this.messenger.unsubscribeCallbackFromResponseType({
      responseMessageBodyType: responseMessageBodyType
    });
  });

  _defineProperty(this, "sendHeartbeatMessage", function (_ref10) {
    var _ref10$requestIdCallb = _ref10.requestIdCallback,
        requestIdCallback = _ref10$requestIdCallb === void 0 ? undefined : _ref10$requestIdCallb,
        _ref10$responseTypeCa = _ref10.responseTypeCallback,
        responseTypeCallback = _ref10$responseTypeCa === void 0 ? undefined : _ref10$responseTypeCa;

    var heartbeatMessage = _this.messageFactory.buildHeartbeatMessage({
      requestHeader: _this.defaultRequestHeader
    });

    _this.sendMessage({
      expectedRequestId: heartbeatMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.HEARTBEAT,
      message: heartbeatMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendTestMessage", function (_ref11) {
    var testMessageParams = _ref11.testMessageParams,
        _ref11$requestIdCallb = _ref11.requestIdCallback,
        requestIdCallback = _ref11$requestIdCallb === void 0 ? undefined : _ref11$requestIdCallb,
        _ref11$responseTypeCa = _ref11.responseTypeCallback,
        responseTypeCallback = _ref11$responseTypeCa === void 0 ? undefined : _ref11$responseTypeCa;

    var testMessage = _this.messageFactory.buildTestMessage({
      requestHeader: _this.defaultRequestHeader,
      testMessageParams: testMessageParams
    });

    _this.sendMessage({
      expectedRequestId: testMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.TEST,
      message: testMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetServerTimeMessage", function (_ref12) {
    var _ref12$requestIdCallb = _ref12.requestIdCallback,
        requestIdCallback = _ref12$requestIdCallb === void 0 ? undefined : _ref12$requestIdCallb,
        _ref12$responseTypeCa = _ref12.responseTypeCallback,
        responseTypeCallback = _ref12$responseTypeCa === void 0 ? undefined : _ref12$responseTypeCa;

    var getServerTimeMessage = _this.messageFactory.buildGetServerTimeMessage({
      requestHeader: _this.defaultRequestHeader
    });

    _this.sendMessage({
      expectedRequestId: getServerTimeMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.SERVER_TIME,
      message: getServerTimeMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "subscribeLogonCallbacks", function () {
    _this.messenger.subscribeCallbackToResponseType({
      responseMessageBodyType: messageBodyTypes.ACCOUNT_DATA_REPORT,
      responseTypeCallback: _this.receiveInitialAccountDataReport
    });

    _this.messenger.subscribeCallbackToResponseType({
      responseMessageBodyType: messageBodyTypes.SYSTEM,
      responseTypeCallback: _this.receiveSystemMessage
    }); // If there is no subscriber to the observable, it seems
    // like a subscription will be automatically added to the
    // observable if a message is sent from .  Eventually
    // there will be a leak since too many eventlisteners are
    // subscribed.  This is a hack to subscribe a subscription
    // that listens to non-existent "null" messageTypes so that
    // at any given time there will only be one extra
    // subscription.


    _this.messenger.subscribePlaceholderCallback();
  });

  _defineProperty(this, "internalLogonAckCallback", function (_ref13) {
    var logonAck = _ref13.logonAck;

    if (logonAck && logonAck.success) {
      _this.subscribeLogonCallbacks();

      if (logonAck.authorizationGrant) {
        _this.internalAuthorizationGrantCallback(logonAck.authorizationGrant);
      }
    }
  });

  _defineProperty(this, "sendLogonMessage", function (_ref14) {
    var logonParams = _ref14.logonParams,
        _ref14$requestIdCallb = _ref14.requestIdCallback,
        _requestIdCallback = _ref14$requestIdCallb === void 0 ? undefined : _ref14$requestIdCallb,
        _ref14$responseTypeCa = _ref14.responseTypeCallback,
        responseTypeCallback = _ref14$responseTypeCa === void 0 ? undefined : _ref14$responseTypeCa;

    var logonMessage = _this.messageFactory.buildLogonMessage({
      requestHeader: _this.defaultRequestHeader,
      logonParams: logonParams
    });

    logonParams.credentials.forEach(function (accountCredentials) {
      return _this.pendingAccountIds.add(accountCredentials.accountInfo.accountID);
    });

    _this.sendMessage({
      expectedRequestId: logonMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.LOGON_ACK,
      message: logonMessage,
      requestIdCallback: function requestIdCallback(logonAck) {
        _this.internalLogonAckCallback({
          logonAck: logonAck
        });

        _requestIdCallback(logonAck);
      },
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendLogoffMessage", function (_ref15) {
    var _ref15$requestIdCallb = _ref15.requestIdCallback,
        requestIdCallback = _ref15$requestIdCallb === void 0 ? undefined : _ref15$requestIdCallb,
        _ref15$responseTypeCa = _ref15.responseTypeCallback,
        responseTypeCallback = _ref15$responseTypeCa === void 0 ? undefined : _ref15$responseTypeCa;

    var logoffMessage = _this.messageFactory.buildLogoffMessage({
      requestHeader: _this.defaultRequestHeader
    });

    _this.sendMessage({
      expectedRequestId: logoffMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.LOGOFF_ACK,
      message: logoffMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendAuthorizationRefreshMessage", function (_ref16) {
    var authorizationRefreshParams = _ref16.authorizationRefreshParams,
        _ref16$requestIdCallb = _ref16.requestIdCallback,
        requestIdCallback = _ref16$requestIdCallb === void 0 ? undefined : _ref16$requestIdCallb,
        _ref16$responseTypeCa = _ref16.responseTypeCallback,
        responseTypeCallback = _ref16$responseTypeCa === void 0 ? undefined : _ref16$responseTypeCa;

    var authorizationRefreshMessage = _this.messageFactory.buildAuthorizationRefreshMessage({
      requestHeader: _this.defaultRequestHeader,
      authorizationRefreshParams: authorizationRefreshParams
    });

    _this.sendMessage({
      expectedRequestId: authorizationRefreshMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.AUTHORIZATION_GRANT,
      message: authorizationRefreshMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendPlaceSingleOrderMessage", function (_ref17) {
    var placeOrderParams = _ref17.placeOrderParams,
        _ref17$requestIdCallb = _ref17.requestIdCallback,
        requestIdCallback = _ref17$requestIdCallb === void 0 ? undefined : _ref17$requestIdCallb,
        _ref17$responseTypeCa = _ref17.responseTypeCallback,
        responseTypeCallback = _ref17$responseTypeCa === void 0 ? undefined : _ref17$responseTypeCa;

    var placeOrderMessage = _this.messageFactory.buildPlaceSingleOrderMessage({
      requestHeader: _this.defaultRequestHeader,
      placeOrderParams: placeOrderParams
    });

    _this.sendMessage({
      expectedRequestId: placeOrderMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
      message: placeOrderMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendPlaceContingentOrderMessage", function (_ref18) {
    var placeContingentOrderParams = _ref18.placeContingentOrderParams,
        _ref18$requestIdCallb = _ref18.requestIdCallback,
        requestIdCallback = _ref18$requestIdCallb === void 0 ? undefined : _ref18$requestIdCallb,
        _ref18$responseTypeCa = _ref18.responseTypeCallback,
        responseTypeCallback = _ref18$responseTypeCa === void 0 ? undefined : _ref18$responseTypeCa;

    var placeContingentOrderMessage = _this.messageFactory.buildPlaceContingentOrderMessage({
      requestHeader: _this.defaultRequestHeader,
      placeContingentOrderParams: placeContingentOrderParams
    });

    _this.sendMessage({
      expectedRequestId: placeContingentOrderMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
      message: placeContingentOrderMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendReplaceOrderMessage", function (_ref19) {
    var replaceOrderParams = _ref19.replaceOrderParams,
        _ref19$requestIdCallb = _ref19.requestIdCallback,
        requestIdCallback = _ref19$requestIdCallb === void 0 ? undefined : _ref19$requestIdCallb,
        _ref19$responseTypeCa = _ref19.responseTypeCallback,
        responseTypeCallback = _ref19$responseTypeCa === void 0 ? undefined : _ref19$responseTypeCa;

    var replaceOrderMessage = _this.messageFactory.buildReplaceOrderMessage({
      requestHeader: _this.defaultRequestHeader,
      replaceOrderParams: replaceOrderParams
    });

    _this.sendMessage({
      expectedRequestId: replaceOrderMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
      message: replaceOrderMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendCancelOrderMessage", function (_ref20) {
    var cancelOrderParams = _ref20.cancelOrderParams,
        _ref20$requestIdCallb = _ref20.requestIdCallback,
        requestIdCallback = _ref20$requestIdCallb === void 0 ? undefined : _ref20$requestIdCallb,
        _ref20$responseTypeCa = _ref20.responseTypeCallback,
        responseTypeCallback = _ref20$responseTypeCa === void 0 ? undefined : _ref20$responseTypeCa;

    var cancelOrderMessage = _this.messageFactory.buildCancelOrderMessage({
      requestHeader: _this.defaultRequestHeader,
      cancelOrderParams: cancelOrderParams
    });

    _this.sendMessage({
      expectedRequestId: cancelOrderMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
      message: cancelOrderMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetOrderStatusMessage", function (_ref21) {
    var getOrderStatusParams = _ref21.getOrderStatusParams,
        _ref21$requestIdCallb = _ref21.requestIdCallback,
        requestIdCallback = _ref21$requestIdCallb === void 0 ? undefined : _ref21$requestIdCallb,
        _ref21$responseTypeCa = _ref21.responseTypeCallback,
        responseTypeCallback = _ref21$responseTypeCa === void 0 ? undefined : _ref21$responseTypeCa;

    var getOrderStatusMessage = _this.messageFactory.buildGetOrderStatusMessage({
      requestHeader: _this.defaultRequestHeader,
      getOrderStatusParams: getOrderStatusParams
    });

    _this.sendMessage({
      expectedRequestId: getOrderStatusMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
      message: getOrderStatusMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetAccountDataMessage", function (_ref22) {
    var getAccountDataParams = _ref22.getAccountDataParams,
        _ref22$requestIdCallb = _ref22.requestIdCallback,
        requestIdCallback = _ref22$requestIdCallb === void 0 ? undefined : _ref22$requestIdCallb,
        _ref22$responseTypeCa = _ref22.responseTypeCallback,
        responseTypeCallback = _ref22$responseTypeCa === void 0 ? undefined : _ref22$responseTypeCa;

    var getAccountDataMessage = _this.messageFactory.buildGetAccountDataMessage({
      requestHeader: _this.defaultRequestHeader,
      getAccountDataParams: getAccountDataParams
    });

    _this.sendMessage({
      expectedRequestId: getAccountDataMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.ACCOUNT_DATA_REPORT,
      message: getAccountDataMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetAccountBalancesMessage", function (_ref23) {
    var getAccountBalancesParams = _ref23.getAccountBalancesParams,
        _ref23$requestIdCallb = _ref23.requestIdCallback,
        requestIdCallback = _ref23$requestIdCallb === void 0 ? undefined : _ref23$requestIdCallb,
        _ref23$responseTypeCa = _ref23.responseTypeCallback,
        responseTypeCallback = _ref23$responseTypeCa === void 0 ? undefined : _ref23$responseTypeCa;

    var getAccountBalancesMessage = _this.messageFactory.buildGetAccountBalancesMessage({
      requestHeader: _this.defaultRequestHeader,
      getAccountBalancesParams: getAccountBalancesParams
    });

    _this.sendMessage({
      expectedRequestId: getAccountBalancesMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.ACCOUNT_BALANCES_REPORT,
      message: getAccountBalancesMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetOpenPositionsMessage", function (_ref24) {
    var getOpenPositionsParams = _ref24.getOpenPositionsParams,
        _ref24$requestIdCallb = _ref24.requestIdCallback,
        requestIdCallback = _ref24$requestIdCallb === void 0 ? undefined : _ref24$requestIdCallb,
        _ref24$responseTypeCa = _ref24.responseTypeCallback,
        responseTypeCallback = _ref24$responseTypeCa === void 0 ? undefined : _ref24$responseTypeCa;

    var getOpenPositionsMessage = _this.messageFactory.buildGetOpenPositionsMessage({
      requestHeader: _this.defaultRequestHeader,
      getOpenPositionsParams: getOpenPositionsParams
    });

    _this.sendMessage({
      expectedRequestId: getOpenPositionsMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.OPEN_POSITIONS_REPORT,
      message: getOpenPositionsMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetWorkingOrdersMessage", function (_ref25) {
    var getWorkingOrdersParams = _ref25.getWorkingOrdersParams,
        _ref25$requestIdCallb = _ref25.requestIdCallback,
        requestIdCallback = _ref25$requestIdCallb === void 0 ? undefined : _ref25$requestIdCallb,
        _ref25$responseTypeCa = _ref25.responseTypeCallback,
        responseTypeCallback = _ref25$responseTypeCa === void 0 ? undefined : _ref25$responseTypeCa;

    var getWorkingOrdersMessage = _this.messageFactory.buildGetWorkingOrdersMessage({
      requestHeader: _this.defaultRequestHeader,
      getWorkingOrdersParams: getWorkingOrdersParams
    });

    _this.sendMessage({
      expectedRequestId: getWorkingOrdersMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.WORKING_ORDERS_REPORT,
      message: getWorkingOrdersMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetCompletedOrdersMessage", function (_ref26) {
    var getCompletedOrdersParams = _ref26.getCompletedOrdersParams,
        _ref26$requestIdCallb = _ref26.requestIdCallback,
        requestIdCallback = _ref26$requestIdCallb === void 0 ? undefined : _ref26$requestIdCallb,
        _ref26$responseTypeCa = _ref26.responseTypeCallback,
        responseTypeCallback = _ref26$responseTypeCa === void 0 ? undefined : _ref26$responseTypeCa;

    var getCompletedOrdersMessage = _this.messageFactory.buildGetCompletedOrdersMessage({
      requestHeader: _this.defaultRequestHeader,
      getCompletedOrdersParams: getCompletedOrdersParams
    });

    _this.sendMessage({
      expectedRequestId: getCompletedOrdersMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.COMPLETED_ORDERS_REPORT,
      message: getCompletedOrdersMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  _defineProperty(this, "sendGetExchangePropertiesMessage", function (_ref27) {
    var getExchangePropertiesParams = _ref27.getExchangePropertiesParams,
        _ref27$requestIdCallb = _ref27.requestIdCallback,
        requestIdCallback = _ref27$requestIdCallb === void 0 ? undefined : _ref27$requestIdCallb,
        _ref27$responseTypeCa = _ref27.responseTypeCallback,
        responseTypeCallback = _ref27$responseTypeCa === void 0 ? undefined : _ref27$responseTypeCa;

    var getExchangePropertiesMessage = _this.messageFactory.buildGetExchangePropertiesMessage({
      requestHeader: _this.defaultRequestHeader,
      getExchangePropertiesParams: getExchangePropertiesParams
    });

    _this.sendMessage({
      expectedRequestId: getExchangePropertiesMessage.type.request.requestID,
      responseMessageBodyType: messageBodyTypes.EXCHANGE_PROPERTIES_REPORT,
      message: getExchangePropertiesMessage,
      requestIdCallback: requestIdCallback,
      responseTypeCallback: responseTypeCallback
    });
  });

  validateArguments(clientId, senderCompId, accountCredentialsList);
  this.clientId = clientId;
  this.senderCompId = senderCompId;
  this.accountCredentialsList = accountCredentialsList;
  this.accessToken = undefined;
  this.refreshToken = undefined;
  this.defaultRequestHeader = new RequestHeader({
    clientId: clientId,
    senderCompId: senderCompId
  });
  var backendSocketEndpoint = "inproc://" + String(clientId) + senderCompId;
  this.messageFactory = new MessageFactory();
  this.messenger = new Messenger({
    curveServerKey: curveServerKey,
    tesSocketEndpoint: tesSocketEndpoint,
    backendSocketEndpoint: backendSocketEndpoint
  });
  this.accountDataUpdated = false;
  this.accountDataSystemError = false;
  this.pendingAccountIds = new Set([]);
  this.erroneousAccountIds = new Set([]);
};

var AccountInfo = function AccountInfo(_ref) {
  var accountId = _ref.accountId,
      _ref$exchange = _ref.exchange,
      exchange = _ref$exchange === void 0 ? undefined : _ref$exchange,
      _ref$accountType = _ref.accountType,
      accountType = _ref$accountType === void 0 ? undefined : _ref$accountType,
      _ref$exchangeAccountI = _ref.exchangeAccountId,
      exchangeAccountId = _ref$exchangeAccountI === void 0 ? undefined : _ref$exchangeAccountI,
      _ref$exchangeClientId = _ref.exchangeClientId,
      exchangeClientId = _ref$exchangeClientId === void 0 ? undefined : _ref$exchangeClientId;

  _classCallCheck(this, AccountInfo);

  /**
   * @param accountId: (int) id corresponding to an account on an exchange
   *    Required.
   * @param exchange: (String) exchange in which account_id is contained.
   *     Empty in client request.
   * @param accountType: (String) exchange account type (exchange,
   *     margin, combined), empty in client request.
   * @param exchangeAccountId: (String) account/wallet id, empty in client
   *     request.
   * @param exchangeClientId: (String) exchange client (customer) ID,
   *    empty in client request.
  */
  validatePresenceOf(accountId);
  this.accountID = accountId;

  if (exchange !== undefined) {
    this.exchange = exchange;
  }

  if (accountType !== undefined) {
    this.accountType = accountType;
  }

  if (exchange !== undefined) {
    this.exchangeAccountID = exchangeAccountId;
  }

  if (exchange !== undefined) {
    this.exchangeClientID = exchangeClientId;
  }
};

var AccountCredentials = function AccountCredentials(_ref) {
  var _this = this;

  var accountId = _ref.accountId,
      apiKey = _ref.apiKey,
      secretKey = _ref.secretKey,
      _ref$passphrase = _ref.passphrase,
      passphrase = _ref$passphrase === void 0 ? '' : _ref$passphrase;

  _classCallCheck(this, AccountCredentials);

  _defineProperty(this, "accountInfo", function () {
    return _this.accountInfo;
  });

  /**
  AccountCredentials object is used for logon
  * @param accountId: (int) accountId assigned by Fund3
  * @param apiKey: (String) apiKey for connecting to exchange API
  *    associated with accountID
  * @param secretKey: (String) secretKey for connecting to exchange API
  *    associated with accountID
  * @param passphrase: (String) optional passphrase for connecting to API
  *    associated with accountID
  */
  this.accountInfo = new AccountInfo({
    accountId: accountId
  });
  this.apiKey = String(apiKey);
  this.secretKey = String(secretKey);
  this.passphrase = String(passphrase);
};

var KrakenClient = require('kraken-api');

var TickerFactory = function TickerFactory(key, secret) {
  var _this = this;

  _classCallCheck(this, TickerFactory);

  _defineProperty(this, "getFeesFromKraken", function (_ref) {
    var pair = _ref.pair,
        onResponse = _ref.onResponse;

    _this.krakenApi.api('TradeVolume', {
      "pair": pair
    }, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        var taker_fee = parseFloat(data.result.fees[pair].fee);
        var maker_fee = parseFloat(data.result.fees_maker[pair].fee);
        onResponse({
          'maker_fee': maker_fee,
          'taker_fee': taker_fee
        });
      }
    });
  });

  this.krakenApi = new KrakenClient(key, secret, {});
};

_defineProperty(TickerFactory, "getLastPrice", function (_ref2) {
  var exchange = _ref2.exchange,
      pair = _ref2.pair,
      _ref2$sandbox = _ref2.sandbox,
      sandbox = _ref2$sandbox === void 0 ? false : _ref2$sandbox,
      onResponse = _ref2.onResponse;

  switch (exchange) {
    case exchanges.COINBASE_PRIME:
      return TickerFactory.getTickerFromCoinbasePrime({
        pair: pair,
        sandbox: sandbox,
        onResponse: onResponse
      });

    case exchanges.GEMINI:
      return TickerFactory.getTickerFromGemini({
        pair: pair,
        sandbox: sandbox,
        onResponse: onResponse
      });

    case exchanges.KRAKEN:
      return TickerFactory.getTickerFromKraken({
        pair: pair,
        onResponse: onResponse
      });
  }
});

_defineProperty(TickerFactory, "getTickerFromCoinbasePrime", function (_ref3) {
  var pair = _ref3.pair,
      sandbox = _ref3.sandbox,
      onResponse = _ref3.onResponse;
  var url;

  if (sandbox) {
    url = 'https://api-public.sandbox.prime.coinbase.com/products/';
  } else {
    url = 'https://api.prime.coinbase.com/products/';
  }

  var options = {
    url: url + pair + '/ticker',
    // Format: 'BTC-USD'
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };
  request(options, onResponse);
});

_defineProperty(TickerFactory, "getTickerFromGemini", function (_ref4) {
  var pair = _ref4.pair,
      sandbox = _ref4.sandbox,
      onResponse = _ref4.onResponse;
  var url;

  if (sandbox) {
    url = 'https://api.sandbox.gemini.com/v1/pubticker/';
  } else {
    url = 'https://api.gemini.com/v1/pubticker/';
  }

  var options = {
    url: url + pair,
    // Format: 'btcusd'
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };
  request(options, onResponse);
});

_defineProperty(TickerFactory, "getTickerFromKraken", function (_ref5) {
  var pair = _ref5.pair,
      onResponse = _ref5.onResponse;
  var url = 'https://api.kraken.com/0/public/Ticker?pair=';
  var options = {
    url: url + pair,
    // Format: 'XXBTZUSD'
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };
  request(options, onResponse);
});

_defineProperty(TickerFactory, "formatTickerFromCoinbasePrime", function (_ref6) {
  var body = _ref6.body;

  if (body === undefined || body === null) {
    return 0.0;
  }

  return parseFloat(body.price);
});

_defineProperty(TickerFactory, "formatTickerFromGemini", function (_ref7) {
  var body = _ref7.body;

  if (body === undefined || body === null) {
    return 0.0;
  }

  return parseFloat(body.last);
});

_defineProperty(TickerFactory, "formatTickerFromKraken", function (_ref8) {
  var body = _ref8.body,
      pair = _ref8.pair;

  if (body === undefined || body === null) {
    return 0.0;
  }

  if (body.result === undefined || body.result === null) {
    return 0.0;
  }

  if (body.result[pair] === undefined || body.result[pair] === null) {
    return 0.0;
  }

  if (!Array.isArray(body.result[pair].c) || !body.result[pair].c.length) {
    return 0.0;
  }

  return parseFloat(body.result[pair].c[0]);
});

_defineProperty(TickerFactory, "get24HrPriceFromCoinbasePrime", function (_ref9) {
  var sandbox = _ref9.sandbox,
      pair = _ref9.pair,
      onResponse = _ref9.onResponse;
  var url;

  if (sandbox) {
    url = 'https://api-public.sandbox.prime.coinbase.com/products/';
  } else {
    url = 'https://api.prime.coinbase.com/products/';
  }

  var options = {
    url: url + pair + '/stats',
    // Format: 'BTC-USD'
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };
  request(options, onResponse);
});

_defineProperty(TickerFactory, "format24HrPriceFromCoinbasePrime", function (_ref10) {
  var body = _ref10.body;

  if (body === undefined || body === null) {
    return 0.0;
  }

  return parseFloat(body.open);
});

_defineProperty(TickerFactory, "get24HrPriceFromGemini", function (_ref11) {
  var sandbox = _ref11.sandbox,
      pair = _ref11.pair,
      onResponse = _ref11.onResponse;
  var url;

  if (sandbox) {
    url = 'https://api.sandbox.gemini.com/v1/trades/';
  } else {
    url = 'https://api.gemini.com/v1/trades/';
  }

  var currentTimestamp = Math.floor(Date.now());
  url = url + pair + '?limit_trades=1&since=' + String(currentTimestamp - 86400000) + '&pair=';
  var options = {
    url: url + pair,
    // Format: 'btcusd'
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };
  request(options, onResponse);
});

_defineProperty(TickerFactory, "format24HrPriceFromGemini", function (_ref12) {
  var body = _ref12.body;

  if (!Array.isArray(body) || !body.length) {
    return 0.0;
  }

  if (body[0] === undefined || body[0] === null) {
    return 0.0;
  }

  return parseFloat(body[0]['price']);
});

_defineProperty(TickerFactory, "get24HrPriceFromKraken", function (_ref13) {
  var pair = _ref13.pair,
      onResponse = _ref13.onResponse;
  var currentTimestamp = Math.floor(Date.now() / 1000);
  var url = 'https://api.kraken.com/0/public/OHLC?interval=5&since=' + String(currentTimestamp - 86400) + '&pair=';
  var options = {
    url: url + pair,
    // Format: 'XXBTZUSD'
    headers: {
      'User-Agent': 'request'
    },
    json: true
  };
  request(options, onResponse);
});

_defineProperty(TickerFactory, "format24HrPriceFromKraken", function (_ref14) {
  var pair = _ref14.pair,
      body = _ref14.body;

  if (body === undefined || body === null) {
    return 0.0;
  }

  if (body.result === undefined || body.result === null) {
    return 0.0;
  }

  if (body.result[pair] === undefined || body.result[pair] === null) {
    return 0.0;
  }

  if (!Array.isArray(body.result[pair]) || !body.result[pair].length) {
    return 0.0;
  }

  if (!Array.isArray(body.result[pair][0]) || !body.result[pair][0].length) {
    return 0.0;
  }

  return parseFloat(body.result[pair][0][1]);
});

var CancelOrderParams = function CancelOrderParams(_ref) {
  var accountId = _ref.accountId,
      orderId = _ref.orderId;

  _classCallCheck(this, CancelOrderParams);

  /**
   * @param accountInfo: (int) accountInfo corresponding to an account
   *     on an exchange. Required.
   * @param orderId: (String) id corresponding to an order on TES.
   *    Required.
  */
  this.accountInfo = new AccountInfo({
    accountId: accountId
  });
  this.orderID = orderId;
};

var GetAccountBalancesParams = function GetAccountBalancesParams(_ref) {
  var accountId = _ref.accountId;

  _classCallCheck(this, GetAccountBalancesParams);

  /**
   * @param accountInfo: (int) accountInfo corresponding to an account
   *     on an exchange. Required.
  */
  this.accountInfo = new AccountInfo({
    accountId: accountId
  });
};

var GetAccountDataParams = function GetAccountDataParams(_ref) {
  var accountId = _ref.accountId;

  _classCallCheck(this, GetAccountDataParams);

  /**
   * @param accountInfo: (int) accountInfo corresponding to an account
   *     on an exchange. Required.
  */
  this.accountInfo = new AccountInfo({
    accountId: accountId
  });
};

var GetCompletedOrdersParams = function GetCompletedOrdersParams(_ref) {
  var accountId = _ref.accountId,
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? undefined : _ref$count,
      _ref$since = _ref.since,
      since = _ref$since === void 0 ? undefined : _ref$since;

  _classCallCheck(this, GetCompletedOrdersParams);

  /**
   * @param accountInfo: (int) accountInfo corresponding to an account
   *     on an exchange. Required.
  */
  this.accountInfo = new AccountInfo({
    accountId: accountId
  });

  if (count !== undefined) {
    this.count = count;
  }

  if (since !== undefined) {
    this.since = since;
  }
};

var GetExchangePropertiesParams = function GetExchangePropertiesParams(_ref) {
  var exchange = _ref.exchange;

  _classCallCheck(this, GetExchangePropertiesParams);

  /**
   * @param exchange: (String) name of exchange. Required.
  */
  this.exchange = exchange;
};

var GetOpenPositionsParams = function GetOpenPositionsParams(_ref) {
  var accountId = _ref.accountId;

  _classCallCheck(this, GetOpenPositionsParams);

  /**
   * @param accountInfo: (int) accountInfo corresponding to an account
   *     on an exchange. Required.
  */
  this.accountInfo = new AccountInfo({
    accountId: accountId
  });
};

var GetOrderStatusParams = function GetOrderStatusParams(_ref) {
  var accountId = _ref.accountId,
      orderId = _ref.orderId;

  _classCallCheck(this, GetOrderStatusParams);

  /**
   * @param accountInfo: (int) accountInfo corresponding to an account
   *     on an exchange. Required.
   * @param orderId: (String) id corresponding to an order on TES.
   *    Required.
  */
  this.accountInfo = new AccountInfo({
    accountId: accountId
  });
  this.orderID = orderId;
};

var GetWorkingOrdersParams = function GetWorkingOrdersParams(_ref) {
  var accountId = _ref.accountId;

  _classCallCheck(this, GetWorkingOrdersParams);

  /**
   * @param accountInfo: (int) accountInfo corresponding to an account
   *     on an exchange. Required.
  */
  this.accountInfo = new AccountInfo({
    accountId: accountId
  });
};

var LogonParams = function LogonParams(_ref) {
  var clientSecret = _ref.clientSecret,
      credentials = _ref.credentials;

  _classCallCheck(this, LogonParams);

  /**
   * @param clientSecret: (String) clientSecret token assigned by Fund3.
   * @param credentials: (Array[AccountCredentials]) Array of
   *     AccountCredentials for exchange accounts.
  */
  this.clientSecret = clientSecret;
  this.credentials = credentials;
};

// import { leverageType, timeInForce } from "../constants/index";

var PlaceSingleOrderParams = function PlaceSingleOrderParams(_ref) {
  var accountId = _ref.accountId,
      clientOrderId = _ref.clientOrderId,
      _ref$clientOrderLinkI = _ref.clientOrderLinkId,
      clientOrderLinkId = _ref$clientOrderLinkI === void 0 ? undefined : _ref$clientOrderLinkI,
      symbol = _ref.symbol,
      side = _ref.side,
      _ref$orderType = _ref.orderType,
      orderType = _ref$orderType === void 0 ? undefined : _ref$orderType,
      quantity = _ref.quantity,
      _ref$price = _ref.price,
      price = _ref$price === void 0 ? undefined : _ref$price,
      _ref$stopPrice = _ref.stopPrice,
      stopPrice = _ref$stopPrice === void 0 ? undefined : _ref$stopPrice,
      _ref$timeInForce = _ref.timeInForce,
      timeInForce = _ref$timeInForce === void 0 ? undefined : _ref$timeInForce,
      _ref$expireAt = _ref.expireAt,
      expireAt = _ref$expireAt === void 0 ? undefined : _ref$expireAt,
      _ref$leverageType = _ref.leverageType,
      leverageType = _ref$leverageType === void 0 ? undefined : _ref$leverageType,
      _ref$leverage = _ref.leverage,
      leverage = _ref$leverage === void 0 ? undefined : _ref$leverage;

  _classCallCheck(this, PlaceSingleOrderParams);

  this.accountInfo = new AccountInfo({
    accountId: accountId
  });
  this.clientOrderID = clientOrderId;

  if (clientOrderLinkId !== undefined) {
    this.clientOrderLinkID = clientOrderLinkId;
  }

  this.symbol = symbol;
  this.side = side;

  if (orderType !== undefined) {
    this.orderType = orderType;
  }

  this.quantity = quantity;

  if (price !== undefined) {
    this.price = price;
  }

  if (stopPrice !== undefined) {
    this.stopPrice = stopPrice;
  }

  if (timeInForce !== undefined) {
    this.timeInForce = timeInForce;
  }

  if (expireAt !== undefined) {
    this.expireAt = expireAt;
  }

  if (leverageType !== undefined) {
    this.leverageType = leverageType;
  }

  if (leverage !== undefined) {
    this.leverage = leverage;
  }
};

var errors$1 = {
  TooManyArguments: 'Argument error: only one of batch, oco, opo ' + 'can exist but more than one are present.',
  MissingArgument: 'Argument error: missing argument.'
};

var PlaceContingentOrderParams = function PlaceContingentOrderParams(_ref) {
  var _ref$batch = _ref.batch,
      batch = _ref$batch === void 0 ? undefined : _ref$batch,
      _ref$oco = _ref.oco,
      oco = _ref$oco === void 0 ? undefined : _ref$oco,
      _ref$opo = _ref.opo,
      opo = _ref$opo === void 0 ? undefined : _ref$opo;

  _classCallCheck(this, PlaceContingentOrderParams);

  /**
   * @param type: (String) clientSecret token assigned by Fund3.
   * @param credentials: (Array[AccountCredentials]) Array of
   *     AccountCredentials for exchange accounts.
  */
  if (batch && oco === undefined && opo === undefined) {
    this.type = {
      batch: batch
    };
  } else if (batch === undefined && oco && opo === undefined) {
    this.type = {
      oco: oco
    };
  } else if (batch === undefined && oco === undefined && opo) {
    this.type = {
      opo: opo
    };
  } else {
    throw new Error(errors$1.TooManyArguments);
  }
};

// import { leverageType, timeInForce } from "../constants/index";

var ReplaceOrderParams = function ReplaceOrderParams(_ref) {
  var accountId = _ref.accountId,
      orderId = _ref.orderId,
      _ref$quantity = _ref.quantity,
      quantity = _ref$quantity === void 0 ? undefined : _ref$quantity,
      _ref$price = _ref.price,
      price = _ref$price === void 0 ? undefined : _ref$price,
      _ref$stopPrice = _ref.stopPrice,
      stopPrice = _ref$stopPrice === void 0 ? undefined : _ref$stopPrice;

  _classCallCheck(this, ReplaceOrderParams);

  this.accountInfo = new AccountInfo({
    accountId: accountId
  });
  this.orderID = orderId;

  if (quantity !== undefined) {
    this.quantity = quantity;
  }

  if (price !== undefined) {
    this.price = price;
  }

  if (stopPrice !== undefined) {
    this.stopPrice = stopPrice;
  }
};

require("@babel/polyfill");

exports.AccountCredentials = AccountCredentials;
exports.AccountInfo = AccountInfo;
exports.AuthorizationRefreshParams = AuthorizationRefreshParams;
exports.BackendSocket = BackendSocket;
exports.CancelOrderParams = CancelOrderParams;
exports.Client = Client;
exports.GetAccountBalancesParams = GetAccountBalancesParams;
exports.GetAccountDataParams = GetAccountDataParams;
exports.GetCompletedOrdersParams = GetCompletedOrdersParams;
exports.GetExchangePropertiesParams = GetExchangePropertiesParams;
exports.GetOpenPositionsParams = GetOpenPositionsParams;
exports.GetOrderStatusParams = GetOrderStatusParams;
exports.GetWorkingOrdersParams = GetWorkingOrdersParams;
exports.LogonParams = LogonParams;
exports.MessageBodyFactory = MessageBodyFactory;
exports.MessageFactory = MessageFactory;
exports.MessageParser = MessageParser;
exports.MessageResponder = MessageResponder;
exports.MessageSender = MessageSender;
exports.MessageSocket = MessageSocket;
exports.Messenger = Messenger;
exports.PlaceContingentOrderParams = PlaceContingentOrderParams;
exports.PlaceOrderParams = PlaceSingleOrderParams;
exports.ReplaceOrderParams = ReplaceOrderParams;
exports.RequestHeader = RequestHeader;
exports.TesSocket = TesSocket;
exports.TestMessageParams = RequestHeader;
exports.TickerFactory = TickerFactory;
