//index.js
import AccountCredentials from '~/tesClient/account/AccountCredentials'
import AccountInfo from '~/tesClient/account/AccountInfo'
import Client from '~/tesClient/Client'
import LogonParams from '~/tesClient/requestParams/LogonParams'
import PlaceOrderParams from '~/tesClient/requestParams/PlaceOrderParams'
import GetOrderStatusParams from '~/tesClient/requestParams/GetOrderStatusParams'
import CancelOrderParams from '~/tesClient/requestParams/CancelOrderParams'

require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

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

const krakenAccountInfo = new AccountInfo(
    { accountId: process.env.KRAKEN_ACCOUNT_ID });
const krakenAccountCredentials = new AccountCredentials({
	accountId: process.env.KRAKEN_ACCOUNT_ID,
	apiKey: process.env.KRAKEN_API_KEY,
	secretKey: process.env.KRAKEN_SECRET_KEY,
	passphrase: process.env.KRAKEN_PASSPHRASE
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

const krakenCredentialsList = [krakenAccountCredentials];

const krakenClient =
    new Client({
        clientId: parseInt(process.env.KRAKEN_CLIENT_ID),
        senderCompId: String(uuidv4()),
        accountCredentialsList: krakenCredentialsList,
        curveServerKey: process.env.CURVE_SERVER_KEY,
        tesSocketEndpoint: process.env.TCP_ADDRESS
    });


function logon() {
    client.sendLogonMessage({
        logonParams: new LogonParams({
            clientSecret: process.env.CLIENT_SECRET,
            credentials: client.accountCredentialsList
        }),
        requestIdCallback: logonAck => console.log(logonAck)
    })
}

function logoff() {
    client.sendLogoffMessage(
        { requestIdCallback: response => console.log(response) })
}

setTimeout(() => logon(), 3000);

setTimeout(() => krakenClient.sendLogonMessage({
    logonParams: new LogonParams({
        clientSecret: process.env.KRAKEN_CLIENT_SECRET,
        credentials: krakenClient.accountCredentialsList
    }),
    requestIdCallback: logonAck => console.log(logonAck)
}), 3000);

// setTimeout(
// 	() =>
// 		client.sendPlaceSingleOrderMessage({
//             placeOrderParams: new PlaceOrderParams({
//                 accountId: coinbasePrimeAccountInfo.accountID,
//                 clientOrderId: 1111,
//                 symbol: "BTC/USD",
//                 side: "buy",
//                 quantity: 1.0,
//                 price: 1.0,
//                 orderType: 'limit'
//             }),
//             requestIdCallback: (response) => {
//                 console.log(response);
//             },
// 		}),
// 	8000
// );
//
// setTimeout(
// 	() =>
// 		client.sendPlaceSingleOrderMessage({
//             placeOrderParams: new PlaceOrderParams({
//                 accountId: coinbasePrimeAccountInfo.accountID,
//                 clientOrderId: 1112,
//                 symbol: "BTC/USD",
//                 side: "buy",
//                 quantity: 1.0,
//                 orderType: 'market'
//             }),
//             requestIdCallback: (response) => {
//                 console.log(response);
//             },
// 		}),
// 	8000
// );
//
// setTimeout(
// 	() =>
// 		client.sendPlaceSingleOrderMessage({
//             placeOrderParams: new PlaceOrderParams({
//                 accountId: geminiAccountInfo.accountID,
//                 clientOrderId: 1113,
//                 symbol: "BTC/USD",
//                 side: "buy",
//                 quantity: 5.0,
//                 price: 1.0,
//                 orderType: 'limit'
//             }),
//             requestIdCallback: (response) => {
//                 console.log(response);
//             },
// 		}),
// 	8000
// );

// setTimeout(
// 	() =>
// 		krakenClient.sendPlaceSingleOrderMessage({
//             placeOrderParams: new PlaceOrderParams({
//                 accountId: krakenAccountInfo.accountID,
//                 clientOrderId: 1114,
//                 symbol: "BTC/USD",
//                 side: "buy",
//                 quantity: 0.01,
//                 price: 1.0,
//                 orderType: 'limit'
//             }),
//             requestIdCallback: (response) => {
//                 console.log(response);
//             },
// 		}),
// 	8000
// );
//
// setTimeout(
// 	() =>
// 		krakenClient.sendPlaceSingleOrderMessage({
//             placeOrderParams: new PlaceOrderParams({
//                 accountId: krakenAccountInfo.accountID,
//                 clientOrderId: 1115,
//                 symbol: "BTC/USD",
//                 side: "buy",
//                 quantity: 0.01,
//                 orderType: 'market'
//             }),
//             requestIdCallback: (response) => {
//                 console.log(response);
//             },
// 		}),
// 	8000
// );

setTimeout(
	() =>
		krakenClient.sendPlaceSingleOrderMessage({
            placeOrderParams: new PlaceOrderParams({
                accountId: krakenAccountInfo.accountID,
                clientOrderId: 1116,
                symbol: "BTC/USD",
                side: "buy",
                quantity: 0.01,
                stopPrice: 1.0,
                orderType: 'stopLoss'
            }),
            requestIdCallback: (response) => {
                console.log(response);
            },
		}),
	8000
);

setTimeout(
	() =>
		krakenClient.sendPlaceSingleOrderMessage({
            placeOrderParams: new PlaceOrderParams({
                accountId: krakenAccountInfo.accountID,
                clientOrderId: 1117,
                symbol: "BTC/USD",
                side: "buy",
                quantity: 0.01,
                stopPrice: 1.0,
                orderType: 'takeProfit'
            }),
            requestIdCallback: (response) => {
                console.log(response);
            },
		}),
	8000
);

setTimeout(() => logoff(), 30000);
setTimeout(() => krakenClient.sendLogoffMessage(
        { requestIdCallback: response => console.log(response) }), 30000);
