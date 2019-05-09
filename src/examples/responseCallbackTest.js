//index.js
require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import AccountCredentials from '~/tesClient/account/AccountCredentials'
import AccountInfo from '~/tesClient/account/AccountInfo'
import Client from '~/tesClient/Client'
import GetAccountBalancesParams from '~/tesClient/requestParams/GetAccountBalancesParams'
import LogonParams from '~/tesClient/requestParams/LogonParams'

const geminiAccountInfo = new AccountInfo(
    { accountId: process.env.GEMINI_ACCOUNT_ID });
const geminiAccountCredentials =
    new AccountCredentials({
        accountInfo: geminiAccountInfo,
        apiKey: process.env.GEMINI_API_KEY,
        secretKey: process.env.GEMINI_SECRET_KEY,
        passphrase: process.env.GEMINI_PASSPHRASE
    });

const coinbasePrimeAccountInfo = new AccountInfo(
    { accountId: process.env.COINBASE_PRIME_ACCOUNT_ID });
const coinbasePrimeAccountCredentials =
    new AccountCredentials({
        accountInfo: coinbasePrimeAccountInfo,
        apiKey: process.env.COINBASE_PRIME_API_KEY,
        secretKey: process.env.COINBASE_PRIME_SECRET_KEY,
        passphrase: process.env.COINBASE_PRIME_PASSPHRASE
    });

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
        requestIdCallback: response => console.log(response),
        responseTypeCallback: setAccessToken
    })
}

function logoff() {
    // incrementRequestId();
    client.sendLogoffMessage(
        { requestIdCallback: response => console.log(response),
        responseTypeCallback: response => console.log(response) })
}

function getBalances({getAccountBalancesParams}) {
    // incrementRequestId();
    client.sendGetAccountBalancesMessage({
        getAccountBalancesParams,
        requestIdCallback: response => console.log(response),
        responseTypeCallback: response => console.log(response)
    })
}

setTimeout(() => logon(), 3000);

setTimeout(
    () => getBalances({getAccountBalancesParams: new GetAccountBalancesParams({
            accountId: process.env.COINBASE_PRIME_ACCOUNT_ID})}), 4000);

setTimeout(
    () => getBalances({getAccountBalancesParams: new GetAccountBalancesParams({
            accountId: process.env.GEMINI_ACCOUNT_ID})}), 6000);

let geminiOrderId1 = 1111;
let coinbasePrimeOrderId1 = 2222;

// setTimeout(
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

setTimeout(() => logoff(), 10000);
setTimeout(() => client.close(), 12000);