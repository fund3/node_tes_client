"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExchangePropertiesReport = exports.SymbolProperties = exports.OrderInfo = exports.CompletedOrdersReport = exports.WorkingOrdersReport = exports.OpenPositionsReport = exports.AccountBalancesReport = exports.AccountDataReport = exports.ExecutionReport = exports.OpenPosition = exports.Balance = exports.RequestRejected = exports.Order = exports.AccountType = exports.LeverageType = exports.OrderStatus = exports.OrderType = exports.Side = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// common_types.js
// Enums
var Side = {
  // Trading Sides
  // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
  //
  undefined: 0,
  buy: 1,
  sell: 2
};
exports.Side = Side;
var OrderType = {
  // Supported Order Types
  // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
  //
  undefined: 0,
  market: 1,
  limit: 2,
  stop: 3,
  stopLimit: 4,
  trailingStop: 5,
  trailingStopLimit: 6
};
exports.OrderType = OrderType;
var OrderStatus = {
  // Order Status on Exchange
  // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
  //
  undefined: 0,
  received: 1,
  adopted: 2,
  working: 3,
  partiallyFilled: 4,
  filled: 5,
  pendingReplace: 6,
  replaced: 7,
  pendingCancel: 8,
  canceled: 9,
  rejected: 10,
  expired: 11,
  failed: 12
};
exports.OrderStatus = OrderStatus;
var ExecutionType = {
  undefined: 0,
  orderAccepted: 1,
  orderRejected: 2,
  orderReplaced: 3,
  replaceRejected: 4,
  orderCanceled: 5,
  cancelRejected: 6,
  orderFilled: 7,
  statusUpdate: 8,
  statusUpdateRejected: 9
};
var LeverageType = {
  // Leverage Type
  // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
  //
  undefined: 0,
  exchangeDefault: 1,
  custom: 2
};
exports.LeverageType = LeverageType;
var AccountType = {
  // Account Type
  // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
  //
  undefined: 0,
  exchange: 1,
  margin: 2,
  combined: 3
}; // Classes

exports.AccountType = AccountType;

var Order =
/*#__PURE__*/
function () {
  //
  // object created for placing a new Order.
  //
  function Order(accountInfo, clientOrderID, symbol, side, orderType, quantity, price, timeInForce, leverageType, leverage, clientOrderLinkID) {
    _classCallCheck(this, Order);

    /**
    * @param accountInfo: AccountInfo
    * @param clientOrderID: int orderID generated on the client side
    * @param symbol: String
    * @param side: String (see Side enum)
    * @param orderType: String (see OrderType enum)
    * @param quantity: float
    * @param price: float
    * @param timeInForce: String (see TimeInForce enum)
    * @param leverageType: String (see LeverageType enum)
    * @param leverage: float leverage being used on this specific order
    * @param clientOrderLinkID: String used for labeling the order, e.g.
    * when multiple Strategies are trading on the same account)
    */
    this.accountInfo = accountInfo;
    this.clientOrderID = clientOrderID;
    this.symbol = String(symbol);
    this.side = String(side);
    this.orderType = String(orderType);
    this.quantity = quantity;
    this.price = price;
    this.timeInForce = timeInForce;
    this.leverageType = leverageType;
    this.leverage = leverage;
    this.clientOrderLinkID = clientOrderLinkID;
  }

  _createClass(Order, [{
    key: "accountInfo",
    value: function accountInfo() {
      return this.accountInfo;
    }
  }, {
    key: "clientOrderID",
    value: function clientOrderID() {
      return this.clientOrderID;
    }
  }, {
    key: "symbol",
    value: function symbol() {
      return this.symbol;
    }
  }, {
    key: "side",
    value: function side() {
      return this.side;
    }
  }, {
    key: "orderType",
    value: function orderType() {
      return this.orderType;
    }
  }, {
    key: "quantity",
    value: function quantity() {
      return this.quantity;
    }
  }, {
    key: "price",
    value: function price() {
      return this.price;
    }
  }, {
    key: "timeInForce",
    value: function timeInForce() {
      return this.timeInForce;
    }
  }, {
    key: "leverageType",
    value: function leverageType() {
      return this.leverageType;
    }
  }, {
    key: "leverage",
    value: function leverage() {
      return this.leverage;
    }
  }, {
    key: "clientOrderLinkID",
    value: function clientOrderLinkID() {
      return this.clientOrderLinkID;
    }
  }]);

  return Order;
}();

