//index.js
require("@babel/polyfill");

import * as zmq from "zeromq";
import {AccountCredentials, AccountInfo} from "./tes_client/common_types";
import {buildLogonCapnp, buildHeartbeatCapnp, buildLogonAckJs,
    buildLogoffAckJs, buildGetAccountBalancesCapnp} from "./tes_client/tes_message_factory";
const uuidv4 = require('uuid/v4');
    
var capnp = require("capnp");
const msgs_capnp = require("~/CommunicationProtocol/TradeMessage.capnp");
import {cleanupSocket, createAndBindTesSockets,
        createAndConnectMessageHandlerSocket, messageHandlerCallbackObjectFactory}
        from "./tes_client/tes_connection";


let tesResponseCallbackObject = messageHandlerCallbackObjectFactory({
    heartbeatHandler: () => console.log('received heartbeat'),
    logonAckHandler: ([success, message, clientAccounts]) => console.log(success, message, clientAccounts),
    accountBalancesReportHandler: ([accountInfo, balances]) => console.log(balances)
});


const clientId = 0;
const accountId = 0;
const senderCompId = String(uuidv4());
const apiKey = "";
const secretKey =
	"";
const passphrase = "";

let sockets = createAndBindTesSockets(
	"",
	"",
	"",
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
socket.connect("");
socket.send(logon);
setInterval(() => socket.send(heartbeat), 10000);
setTimeout(() => socket.send(getAccountBalancesCapnp), 10000);