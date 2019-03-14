"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountInfo = _interopRequireDefault(require("../../../lib/tesClient/account/AccountInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  this.accountInfo = new _AccountInfo.default({
    accountId: accountId
  });

  if (count !== undefined) {
    this.count = count;
  }

  if (since !== undefined) {
    this.since = since;
  }
};

var _default = GetCompletedOrdersParams;
exports.default = _default;