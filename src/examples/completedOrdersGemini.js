//index.js
require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import AccountCredentials from '~/tesClient/account/AccountCredentials'
import AccountInfo from '~/tesClient/account/AccountInfo'
import Client from '~/tesClient/Client'
import LogonParams from '~/tesClient/requestParams/LogonParams'
import GetCompletedOrdersParams from "../tesClient/requestParams/GetCompletedOrdersParams";

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

setTimeout(() =>
    client.sendGetCompletedOrdersMessage({
        getCompletedOrdersParams: new GetCompletedOrdersParams({
            accountId: process.env.GEMINI_ACCOUNT_ID,
            count: 50,
        }),
        requestIdCallback: response => {
				console.log(response)
        }
}), 7000);

setTimeout(() => logoff(), 13000);
setTimeout(() => client.close(), 15000);