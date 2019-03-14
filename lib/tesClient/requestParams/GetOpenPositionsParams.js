"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountInfo = _interopRequireDefault(require("../../../lib/tesClient/account/AccountInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetOpenPositionsParams = function GetOpenPositionsParams(_ref) {
  var accountId = _ref.accountId;

  _classCallCheck(this, GetOpenPositionsParams);

  /**
   * @param accountInfo: (int) accountInfo corresponding to an account
   *     on an exchange. Required.
  */
  this.accountInfo = new _AccountInfo.default({
    accountId: accountId
  });
};

var _default = GetOpenPositionsParams;
exports.default = _default;