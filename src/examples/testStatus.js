//index.js
import CancelOrderParams from "../tesClient/requestParams/CancelOrderParams";

require("@babel/polyfill");
require("dotenv").config();
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
        accountId: geminiAccountInfo.accountID,
        apiKey: process.env.GEMINI_API_KEY,
        secretKey: process.env.GEMINI_SECRET_KEY,
        passphrase: process.env.GEMINI_PASSPHRASE
    });

const coinbasePrimeAccountInfo = new AccountInfo(
    { accountId: process.env.COINBASE_PRIME_ACCOUNT_ID });
const coinbasePrimeAccountCredentials =
    new AccountCredentials({
        accountId: coinbasePrimeAccountInfo.accountID,
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


setTimeout(() =>
    client.sendGetWorkingOrdersMessage({
        getWorkingOrderParams: new GetWorkingOrdersParams({
            accountId: geminiAccountInfo.accountID
        }),
        requestIdCallback: (response) => {
            console.log(response)
        }
    }), 5000);

setTimeout(() =>
    client.sendGetCompletedOrdersMessage({
        getCompletedOrdersParams: new GetCompletedOrdersParams({
            accountId: geminiAccountInfo.accountID,
            count: 1,
        }),
        requestIdCallback: response => {
            console.log(response)
        }
    }), 7000);

setTimeout(() => logoff(), 10000);