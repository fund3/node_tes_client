//index.js
require("dotenv").config();
import * as uuidv4 from 'uuid/v4'

import AccountCredentials from '~/tesClient/account/AccountCredentials'
import Client from '~/tesClient/Client'
import LogonParams from '~/tesClient/requestParams/LogonParams'
import GetCompletedOrdersParams from "../tesClient/requestParams/GetCompletedOrdersParams";

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
    client.sendGetCompletedOrdersMessage({
        getCompletedOrdersParams: new GetCompletedOrdersParams({
            accountId: process.env.KRAKEN_ACCOUNT_ID,
            count: 50,
        }),
        requestIdCallback: response => {
				console.log(response)
        }
}), 7000);

setTimeout(() => logoff(), 13000);
setTimeout(() => client.close(), 15000);