exports.Order = Order;

var RequestRejected =
/*#__PURE__*/
function () {
  function RequestRejected(message) {
    _classCallCheck(this, RequestRejected);

    /** @param message: String rejection reason */
    this.message = String(message);
  }

  _createClass(RequestRejected, [{
    key: "message",
    value: function message() {
      return this.message;
    }
  }]);

  return RequestRejected;
}();

exports.RequestRejected = RequestRejected;

var Balance =
/*#__PURE__*/
function () {
  function Balance(currency, fullBalance, availableBalance) {
    _classCallCheck(this, Balance);

    /**
    * @param currency: String currency pair symbol
    * @param fullBalance: float
    * @param availableBalance: float
    */
    this.currency = String(currency);
    this.fullBalance = fullBalance;
    this.availableBalance = availableBalance;
  }

  _createClass(Balance, [{
    key: "currency",
    value: function currency() {
      return this.currency;
    }
  }, {
    key: "fullBalance",
    value: function fullBalance() {
      return this.fullBalance;
    }
  }, {
    key: "availableBalance",
    value: function availableBalance() {
      return this.availableBalance;
    }
  }]);

  return Balance;
}();

exports.Balance = Balance;

var OpenPosition =
/*#__PURE__*/
function () {
  //
  // OpenPosition is a glorified immutable dict for easy storage and lookup.
  // It is based on the "OpenPosition" Stringuct in:
  // https://github.com/fund3/communication-protocol/blob/master/TradeMessage.capnp
  //
  // TODO dict storing the valid values of these types
  function OpenPosition(symbol, side, quantity, initialPrice, unrealizedPL) {
    _classCallCheck(this, OpenPosition);

    /**
    * @param symbol: String ticker symbol
    * @param side: String (see Side enum)
    * @param quantity: float
    * @param initialPrice: float
    * @param unrealizedPL: float
    */
    this.symbol = String(symbol);
    this.side = String(side);
    this.quantity = quantity;
    this.initialPrice = initialPrice;
    this.unrealizedPL = unrealizedPL;
  }

  _createClass(OpenPosition, [{
    key: "symbol",
    value: function symbol() {
      return this.symbol;
    }
  }, {
    key: "side",
    value: function side() {
      return this.side;
    }
  }, {
    key: "quantity",
    value: function quantity() {
      return this.quantity;
    }
  }, {
    key: "initialPrice",
    value: function initialPrice() {
      return this.initialPrice;
    }
  }, {
    key: "unrealizedPL",
    value: function unrealizedPL() {
      return this.unrealizedPL;
    }
  }]);

  return OpenPosition;
}();

exports.OpenPosition = OpenPosition;

