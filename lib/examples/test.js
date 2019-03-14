"use strict";

var _CancelOrderParams = _interopRequireDefault(require("../tesClient/requestParams/CancelOrderParams"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _AccountCredentials = _interopRequireDefault(require("../../lib/tesClient/account/AccountCredentials"));

var _AccountInfo = _interopRequireDefault(require("../../lib/tesClient/account/AccountInfo"));

var _Client = _interopRequireDefault(require("../../lib/tesClient/Client"));

var _GetAccountBalancesParams = _interopRequireDefault(require("../../lib/tesClient/requestParams/GetAccountBalancesParams"));

var _LogonParams = _interopRequireDefault(require("../../lib/tesClient/requestParams/LogonParams"));

var _PlaceOrderParams = _interopRequireDefault(require("../../lib/tesClient/requestParams/PlaceOrderParams"));

var _GetOrderStatusParams = _interopRequireDefault(require("../../lib/tesClient/requestParams/GetOrderStatusParams"));

var _GetWorkingOrdersParams = _interopRequireDefault(require("../tesClient/requestParams/GetWorkingOrdersParams"));

var _GetExchangePropertiesParams = _interopRequireDefault(require("../tesClient/requestParams/GetExchangePropertiesParams"));

var _GetCompletedOrdersParams = _interopRequireDefault(require("../tesClient/requestParams/GetCompletedOrdersParams"));

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
}); // console.log(geminiAccountInfo.accountID, coinbasePrimeAccountInfo.accountID);

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
    requestIdCallback: function requestIdCallback(logonAck) {
      return console.log(logonAck);
    }
  });
}

function logoff() {
  // incrementRequestId();
  client.sendLogoffMessage({
    requestIdCallback: function requestIdCallback(response) {
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
    }
  });
}

setTimeout(function () {
  return logon();
}, 3000); // setTimeout(
//     () => getBalances({getAccountBalancesParams: new GetAccountBalancesParams({
//             accountId: process.env.COINBASE_PRIME_ACCOUNT_ID})}), 4000);
//
// setTimeout(
//     () => getBalances({getAccountBalancesParams: new GetAccountBalancesParams({
//             accountId: process.env.GEMINI_ACCOUNT_ID})}), 6000);
// setTimeout(() =>
//     client.sendGetExchangePropertiesMessage({
//         getExchangePropertiesParams: new GetExchangePropertiesParams({
//             exchange: 'coinbasePrime'
//         }),
//         requestIdCallback: response => {
// 				console.log(response)
//         }
// }), 5000);

var geminiOrderId1 = 1111;
var coinbasePrimeOrderId1 = 2222;
setTimeout(function () {
  return client.sendPlaceSingleOrderMessage({
    placeOrderParams: new _PlaceOrderParams.default({
      accountId: geminiAccountInfo.accountID,
      clientOrderId: 1111,
      symbol: "BTC/USD",
      side: "buy",
      quantity: 5.0,
      price: 1.0,
      orderType: 'limit'
    }),
    requestIdCallback: function requestIdCallback(response) {
      console.log(response);
      geminiOrderId1 = response.orderID;
    }
  });
}, 8000); // setTimeout(
// 	() =>
// 		client.sendPlaceSingleOrderMessage({
//             placeOrderParams: new PlaceOrderParams({
//                 accountId: coinbasePrimeAccountInfo.accountID,
//                 clientOrderId: 2222,
//                 symbol: "BTC/USD",
//                 side: "buy",
//                 quantity: 1.17,
//                 orderType: 'market'
//             }),
//             requestIdCallback: ({ orderId }) => (
//                 coinbasePrimeOrderId1 = orderId),
// 		}),
// 	8000
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

setTimeout(function () {
  return client.sendGetOrderStatusMessage({
    getOrderStatusParams: new _GetOrderStatusParams.default({
      accountId: geminiAccountInfo.accountID,
      orderId: geminiOrderId1
    }),
    requestIdCallback: function requestIdCallback(response) {
      console.log(response);
    }
  });
}, 13000); // setTimeout(() =>
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
//         getWorkingOrderParams: new GetWorkingOrdersParams({
//             accountId: geminiAccountInfo.accountID
//         }),
//         requestIdCallback: (response) => {
//             console.log(response)
//         }
// }), 15000);
// setTimeout(() =>
//     client.sendGetWorkingOrdersMessage({
//         accountId: coinbasePrimeAccountInfo.accountId,
//         onResponse: (response) => {
//             console.log(response)
//         }
// }), 3000);

setTimeout(function () {
  return client.sendCancelOrderMessage({
    cancelOrderParams: new _CancelOrderParams.default({
      accountId: geminiAccountInfo.accountID,
      orderId: geminiOrderId1
    }),
    requestIdCallback: function requestIdCallback(response) {
      console.log(response);
    }
  });
}, 20000); // setTimeout(() =>
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
//     client.sendGetCompletedOrdersMessage({
//         getCompletedOrdersParams: new GetCompletedOrdersParams({
//             accountId: coinbasePrimeAccountInfo.accountID,
//             count: 1,
//         }),
//         requestIdCallback: response => {
// 				console.log(response)
//         }
// }), 20000);
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
}, 24000);