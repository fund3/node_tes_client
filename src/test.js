//index.js
require("@babel/polyfill");
require("dotenv").config();

import * as zmq from "zeromq";
import capnp from 'capnp'
import uuidv4 from 'uuid/v4'
import MessageFactory from './tes_client/factories/MessageFactory'
import MessageSocket from './tes_client/sockets/MessageSocket'

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
	process.env.CURVE_SERVER_KEY,
	process.env.TCP_ADDRESS,
	process.env.INPROC_ADDRESS,
	tesResponseCallbackObject
);

let tesSocket = sockets[0];
let backend = sockets[1];

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

const message_factory = 
    new MessageFactory({ 
        client_id: process.env.CLIENT_ID,
        sender_comp_id: senderCompId,
        account_credentials: accountCredentials
     })

const login_message = message_factory.buildLogonMessage()
const serialized_login_message = capnp.serialize(msgs_capnp.TradeMessage, login_message);

const heartbeat_message = message_factory.buildHeartbeatMessage();
const serialized_heartbeat_message = capnp.serialize(msgs_capnp.TradeMessage, heartbeat_message)

let getAccountBalancesCapnp = buildGetAccountBalancesCapnp(clientId, senderCompId, accountInfo);

let message_socket = new MessageSocket({ socket_endpoint: process.env.INPROC_ADDRESS });
message_socket.activate()

message_socket.sendMessage({ message: serialized_login_message });
setInterval(() => message_socket.sendMessage({ message: serialized_heartbeat_message }), 10000);
setTimeout(() => message_socket.sendMessage({ message: getAccountBalancesCapnp }), 10000);