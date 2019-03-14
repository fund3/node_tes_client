"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetExchangePropertiesParams = function GetExchangePropertiesParams(_ref) {
  var exchange = _ref.exchange;

  _classCallCheck(this, GetExchangePropertiesParams);

  /**
   * @param exchange: (String) name of exchange. Required.
  */
  this.exchange = exchange;
};

var _default = GetExchangePropertiesParams;
exports.default = _default;