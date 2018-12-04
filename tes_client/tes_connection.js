// tes_connection.js

// external dependency imports
var capnp = require("capnp");
var zmq = require('zmq');
// load capnp schema
var msgs_capnp = require("../CommunicationProtocol/TradeMessage.capnp");
// internal dependency imports
var common_types = require("./common_types");
var tes_message_factory = require("./tes_message_factory");

// TODO unsure whether to use ChildProcess or WorkerThread as the parent
// class for TesConnection. I'm leaning towards WorkerThread, but it's 
// technically experimental https://nodejs.org/api/worker_threads.html
// https://nodejs.org/api/child_process.html - stable, but not ideal
// maybe I don't even need to inherit from a thread??

// Connect to task ventilator
var receiver = zmq.socket('pull');

// receiver.on('message', function(msg) {
//   console.log("From Task Ventilator:", msg.toString())
// })
// receiver.connect('tcp://localhost:5557')
