"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

var _AccountCredentials = _interopRequireDefault(require("../../lib/tesClient/account/AccountCredentials"));

var _AccountInfo = _interopRequireDefault(require("../../lib/tesClient/account/AccountInfo"));

var _Client = _interopRequireDefault(require("../../lib/tesClient/Client"));

var _GetAccountBalancesParams = _interopRequireDefault(require("../../lib/tesClient/requestParams/GetAccountBalancesParams"));

var _LogonParams = _interopRequireDefault(require("../../lib/tesClient/requestParams/LogonParams"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//index.js
require("@babel/polyfill");

require("dotenv").config();

var geminiAccountInfo = new _AccountInfo.default({
  accountId: process.env.GEMINI_ACCOUNT_ID
});
var geminiAccountCredentials = new _AccountCredentials.default({
  accountInfo: geminiAccountInfo,
  apiKey: process.env.GEMINI_API_KEY,
  secretKey: process.env.GEMINI_SECRET_KEY,
  passphrase: process.env.GEMINI_PASSPHRASE
});
var coinbasePrimeAccountInfo = new _AccountInfo.default({
  accountId: process.env.COINBASE_PRIME_ACCOUNT_ID
});
var coinbasePrimeAccountCredentials = new _AccountCredentials.default({
  accountInfo: coinbasePrimeAccountInfo,
  apiKey: process.env.COINBASE_PRIME_API_KEY,
  secretKey: process.env.COINBASE_PRIME_SECRET_KEY,
  passphrase: process.env.COINBASE_PRIME_PASSPHRASE
});
var accountCredentialsList = [geminiAccountCredentials, coinbasePrimeAccountCredentials];
var client = new _Client.default({
  clientId: parseInt(process.env.CLIENT_ID),
  senderCompId: String((0, _v.default)()),
  accountCredentialsList: accountCredentialsList,
  curveServerKey: process.env.CURVE_SERVER_KEY,
  tesSocketEndpoint: process.env.TCP_ADDRESS
});

function setAccessToken(logonAck) {
  if (logonAck.success) {
    var newAccessToken = logonAck.authorizationGrant.accessToken;
    client.updateAccessToken({
      newAccessToken: newAccessToken
    });
  }
}

function incrementRequestId() {
  client.defaultRequestHeader.requestID += 1;
}

function logon() {
  // incrementRequestId();
  client.sendLogonMessage({
    logonParams: new _LogonParams.default({
      clientSecret: process.env.CLIENT_SECRET,
      credentials: client.accountCredentialsList
    }),
    requestIdCallback: function requestIdCallback(response) {
      return console.log(response);
    },
    responseTypeCallback: setAccessToken
  });
}

function logoff() {
  // incrementRequestId();
  client.sendLogoffMessage({
    requestIdCallback: function requestIdCallback(response) {
      return console.log(response);
    },
    responseTypeCallback: function responseTypeCallback(response) {
      return console.log(response);
    }
  });
}

function getBalances(_ref) {
  var getAccountBalancesParams = _ref.getAccountBalancesParams;
  // incrementRequestId();
  client.sendGetAccountBalancesMessage({
    getAccountBalancesParams: getAccountBalancesParams,
    requestIdCallback: function requestIdCallback(response) {
      return console.log(response);
    },
    responseTypeCallback: function responseTypeCallback(response) {
      return console.log(response);
    }
  });
}

setTimeout(function () {
  return logon();
}, 3000);
setTimeout(function () {
  return getBalances({
    getAccountBalancesParams: new _GetAccountBalancesParams.default({
      accountId: process.env.COINBASE_PRIME_ACCOUNT_ID
    })
  });
}, 4000);
setTimeout(function () {
  return getBalances({
    getAccountBalancesParams: new _GetAccountBalancesParams.default({
      accountId: process.env.GEMINI_ACCOUNT_ID
    })
  });
}, 6000);
var geminiOrderId1 = 1111;
var coinbasePrimeOrderId1 = 2222; // setTimeout(
// 	() =>
// 		client.sendPlaceSingleOrderMessage({
//             onResponse: ({ orderId }) => (geminiOrderId1 = orderId),
// 			accountInfo: geminiAccountInfo,
// 			clientOrderId: 1111,
// 			symbol: "BTC/USD",
// 			side: "buy",
// 			quantity: 5.0,
// 			price: 0.0,
//             orderType: 'limit'
// 		}),
// 	15000
// );
// setTimeout(
// 	() =>
// 		client.sendPlaceSingleOrderMessage({
//             onResponse: ({ orderId }) => (coinbasePrimeOrderId1 = orderId),
// 			accountInfo: coinbasePrimeAccountInfo,
// 			clientOrderId: 2222,
// 			symbol: "ETH/USD",
// 			side: "buy",
// 			quantity: 5.0,
// 			price: 10.0,
//             orderType: 'limit'
// 		}),
// 	3000
// );
// setTimeout(() =>
//     client.sendGetOrderStatusMessage({
//         accountInfo: geminiAccountInfo,
//         orderId: geminiOrderId1,
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 40000);
// setTimeout(() =>
//     client.sendGetOrderStatusMessage({
//         accountInfo: coinbasePrimeAccountInfo,
//         orderId: coinbasePrimeOrderId1,
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 6000);
// setTimeout(
//     () =>
//         client.sendGetAccountBalancesMessage({
//                 accountId: geminiAccountInfo.accountId,
//             onResponse: (response) => {console.log(response)}
//         }), 3000);
// setTimeout(() =>
//     client.sendGetOrderStatusMessage({
//         accountInfo: coinbasePrimeAccountInfo,
//         orderId: coinbasePrimeOrderId1,
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 6000);
// setTimeout(() =>
//     client.sendGetWorkingOrdersMessage({
//         accountId: geminiAccountInfo.accountId,
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 2000);
// setTimeout(() =>
//     client.sendGetWorkingOrdersMessage({
//         accountId: coinbasePrimeAccountInfo.accountId,
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 3000);
// setTimeout(() =>
//     client.sendCancelOrderMessage({
//         accountId: coinbasePrimeAccountInfo.accountId,
//         orderId: "7056844b-af32-4e58-b03c-c48e6d2e65aa",
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 3000);
// setTimeout(() =>
//     client.sendGetWorkingOrdersMessage({
//         accountId: coinbasePrimeAccountInfo.accountId,
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 5000);
// setTimeout(() =>
//     client.sendCancelOrderMessage({
//         accountId: geminiAccountInfo.accountId,
//         orderId: "94792072-0962-4826-b9e0-80a4739dc86d",
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 3000);
// setTimeout(() =>
//     client.sendCancelOrderMessage({
//         accountId: geminiAccountInfo.accountId,
//         orderId: "65480fdd-1edf-4167-a036-43f64aa97bec",
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 3000);
// setTimeout(() =>
//     client.sendGetExchangePropertiesMessage({
//         exchange: 'coinbasePrime',
//         onResponse: response => {
// 				console.log(response)
//         }
// }), 3000);
// setTimeout(() =>
//     client.sendGetCompletedOrdersMessage({
//         accountId: geminiAccountInfo.accountId,
//         count: 50,
//         onResponse: response => {
// 				console.log(response)
//         }
// }), 5000);
// setTimeout(() =>
//     client.sendGetCompletedOrdersMessage({
//         accountId: geminiAccountInfo.accountId,
//         count: 50,
//         onResponse: response => {
// 				console.log(response)
//         }
// }), 10000);

setTimeout(function () {
  return logoff();
}, 10000);