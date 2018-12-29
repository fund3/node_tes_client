//index.js
import * as zmq from "zeromq";
import {AccountCredentials, AccountInfo} from "./common_types";
import {buildLogonCapnp} from "./tes_message_factory";
const uuidv4 = require('uuid/v4');

var capnp = require("capnp");
const msgs_capnp = capnp.import("../../CommunicationProtocol/TradeMessage.capnp");
import {cleanupSocket, createAndBindTesSockets,
        createAndConnectMessageHandlerSocket}
        from "../../lib/tes_client/tes_connection";

let sockets = createAndBindTesSockets(
    "curveServerKey",
    "tcp://0.0.0.0:9999",
    "inproc://TES_CLIENT_BACKEND");

let tesSocket = sockets[0];
let backend = sockets[1];

function msgHandlerCallback (args) {
    let obj = capnp.parse(msgs_capnp.TradeMessage, args[0]);
    console.log(obj);
}

let msgHandlerSocket = createAndConnectMessageHandlerSocket(
    "inproc://TES_CLIENT_BACKEND",
    msgHandlerCallback);

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    cleanupSocket(tesSocket);
    cleanupSocket(backend);
    cleanupSocket(msgHandlerSocket);
    process.exit();
});

const accountCredentials = new AccountCredentials(
    new AccountInfo(123), "apiKey", "secretKey");
let logon = buildLogonCapnp(321, String(uuidv4()), [accountCredentials]);

let socket  = zmq.socket('dealer');
socket.connect("inproc://TES_CLIENT_BACKEND");
socket.send(logon);
