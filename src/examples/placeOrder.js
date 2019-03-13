//index.js
require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import Client from '~/tesClient/Client'
import AccountInfo from '~/tesClient/account/AccountInfo'
import AccountCredentials from '~/tesClient/account/AccountCredentials'


const CLIENT_ID = 123;
const SENDER_COMP_ID = String(uuidv4());
const CURVE_SERVER_KEY = process.env.CURVE_SERVER_KEY;
const TES_ENDPOINT = process.env.TCP_ADDRESS;
const INPROC_ENDPOINT = process.env.INPROC_ENDPOINT;

const ACCOUNT_ID = 321;
const API_KEY = process.env.GEMINI_API_KEY;
const SECRET_KEY = process.env.GEMINI_SECRET_KEY;
const PASSPHRASE = process.env.GEMINI_PASSPHRASE; // Optional, only required on some exchanges

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

setTimeout(() => client.sendPlaceSingleOrderMessage({
    onResponse: ({ order_id }) => (console.log(order_id)),
    accountId: ACCOUNT_INFO,
    clientOrderId: 1111,
    symbol: "ETH/USD",
    side: "buy",
    quantity: 5.0,
    price: 10.0,
    orderType: 'limit'
}), 3000);

setInterval(client.sendLogoffMessage({ onResponse: response => console.log(response) }), 7000);
