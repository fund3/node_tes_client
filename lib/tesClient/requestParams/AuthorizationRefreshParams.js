"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthorizationRefreshParams = function AuthorizationRefreshParams(_ref) {
  var refreshToken = _ref.refreshToken;

  _classCallCheck(this, AuthorizationRefreshParams);

  /**
   * @param refreshToken: (String) refreshToken to refresh auth on TES.
  */
  this.refreshToken = refreshToken;
};

var _default = AuthorizationRefreshParams;
exports.default = _default;