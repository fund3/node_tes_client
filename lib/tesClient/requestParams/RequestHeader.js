"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestHeader = function RequestHeader(_ref) {
  var clientId = _ref.clientId,
      senderCompId = _ref.senderCompId,
      _ref$accessToken = _ref.accessToken,
      accessToken = _ref$accessToken === void 0 ? undefined : _ref$accessToken,
      _ref$requestId = _ref.requestId,
      requestId = _ref$requestId === void 0 ? 0 : _ref$requestId;

  _classCallCheck(this, RequestHeader);

  /**
   * @param clientId: (int) clientId assigned by Fund3.
   * @param senderCompId: (String) Unique uuid machine Id for TES to route
   *     messages to the correct recipient.
   * @param accessToken: (String) accessToken assigned by TES after
   *     authenticated with clientSecret.
   * @param requestId: (int) Optional id to link request and response.
  */
  this.clientID = clientId;
  this.senderCompID = senderCompId;
  this.accessToken = accessToken;
  this.requestID = requestId;
};

var _default = RequestHeader;
exports.default = _default;