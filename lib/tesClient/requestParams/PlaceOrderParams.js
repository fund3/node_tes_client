"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountInfo = _interopRequireDefault(require("../../../lib/tesClient/account/AccountInfo"));

var _constants = require("../../../lib/tesClient/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  this.accountInfo = new _AccountInfo.default({
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

var _default = PlaceSingleOrderParams;
exports.default = _default;