var ExecutionReport =
/*#__PURE__*/
function () {
  //
  // returned in response to place, modify, cancel, getOrderStatus requests
  //
  function ExecutionReport(orderId, clientOrderID, exchangeOrderId, accountInfo, symbol, side, orderType, quantity, price, timeInForce, leverageType, leverage, orderStatus, filledQuantity, avgFillPrice, executionReportType, rejectionReason, clientOrderLinkID) {
    _classCallCheck(this, ExecutionReport);

    /**
    * @param orderId: String orderID as assigned by TES
    * @param clientOrderID: int orderID generated on the client side
    * @param exchangeOrderId: String orderID as assigned by Exchange
    * @param accountInfo: accountInfo
    * @param symbol: String
    * @param side: String (see Side enum)
    * @param orderType: String (see OrderType enum)
    * @param quantity: float
    * @param price: float
    * @param timeInForce: String (see TimeInForce enum)
    * @param leverageType: String (see LeverageType enum)
    * @param leverage: float leverage being used on this specific order
    * @param orderStatus: String (see OrderStatus enum)
    * @param filledQuantity: float amount of quantity which has been filled
    * @param avgFillPrice: float average price at which the order has been
    *    filled thus far
    * @param executionReportType: String (see ExecutionReportType enum)
    * @param rejectionReason: String rejectionReason
    * @param clientOrderLinkID: String internal id used for
    */
    this.orderId = String(orderId);
    this.clientOrderID = clientOrderID;
    this.exchangeOrderId = String(exchangeOrderId);
    this.accountInfo = accountInfo;
    this.symbol = String(symbol);
    this.side = side;
    this.orderType = orderType;
    this.quantity = quantity;
    this.price = price;
    this.timeInForce = timeInForce;
    this.leverageType = leverageType;
    this.leverage = leverage;
    this.orderStatus = String(orderStatus);
    this.filledQuantity = filledQuantity;
    this.avgFillPrice = avgFillPrice;
    this.executionReportType = String(executionReportType);
    this.rejectionReason = String(rejectionReason);
    this.clientOrderLinkID = String(clientOrderLinkID);
  }

  _createClass(ExecutionReport, [{
    key: "orderId",
    value: function orderId() {
      return this.orderId;
    }
  }, {
    key: "clientOrderID",
    value: function clientOrderID() {
      return this.clientOrderID;
    }
  }, {
    key: "exchangeOrderId",
    value: function exchangeOrderId() {
      return this.exchangeOrderId;
    }
  }, {
    key: "accountInfo",
    value: function accountInfo() {
      return this.accountInfo;
    }
  }, {
    key: "symbol",
    value: function symbol() {
      return this.symbol;
    }
  }, {
    key: "side",
    value: function side() {
      return this.side;
    }
  }, {
    key: "orderType",
    value: function orderType() {
      return this.orderType;
    }
  }, {
    key: "quantity",
    value: function quantity() {
      return this.quantity;
    }
  }, {
    key: "price",
    value: function price() {
      return this.price;
    }
  }, {
    key: "timeInForce",
    value: function timeInForce() {
      return this.timeInForce;
    }
  }, {
    key: "leverageType",
    value: function leverageType() {
      return this.leverageType;
    }
  }, {
    key: "leverage",
    value: function leverage() {
      return this.leverage;
    }
  }, {
    key: "orderStatus",
    value: function orderStatus() {
      return this.orderStatus;
    }
  }, {
    key: "filledQuantity",
    value: function filledQuantity() {
      return this.filledQuantity;
    }
  }, {
    key: "avgFillPrice",
    value: function avgFillPrice() {
      return this.avgFillPrice;
    }
  }, {
    key: "executionReportType",
    value: function executionReportType() {
      return this.executionReportType;
    }
  }, {
    key: "rejectionReason",
    value: function rejectionReason() {
      return this.rejectionReason;
    }
  }, {
    key: "clientOrderLinkID",
    value: function clientOrderLinkID() {
      return this.clientOrderLinkID;
    }
  }]);

  return ExecutionReport;
}();

exports.ExecutionReport = ExecutionReport;

var AccountDataReport =
/*#__PURE__*/
function () {
  function AccountDataReport(accountInfo, balances, openPositions, orders) {
    _classCallCheck(this, AccountDataReport);

    /**
    * @param accountInfo: accountInfo
    * @param balances: Array of Balances of all currency pairs on the
    *    account given in accountInfo
    * @param openPositions: Array of OpenPosition on the account given in
    *    accountInfo
    * @param orders: Array of ExecutionReport of orders which are currently
    *    active on the account given in accountInfo
    */
    this.accountInfo = accountInfo;
    this.balances = balances;
    this.openPositions = openPositions;
    this.orders = orders;
  }

  _createClass(AccountDataReport, [{
    key: "accountInfo",
    value: function accountInfo() {
      return this.accountInfo;
    }
  }, {
    key: "balances",
    value: function balances() {
      return this.balances;
    }
  }, {
    key: "openPositions",
    value: function openPositions() {
      return this.openPositions;
    }
  }, {
    key: "orders",
    value: function orders() {
      return this.orders;
    }
  }]);

  return AccountDataReport;
}();

