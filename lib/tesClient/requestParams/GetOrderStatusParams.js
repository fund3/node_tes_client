"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountInfo = _interopRequireDefault(require("../../../lib/tesClient/account/AccountInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  this.accountInfo = new _AccountInfo.default({
    accountId: accountId
  });
  this.orderID = orderId;
};

var _default = GetOrderStatusParams;
exports.default = _default;