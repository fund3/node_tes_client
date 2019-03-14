"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountInfo = _interopRequireDefault(require("../../../lib/tesClient/account/AccountInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  * @param accountId: accountId assigned by Fund3
  * @param apiKey: String apiKey for connecting to exchange API
  *    associated with accountID
  * @param secretKey: String secretKey for connecting to exchange API
  *    associated with accountID
  * @param passphrase: String (optional) passphrase for connecting to API
  *    associated with accountID
  */
  this.accountInfo = new _AccountInfo.default({
    accountId: accountId
  });
  this.apiKey = String(apiKey);
  this.secretKey = String(secretKey);
  this.passphrase = String(passphrase);
};

var _default = AccountCredentials;
exports.default = _default;