exports.AccountDataReport = AccountDataReport;

var AccountBalancesReport =
/*#__PURE__*/
function () {
  function AccountBalancesReport(accountInfo, balances) {
    _classCallCheck(this, AccountBalancesReport);

    /**
    * @param accountInfo: AccountInfo
    * @param balances: Array of Balances of all currency pairs on the
    *    account given in accountInfo
    */
    this.accountInfo = accountInfo;
    this.balances = balances;
  }

  _createClass(AccountBalancesReport, [{
    key: "accountInfo",
    value: function accountInfo() {
      return this.accountInfo;
    }
  }, {
    key: "balances",
    value: function balances() {
      return this.balances;
    }
  }]);

  return AccountBalancesReport;
}();

exports.AccountBalancesReport = AccountBalancesReport;

var OpenPositionsReport =
/*#__PURE__*/
function () {
  function OpenPositionsReport(accountInfo, openPositions) {
    _classCallCheck(this, OpenPositionsReport);

    /**
    * @param accountInfo: AccountInfo
    * @param openPositions: Array of OpenPosition on the account given in
    *    accountInfo
    */
    this.accountInfo = accountInfo;
    this.openPositions = openPositions;
  }

  _createClass(OpenPositionsReport, [{
    key: "accountInfo",
    value: function accountInfo() {
      return this.accountInfo;
    }
  }, {
    key: "openPositions",
    value: function openPositions() {
      return this.openPositions;
    }
  }]);

  return OpenPositionsReport;
}();

exports.OpenPositionsReport = OpenPositionsReport;

var WorkingOrdersReport =
/*#__PURE__*/
function () {
  function WorkingOrdersReport(accountInfo, orders) {
    _classCallCheck(this, WorkingOrdersReport);

    /**
    * @param accountInfo: AccountInfo
    * @param orders: Array of ExecutionReport of orders which are currently
    *    active on the account given in accountInfo
    */
    this.accountInfo = accountInfo;
    this.orders = orders;
  }

  _createClass(WorkingOrdersReport, [{
    key: "accountInfo",
    value: function accountInfo() {
      return this.accountInfo;
    }
  }, {
    key: "orders",
    value: function orders() {
      return this.orders;
    }
  }]);

  return WorkingOrdersReport;
}();

exports.WorkingOrdersReport = WorkingOrdersReport;

var CompletedOrdersReport =
/*#__PURE__*/
function () {
  function CompletedOrdersReport(accountInfo, orders) {
    _classCallCheck(this, CompletedOrdersReport);

    /**
    * @param accountInfo: AccountInfo
    * @param exchange: String
    * @param orders: Array of ExecutionReport of orders completed within the
    *    last 24 hours on the account given in accountInfo
    */
    this.accountInfo = accountInfo;
    this.orders = orders;
  }

  _createClass(CompletedOrdersReport, [{
    key: "accountInfo",
    value: function accountInfo() {
      return this.accountInfo;
    }
  }, {
    key: "orders",
    value: function orders() {
      return this.orders;
    }
  }]);

  return CompletedOrdersReport;
}();

exports.CompletedOrdersReport = CompletedOrdersReport;

