//index.js
require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import Client from '~/tesClient/Client'
import AccountInfo from '~/tesClient/account/AccountInfo'
import AccountCredentials from '~/tesClient/account/AccountCredentials'
import LogonParams from "~/tesClient/requestParams/LogonParams";

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
const geminiAccountCredentials = new AccountCredentials({
	accountId: process.env.GEMINI_ACCOUNT_ID,
	apiKey: process.env.GEMINI_API_KEY,
	secretKey: process.env.GEMINI_SECRET_KEY,
	passphrase: process.env.GEMINI_PASSPHRASE
});

const accountCredentialsList = [geminiAccountCredentials];

const client = new Client({
	clientId: parseInt(process.env.CLIENT_ID),
	senderCompId: String(uuidv4()),
	accountCredentialsList,
	curveServerKey: process.env.CURVE_SERVER_KEY,
	tesSocketEndpoint: process.env.TCP_ADDRESS
});

client.sendLogonMessage({
    logonParams: new LogonParams({
        clientSecret: process.env.CLIENT_SECRET,
        credentials: client.accountCredentialsList
    }),
    requestIdCallback: logonAck => console.log(logonAck)
});

setTimeout(
	() =>
		client.sendGetAccountBalancesMessage({
            accountId: process.env.GEMINI_ACCOUNT_ID,
			requestIdCallback: response => console.log(response)
		}),
	3000
);

setInterval(
    () => client.sendLogoffMessage(
        { requestIdCallback: response => console.log(response) }),
	7000
);
