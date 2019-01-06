//index.js
require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import Client from './tes_client/Client'
import AccountInfo from './tes_client/account/AccountInfo'
import PlaceOrderArguments from './tes_client/order/PlaceOrderArguments'

const account_id = parseInt(process.env.ACCOUNT_ID);
const client = 
    new Client({
        account_id: account_id,
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
const accountInfo = new AccountInfo({account_id});
setTimeout(() => client.sendPlaceOrderMessage({placeOrderArguments: new PlaceOrderArguments({accountInfo: accountInfo,
    clientOrderId: 'client_order_id', symbol: 'BTC/USD', side: 'buy',
    quantity: 5.0, price: 10.0})}), 5000);
setTimeout(() => client.sendGetOrderStatusMessage({accountInfo: accountInfo,
    orderId: 'cb146384-c577-4d72-b29e-01b74549939f'}), 5000);
