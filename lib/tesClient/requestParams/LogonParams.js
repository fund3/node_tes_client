"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var _default = LogonParams;
exports.default = _default;