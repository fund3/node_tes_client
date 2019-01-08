//index.js
require("@babel/polyfill");
require("dotenv").config();
import uuidv4 from 'uuid/v4'

import Client from './tes_client/Client'
import AccountInfo from '~/tes_client/account/AccountInfo'
import AccountCredentials from '~/tes_client/account/AccountCredentials'

const gemini_account_info = new AccountInfo({ account_id: process.env.GEMINI_ACCOUNT_ID });
const gemini_account_credentials = 
    new AccountCredentials({ 
        account_info: gemini_account_info,
        api_key: process.env.GEMINI_API_KEY,
        secret_key: process.env.GEMINI_SECRET_KEY,
        passphrase: process.env.GEMINI_PASSPHRASE 
    })

const coinbase_prime_account_info = new AccountInfo({ account_id: process.env.COINBASE_PRIME_ACCOUNT_ID })
const coinbase_prime_account_credentials = 
    new AccountCredentials({
        account_info: coinbase_prime_account_info,
        api_key: process.env.COINBASE_PRIME_API_KEY,
        secret_key: process.env.COINBASE_PRIME_SECRET_KEY,
        passphrase: process.env.COINBASE_PRIME_PASSPHRASE 
    })

const account_credentials_list = [
    gemini_account_credentials,
    coinbase_prime_account_credentials
]

const client = 
    new Client({
        client_id: parseInt(process.env.CLIENT_ID),
        sender_comp_id: String(uuidv4()),
        account_credentials_list,
        curve_server_key: process.env.CURVE_SERVER_KEY,
        tes_socket_endpoint: process.env.TCP_ADDRESS,
        backend_socket_endpoint: process.env.INPROC_ADDRESS
    });

client.sendLogonMessage(response => console.log(response));
setTimeout(
    () => 
        client.sendGetAccountBalancesMessage({
            account_id: process.env.COINBASE_PRIME_ACCOUNT_ID,
            onResponse: response => console.log(response)
        }), 10000);
setTimeout(() => client.sendLogoffMessage(response => console.log(response)), 20000);
// const accountInfo = new AccountInfo({account_id});
// setTimeout(() => client.sendPlaceOrderMessage({placeOrderArguments: new PlaceOrderArguments({accountInfo: accountInfo,
//     clientOrderId: 'client_order_id', symbol: 'BTC/USD', side: 'buy',
//     quantity: 5.0, price: 10.0})}), 5000);
// setTimeout(() => client.sendGetOrderStatusMessage({accountInfo: accountInfo,
//     orderId: 'cb146384-c577-4d72-b29e-01b74549939f'}), 5000);
