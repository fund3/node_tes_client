//index.js
require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import Client from './tes_client/Client'

const client = 
    new Client({
        account_id: parseInt(process.env.ACCOUNT_ID),
        client_id: parseInt(process.env.CLIENT_ID),
        sender_comp_id: String(uuidv4()),
        api_key: process.env.API_KEY,
        secret_key: process.env.SECRET_KEY,
        passphrase: process.env.PASSPHRASE,
        curve_server_key: process.env.CURVE_SERVER_KEY,
        tes_socket_endpoint: process.env.TCP_ADDRESS,
        backend_socket_endpoint: process.env.INPROC_ADDRESS
    });

client.sendLogonMessage();
setTimeout(() => client.sendGetAccountBalancesMessage(), 10000);
setTimeout(() => client.sendLogoffMessage(), 20000);
