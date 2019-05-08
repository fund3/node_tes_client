//index.js
import AuthorizationRefreshParams from "../tesClient/requestParams/AuthorizationRefreshParams";

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

const coinbasePrimeAccountCredentials = new AccountCredentials({
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

function heartbeat() {
    client.sendHeartbeatMessage({
        requestIdCallback: response => console.log(response) });
}

function cleanup(interval) {
    client.close();
    clearInterval(interval);
}

function refreshAuthorization() {
    client.sendAuthorizationRefreshMessage({
        authorizationRefreshParams: new AuthorizationRefreshParams({
            refreshToken: client.refreshToken
        }),
        requestIdCallback: (authorizationGrant) =>
            console.log(authorizationGrant)
    })
}

const waitForClientToBeReady = async (readyCallback) => {
    await client.ready().catch((err) => console.log(err));
    console.log('Client is ready!');
};

// waitForClientToBeReady();

setTimeout(() => logon(), 3000);

const interval = setInterval(() => heartbeat(), 3200);

setInterval(() => refreshAuthorization(), 4000);

setTimeout(() => logoff(), 20000);
setTimeout(() => cleanup(interval), 22000);
