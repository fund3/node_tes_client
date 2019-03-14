"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var _default = AccountInfo;
exports.default = _default;