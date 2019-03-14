"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountInfo = _interopRequireDefault(require("../../../lib/tesClient/account/AccountInfo"));

var _constants = require("../../../lib/tesClient/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  this.accountInfo = new _AccountInfo.default({
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

var _default = ReplaceOrderParams;
exports.default = _default;