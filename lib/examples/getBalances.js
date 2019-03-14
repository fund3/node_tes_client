"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

var _Client = _interopRequireDefault(require("../../lib/tesClient/Client"));

var _AccountInfo = _interopRequireDefault(require("../../lib/tesClient/account/AccountInfo"));

var _AccountCredentials = _interopRequireDefault(require("../../lib/tesClient/account/AccountCredentials"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//index.js
require("@babel/polyfill");

require("dotenv").config();

var CLIENT_ID = 123;
var SENDER_COMP_ID = String((0, _v.default)());
var CURVE_SERVER_KEY = process.env.CURVE_SERVER_KEY;
var TES_ENDPOINT = process.env.TCP_ADDRESS;
var INPROC_ENDPOINT = process.env.INPROC_ENDPOINT;
var ACCOUNT_ID = 321;
var API_KEY = process.env.GEMINI_API_KEY;
var SECRET_KEY = process.env.GEMINI_SECRET_KEY;
var PASSPHRASE = process.env.GEMINI_PASSPHRASE; // Optional, only required on some exchanges

var ACCOUNT_INFO = new _AccountInfo.default({
  accountId: ACCOUNT_ID
});
var EXCHANGE_ACCOUNT_CREDENTIALS = new _AccountCredentials.default({
  accountInfo: ACCOUNT_INFO,
  apiKey: API_KEY,
  secretKey: SECRET_KEY
});
var ACCOUNT_CREDENTIALS_LIST = [EXCHANGE_ACCOUNT_CREDENTIALS];
var client = new _Client.default({
  clientId: parseInt(CLIENT_ID),
  senderCompId: SENDER_COMP_ID,
  accountCredentialsList: ACCOUNT_CREDENTIALS_LIST,
  curveServerKey: CURVE_SERVER_KEY,
  tesSocketEndpoint: TES_ENDPOINT,
  backendSocketEndpoint: INPROC_ENDPOINT
});
client.sendLogonMessage({
  onResponse: function onResponse(response) {
    return console.log(response);
  }
});
setTimeout(function () {
  return client.sendGetAccountBalancesMessage({
    accountId: ACCOUNT_ID,
    onResponse: function onResponse(response) {
      return console.log(response);
    }
  });
}, 3000);
setInterval(client.sendLogoffMessage({
  onResponse: function onResponse(response) {
    return console.log(response);
  }
}), 7000);