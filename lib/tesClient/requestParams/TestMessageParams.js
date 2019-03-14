"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestMessageParams = function TestMessageParams(_ref) {
  var string = _ref.string;

  _classCallCheck(this, TestMessageParams);

  /**
   * @param string: (String) Test string to be sent to TES.
  */
  this.string = string;
};

var _default = TestMessageParams;
exports.default = _default;