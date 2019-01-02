//index.js
require("@babel/polyfill");
require("dotenv").config();

import * as zmq from "zeromq";
import capnp from 'capnp'
import uuidv4 from 'uuid/v4'
import msgs_capnp from "~/CommunicationProtocol/TradeMessage.capnp";
import {AccountCredentials, AccountInfo} from "./tes_client/common_types";
import {buildLogonCapnp, buildHeartbeatCapnp, buildLogonAckJs,
    buildLogoffAckJs, buildGetAccountBalancesCapnp} from "./tes_client/tes_message_factory";
    
import {cleanupSocket, createAndBindTesSockets,
        createAndConnectMessageHandlerSocket, messageHandlerCallbackObjectFactory}
        from "./tes_client/tes_connection";


let tesResponseCallbackObject = messageHandlerCallbackObjectFactory({
    heartbeatHandler: () => console.log('received heartbeat'),
    logonAckHandler: ([success, message, clientAccounts]) => console.log(success, message, clientAccounts),
    accountBalancesReportHandler: ([accountInfo, balances]) => console.log(balances)
});


const clientId = parseInt(process.env.CLIENT_ID);
const accountId = parseInt(process.env.ACCOUNT_ID);
const senderCompId = String(uuidv4());
const apiKey = process.env.API_KEY;
const secretKey = process.env.SECRET_KEY;
const passphrase = process.env.PASSPHRASE;

let sockets = createAndBindTesSockets(
	process.env.SOCKET_SECRET,
	process.env.TCP_ADDRESS,
	process.env.INPROC_ADDRESS,
	tesResponseCallbackObject
);

let tesSocket = sockets[0];
let backend = sockets[1];

function msgHandlerCallback (args) {
    let obj = capnp.parse(msgs_capnp.TradeMessage, args[0]);
    console.log(obj);
}

// let msgHandlerSocket = createAndConnectMessageHandlerSocket(
//     "",
//     msgHandlerCallback);

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    cleanupSocket(tesSocket);
    cleanupSocket(backend);
    // cleanupSocket(msgHandlerSocket);
    process.exit();
});

const accountInfo = new AccountInfo(accountId);
const accountCredentials = new AccountCredentials(
    accountInfo, apiKey, secretKey, passphrase);
let logon = buildLogonCapnp(clientId, senderCompId, [accountCredentials]);

let heartbeat = buildHeartbeatCapnp(clientId, senderCompId);
let getAccountBalancesCapnp = buildGetAccountBalancesCapnp(clientId, senderCompId, accountInfo);
let socket  = zmq.socket('dealer');
socket.connect(process.env.INPROC_ADDRESS);
socket.send(logon);
setInterval(() => socket.send(heartbeat), 10000);
setTimeout(() => socket.send(getAccountBalancesCapnp), 10000);