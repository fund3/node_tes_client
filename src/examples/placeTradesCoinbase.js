//index.js
import PlaceOrderParams from "../tesClient/requestParams/PlaceOrderParams";
import CancelOrderParams from "../tesClient/requestParams/CancelOrderParams";

require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import AccountCredentials from '~/tesClient/account/AccountCredentials'
import Client from '~/tesClient/Client'
import LogonParams from '~/tesClient/requestParams/LogonParams'

const geminiAccountCredentials =
    new AccountCredentials({
        accountId: process.env.GEMINI_ACCOUNT_ID,
        apiKey: process.env.GEMINI_API_KEY,
        secretKey: process.env.GEMINI_SECRET_KEY,
        passphrase: process.env.GEMINI_PASSPHRASE
    });

const coinbasePrimeAccountCredentials =
    new AccountCredentials({
        accountId: process.env.COINBASE_PRIME_ACCOUNT_ID,
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

let orderId = 0;

setTimeout(
	() =>
		client.sendPlaceSingleOrderMessage({
            placeOrderParams: new PlaceOrderParams({
                accountId: process.env.COINBASE_PRIME_ACCOUNT_ID,
                clientOrderId: 1111,
                symbol: "BTC/USD",
                side: "buy",
                quantity: 1.0,
                price: 1.0,
                orderType: 'limit'
            }),
            requestIdCallback: (response) => {
                console.log(response);
                orderId = response.orderID;
            },
		}),
	10000
);

setTimeout(
	() =>
		client.sendPlaceSingleOrderMessage({
            placeOrderParams: new PlaceOrderParams({
                accountId: process.env.COINBASE_PRIME_ACCOUNT_ID,
                clientOrderId: 1112,
                symbol: "BTC/USD",
                side: "buy",
                quantity: 1.0,
                orderType: 'market'
            }),
            requestIdCallback: (response) => {
                console.log(response);
            },
		}),
	8000
);

setTimeout(() =>
    client.sendCancelOrderMessage({
        cancelOrderParams: new CancelOrderParams({
            accountId: process.env.COINBASE_PRIME_ACCOUNT_ID,
            orderId: orderId
        }),
        requestIdCallback: (response) => {
            console.log(response)
        }
}), 15000);

setTimeout(() => logoff(), 30000);
setTimeout(() => client.close(), 32000);