var OrderInfo =
/*#__PURE__*/
function () {
  function OrderInfo(orderId, clientOrderID, clientOrderLinkID, exchangeOrderId, symbol) {
    _classCallCheck(this, OrderInfo);

    /**
     * @param orderId: String required
     * @param clientOrderID: int empty in client request
     * @param clientOrderLinkID: String empty in client request
     * @param exchangeOrderId: String empty in client request
     * @param symbol: String empty in client request
     */
    this.orderId = String(orderId);
    this.clientOrderID = clientOrderID;
    this.clientOrderLinkID = String(clientOrderLinkID);
    this.exchangeOrderId = String(exchangeOrderId);
    this.symbol = symbol;
  }

  _createClass(OrderInfo, [{
    key: "orderId",
    value: function orderId() {
      return this.orderId;
    }
  }, {
    key: "clientOrderID",
    value: function clientOrderID() {
      return this.clientOrderID;
    }
  }, {
    key: "clientOrderLinkID",
    value: function clientOrderLinkID() {
      return this.clientOrderLinkID;
    }
  }, {
    key: "exchangeOrderId",
    value: function exchangeOrderId() {
      return this.exchangeOrderId;
    }
  }, {
    key: "symbol",
    value: function symbol() {
      return this.symbol;
    }
  }]);

  return OrderInfo;
}();

exports.OrderInfo = OrderInfo;

var SymbolProperties =
/*#__PURE__*/
function () {
  function SymbolProperties(symbol, pricePrecision, quantityPrecision, minQuantity, maxQuantity, marginSupported, leverage) {
    _classCallCheck(this, SymbolProperties);

    /**
    * @param symbol: String
    * @param pricePrecision: float
    * @param quantityPrecision: float
    * @param minQuantity: float
    * @param maxQuantity: float
    * @param marginSupported: bool
    * @param leverage: set of float leverages supported for symbol
    */
    this.symbol = String(symbol);
    this.pricePrecision = pricePrecision;
    this.quantityPrecision = quantityPrecision;
    this.minQuantity = minQuantity;
    this.maxQuantity = maxQuantity;
    this.marginSupported = marginSupported;
    this.leverage = leverage;
  }

  _createClass(SymbolProperties, [{
    key: "symbol",
    value: function symbol() {
      return this.symbol;
    }
  }, {
    key: "pricePrecision",
    value: function pricePrecision() {
      return this.pricePrecision;
    }
  }, {
    key: "quantityPrecision",
    value: function quantityPrecision() {
      return this.quantityPrecision;
    }
  }, {
    key: "minQuantity",
    value: function minQuantity() {
      return this.minQuantity;
    }
  }, {
    key: "maxQuantity",
    value: function maxQuantity() {
      return this.maxQuantity;
    }
  }, {
    key: "marginSupported",
    value: function marginSupported() {
      return this.marginSupported;
    }
  }, {
    key: "leverage",
    value: function leverage() {
      return this.leverage;
    }
  }]);

  return SymbolProperties;
}();

exports.SymbolProperties = SymbolProperties;

var ExchangePropertiesReport =
/*#__PURE__*/
function () {
  function ExchangePropertiesReport(exchange, currencies, symbolProperties, timeInForces, orderTypes) {
    _classCallCheck(this, ExchangePropertiesReport);

    /**
    * @param exchange: String
    * @param currencies: array (set) of String active currencies on exchange
    * @param symbolProperties: dict of {symbol: SymbolProperties}
    * @param timeInForces: array (set) of supported TimeInForce across all currencies
    * @param orderTypes: array (set) of supported OrderType across all currencies
    */
    this.exchange = String(exchange);
    this.currencies = currencies;
    this.symbolProperties = symbolProperties;
    this.timeInForces = timeInForces;
    this.orderTypes = orderTypes;
  }

  _createClass(ExchangePropertiesReport, [{
    key: "exchange",
    value: function exchange() {
      return this.exchange;
    }
  }, {
    key: "currencies",
    value: function currencies() {
      return this.currencies;
    }
  }, {
    key: "symbolProperties",
    value: function symbolProperties() {
      return this.symbolProperties;
    }
  }, {
    key: "timeInForces",
    value: function timeInForces() {
      return this.timeInForces;
    }
  }, {
    key: "orderTypes",
    value: function orderTypes() {
      return this.orderTypes;
    }
  }]);

  return ExchangePropertiesReport;
}();

exports.ExchangePropertiesReport = ExchangePropertiesReport;