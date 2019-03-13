//index.js
require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import Client from '~/tesClient/Client'
import AccountInfo from '~/tesClient/account/AccountInfo'
import AccountCredentials from '~/tesClient/account/AccountCredentials'


const CLIENT_ID = 123;
const SENDER_COMP_ID = String(uuidv4());
const CURVE_SERVER_KEY = 'curve_server_key';
const TES_ENDPOINT = 'tcp://0.0.0.0:9999';
const INPROC_ENDPOINT = 'inproc://endpoint';

const ACCOUNT_ID = 321;
const API_KEY = 'api_key';
const SECRET_KEY = 'secret_key';
const PASSPHRASE = 'passphrase'; // Optional, only required on some exchanges

const ACCOUNT_INFO = new AccountInfo({ accountId: ACCOUNT_ID });
const EXCHANGE_ACCOUNT_CREDENTIALS =
    new AccountCredentials({
        accountInfo: ACCOUNT_INFO,
        apiKey: API_KEY,
        secretKey: SECRET_KEY
    });

const ACCOUNT_CREDENTIALS_LIST = [
    EXCHANGE_ACCOUNT_CREDENTIALS
];

const client =
    new Client({
        clientId: parseInt(CLIENT_ID),
        senderCompId: SENDER_COMP_ID,
        accountCredentialsList: ACCOUNT_CREDENTIALS_LIST,
        curveServerKey: CURVE_SERVER_KEY,
        tesSocketEndpoint: TES_ENDPOINT,
        backendSocketEndpoint: INPROC_ENDPOINT
    });


client.sendLogonMessage({ onResponse: response => console.log(response)});
setInterval(client.sendHeartbeatMessage(
    { onResponse: response => console.log(response)}), 2000);
setInterval(client.sendLogoffMessage(
    { onResponse: response => console.log(response) }), 4000);
