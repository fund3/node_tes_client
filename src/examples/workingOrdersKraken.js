//index.js

require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import AccountCredentials from '~/tesClient/account/AccountCredentials'
import AccountInfo from '~/tesClient/account/AccountInfo'
import Client from '~/tesClient/Client'
import LogonParams from '~/tesClient/requestParams/LogonParams'
import GetWorkingOrdersParams from "../tesClient/requestParams/GetWorkingOrdersParams";

const krakenAccountCredentials = new AccountCredentials({
	accountId: process.env.KRAKEN_ACCOUNT_ID,
	apiKey: process.env.KRAKEN_API_KEY,
	secretKey: process.env.KRAKEN_SECRET_KEY,
	passphrase: process.env.KRAKEN_PASSPHRASE
});
const accountCredentialsList = [
    krakenAccountCredentials
];

const client =
    new Client({
        clientId: parseInt(process.env.KRAKEN_CLIENT_ID),
        senderCompId: String(uuidv4()),
        accountCredentialsList,
        curveServerKey: process.env.CURVE_SERVER_KEY,
        tesSocketEndpoint: process.env.TCP_ADDRESS
    });


function logon() {
    client.sendLogonMessage({
        logonParams: new LogonParams({
            clientSecret: process.env.KRAKEN_CLIENT_SECRET,
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
        getWorkingOrdersParams: new GetWorkingOrdersParams({
            accountId: process.env.KRAKEN_ACCOUNT_ID
        }),
        requestIdCallback: (response) => {
            console.log(response)
        }
}), 7000);

setTimeout(() => logoff(), 13000);
