//index.js
import AccountCredentials from '~/tesClient/account/AccountCredentials';
import Client from '~/tesClient/Client';
import LogonParams from '~/tesClient/requestParams/LogonParams';
import PlaceOrderParams from '~/tesClient/requestParams/PlaceOrderParams';
import GetOrderStatusParams from '~/tesClient/requestParams/GetOrderStatusParams';
import CancelOrderParams from '~/tesClient/requestParams/CancelOrderParams';
import BatchOrdersParams from '~/tesClient/requestParams/BatchOrdersParams';
import PlaceContingentOrderParams from '~/tesClient/requestParams/PlaceContingentOrderParams'
import { messageBodyTypes } from '~/tesClient/constants';

require("dotenv").config();
import * as uuidv4 from 'uuid/v4'

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
    // geminiAccountCredentials,
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

setTimeout(() => logon(), 3000);
client.subscribeCallbackToResponseType({
    responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
    responseTypeCallback: (executionReport) => console.log(executionReport)
});

const orders = [
    new PlaceOrderParams({
        accountId: process.env.COINBASE_PRIME_ACCOUNT_ID,
        clientOrderId: 1111,
        symbol: "BTC/USD",
        side: "buy",
        quantity: 5.0,
        price: 1.0,
        orderType: 'limit'
    }),
    new PlaceOrderParams({
        accountId: process.env.COINBASE_PRIME_ACCOUNT_ID,
        clientOrderId: 2222,
        symbol: "BTC/USD",
        side: "buy",
        quantity: 6.0,
        price: 2.0,
        orderType: 'limit'
})];

const batch = new BatchOrdersParams({orders});

setTimeout(
	() =>
		client.sendPlaceContingentOrderMessage({
            placeContingentOrderParams: new PlaceContingentOrderParams({
                batch
            })
		}),
	8000
);

// setTimeout(() =>
//     client.sendGetOrderStatusMessage({
//         getOrderStatusParams: new GetOrderStatusParams({
//             accountId: geminiAccountInfo.accountID,
//             orderId: geminiOrderId1,
//         }),
//         requestIdCallback: (response) => {
//             console.log(response)
//         }
// }), 13000);
//
// setTimeout(() =>
//     client.sendCancelOrderMessage({
//         cancelOrderParams: new CancelOrderParams({
//             accountId: process.env.GEMINI_ACCOUNT_ID,
//             orderId: '8a49b125-c551-47f0-9ced-b8e0b6644d51'
//         })
//         // requestIdCallback: (response) => {
//         //     console.log(response)
//         // }
// }), 10000);

setTimeout(() => logoff(), 15000);
setTimeout(() => client.close(), 17000);
