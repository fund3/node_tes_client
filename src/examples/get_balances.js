//index.js
require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import Client from './tes_client/Client'
import AccountInfo from '~/tes_client/account/AccountInfo'
import AccountCredentials from '~/tes_client/account/AccountCredentials'


const CLIENT_ID = 123;
const SENDER_COMP_ID = String(uuidv4());
const CURVE_SERVER_KEY = 'curve_server_key';
const TES_ENDPOINT = 'tcp://0.0.0.0:9999';
const INPROC_ENDPOINT = 'inproc://endpoint';

const ACCOUNT_ID = 321;
const API_KEY = 'api_key';
const SECRET_KEY = 'secret_key';
const PASSPHRASE = 'passphrase'; // Optional, only required on some exchanges

const ACCOUNT_INFO = new AccountInfo({ account_id: ACCOUNT_ID });
const EXCHANGE_ACCOUNT_CREDENTIALS =
    new AccountCredentials({
        account_info: ACCOUNT_INFO,
        api_key: API_KEY,
        secret_key: SECRET_KEY,
        passphrase: PASSPHRASE
    });

const ACCOUNT_CREDENTIALS_LIST = [
    EXCHANGE_ACCOUNT_CREDENTIALS
];

const client =
    new Client({
        client_id: parseInt(CLIENT_ID),
        sender_comp_id: SENDER_COMP_ID,
        ACCOUNT_CREDENTIALS_LIST,
        curve_server_key: CURVE_SERVER_KEY,
        tes_socket_endpoint: TES_ENDPOINT,
        backend_socket_endpoint: INPROC_ENDPOINT
    });


client.sendLogonMessage({ onResponse: response => console.log(response)});

setTimeout(() => client.sendGetAccountBalancesMessage({
    account_id: ACCOUNT_ID,
    onResponse: response => console.log(response)
}), 3000);

setInterval(client.sendLogoffMessage({ onResponse: response => console.log(response) }), 7000);
