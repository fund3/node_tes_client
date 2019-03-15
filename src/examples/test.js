//index.js
require("dotenv").config();
import CancelOrderParams from "../tesClient/requestParams/CancelOrderParams";

require("@babel/polyfill");
import uuidv4 from 'uuid/v4'

import AccountCredentials from '~/tesClient/account/AccountCredentials'
import AccountInfo from '~/tesClient/account/AccountInfo'
import Client from '~/tesClient/Client'
import GetAccountBalancesParams from '~/tesClient/requestParams/GetAccountBalancesParams'
import LogonParams from '~/tesClient/requestParams/LogonParams'
import PlaceOrderParams from '~/tesClient/requestParams/PlaceOrderParams'
import GetOrderStatusParams from '~/tesClient/requestParams/GetOrderStatusParams'
import GetWorkingOrdersParams from "../tesClient/requestParams/GetWorkingOrdersParams";
import GetExchangePropertiesParams from "../tesClient/requestParams/GetExchangePropertiesParams";
import GetCompletedOrdersParams from "../tesClient/requestParams/GetCompletedOrdersParams";

const geminiAccountInfo = new AccountInfo(
    { accountId: process.env.GEMINI_ACCOUNT_ID });
const geminiAccountCredentials =
    new AccountCredentials({
        accountId: process.env.GEMINI_ACCOUNT_ID,
        apiKey: process.env.GEMINI_API_KEY,
        secretKey: process.env.GEMINI_SECRET_KEY,
        passphrase: process.env.GEMINI_PASSPHRASE 
    });

const coinbasePrimeAccountInfo = new AccountInfo(
    { accountId: process.env.COINBASE_PRIME_ACCOUNT_ID });
const coinbasePrimeAccountCredentials = new AccountCredentials({
	accountId: process.env.COINBASE_PRIME_ACCOUNT_ID,
	apiKey: process.env.COINBASE_PRIME_API_KEY,
	secretKey: process.env.COINBASE_PRIME_SECRET_KEY,
	passphrase: process.env.COINBASE_PRIME_PASSPHRASE
});

// console.log(geminiAccountInfo.accountID, coinbasePrimeAccountInfo.accountID);

const accountCredentialsList = [
    geminiAccountCredentials,
    coinbasePrimeAccountCredentials
];

const client = 
    new Client({
        clientId: parseInt(process.env.CLIENT_ID),
        senderCompId: String(uuidv4()),
        accountCredentialsList,
        curveServerKey: process.env.CURVE_SERVER_KEY,
        tesSocketEndpoint: process.env.TCP_ADDRESS
    });

function setAccessToken( logonAck ) {
    if (logonAck.success){
        const newAccessToken = logonAck.authorizationGrant.accessToken;
        client.updateAccessToken({newAccessToken});
    }
}

function incrementRequestId() {
    client.defaultRequestHeader.requestID += 1;
}

function logon() {
    // incrementRequestId();
    client.sendLogonMessage({
        logonParams: new LogonParams({
            clientSecret: process.env.CLIENT_SECRET,
            credentials: client.accountCredentialsList
        }),
        requestIdCallback: logonAck => console.log(logonAck)
    })
}

function logoff() {
    // incrementRequestId();
    client.sendLogoffMessage(
        { requestIdCallback: response => console.log(response) })
}

function getBalances({getAccountBalancesParams}) {
    // incrementRequestId();
    client.sendGetAccountBalancesMessage({
        getAccountBalancesParams,
        requestIdCallback: response => console.log(response)
    })
}

setTimeout(() => logon(), 3000);

setTimeout(() => client.sendHeartbeatMessage({
    requestIdCallback: response => console.log(response) }), 7000);

// setTimeout(
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

let geminiOrderId1 = 1111;
let coinbasePrimeOrderId1 = 2222;

setTimeout(
	() =>
		client.sendPlaceSingleOrderMessage({
            placeOrderParams: new PlaceOrderParams({
                accountId: geminiAccountInfo.accountID,
                clientOrderId: 1111,
                symbol: "BTC/USD",
                side: "buy",
                quantity: 5.0,
                price: 1.0,
                orderType: 'limit'
            }),
            requestIdCallback: (response) => {
                console.log(response);
                geminiOrderId1 = response.orderID;
            },
		}),
	8000
);

setTimeout(() =>
    client.sendGetOrderStatusMessage({
        getOrderStatusParams: new GetOrderStatusParams({
            accountId: geminiAccountInfo.accountID,
            orderId: geminiOrderId1,
        }),
        requestIdCallback: (response) => {
            console.log(response)
        }
}), 13000);

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


setTimeout(() =>
    client.sendCancelOrderMessage({
        cancelOrderParams: new CancelOrderParams({
            accountId: geminiAccountInfo.accountID,
            orderId: geminiOrderId1
        }),
        requestIdCallback: (response) => {
            console.log(response)
        }
}), 20000);

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

setTimeout(() => logoff(), 24000);
