// tes_connection.js

// external dependency imports
const zmq = require('zeromq');
import TESSocket from './sockets/TESSocket'
import BackendSocket from './sockets/BackendSocket'
// internal dependency imports
// const common_types = require("./common_types");
import {deserializeCapnp} from "./tes_message_factory";
var capnp = require("capnp");
const msgs_capnp = require("~/CommunicationProtocol/TradeMessage.capnp");

function setupCurveAuth (socket, curveServerKey) {
    const clientKeypair = zmq.curveKeypair();
    const clientPublicKey = clientKeypair.public;
    const clientPrivateKey = clientKeypair.secret;

    socket.curve_publickey = clientPublicKey;
    socket.curve_secretkey = clientPrivateKey;
    socket.curve_serverkey = curveServerKey;
}


function defaultHandler(tradeMsgObj) {
    // console.log(tradeMsgObj);
}


function messageHandlerCallbackObjectFactory({
    heartbeatHandler = defaultHandler,
    testMessageHandler = defaultHandler,
    systemMessageHandler = defaultHandler,
    logonAckHandler = defaultHandler,
    logoffAckHandler = defaultHandler,
    executionReportHandler = defaultHandler,
    accountDataReportHandler = defaultHandler,
    accountBalancesReportHandler = defaultHandler,
    openPositionsReportHandler = defaultHandler,
    workingOrdersReportHandler = defaultHandler,
    completedOrdersReportHandler = defaultHandler,
    exchangePropertiesReportHandler = defaultHandler
}) {
    return {
        heartbeat: heartbeatHandler,
        testMessage: testMessageHandler,
        systemMessage: systemMessageHandler,
        logonAck: logonAckHandler,
        logoffAck: logoffAckHandler,
        executionReport: executionReportHandler,
        accountDataReport: accountDataReportHandler,
        accountBalancesReport: accountBalancesReportHandler,
        openPositionsReport: openPositionsReportHandler,
        workingOrdersReport: workingOrdersReportHandler,
        completedOrdersReport: completedOrdersReportHandler,
        exchangePropertiesReport: exchangePropertiesReportHandler
    }
}


function messageHandlerCallback (binaryMessage, callbackObject) {
    const tradeMsgObj = capnp.parse(msgs_capnp.TradeMessage, binaryMessage);
    const messageObject = tradeMsgObj.type.response.body;
    const messageType = Object.keys(messageObject)[0];
    callbackObject[messageType](
        deserializeCapnp(messageType, messageObject[messageType]));
}


function createAndBindTesSockets (curveServerKey,
                                  tesConnectionString,
                                  backendConnectionString,
                                  callbackObject) {
    const tes_socket = 
        new TESSocket({ 
            curve_server_key: curveServerKey, 
            socket_endpoint: tesConnectionString 
        })

    tes_socket.activate({onMessage: (message) => messageHandlerCallback(message, callbackObject)})

    const backend_socket = 
        new BackendSocket({
            tes_socket,
            socket_endpoint: backendConnectionString
        })

    backend_socket.activate()

    return [tes_socket.get(), backend_socket.get()];
}

// function createAndConnectMessageHandlerSocket(backendConnectionString,
//                                               msgHandlerCallback) {
//     let msgHandlerSocket = zmq.socket('dealer');
//     msgHandlerSocket.connect(backendConnectionString);
//     msgHandlerSocket.on('message', function() {
//         console.log("Received a message. handler");
//         let args = Array.apply(null, arguments);
//         console.log(arguments);
//         console.log('we are in handler');
//         msgHandlerCallback(arguments);
//     });
//     msgHandlerSocket.on('close_zmq_sockets', function () {
//         msgHandlerSocket.close();
//     });
//     return msgHandlerSocket;
// }

function cleanupSocket(socket) {
    socket.emit('close_zmq_sockets');
}


export {cleanupSocket, createAndBindTesSockets, messageHandlerCallbackObjectFactory}
    // createAndConnectMessageHandlerSocket}

//
// // Connect to task ventilator
// var receiver = zmq.socket('pull');
//
// // TODO put this is a main method
// // receiver.on('message', function(msg) {
// //   console.log("From Task Ventilator:", msg.toString())
// // })
// // receiver.connect('tcp://localhost:5557')
//
//     /**
//     ############################################################################
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Incoming TESMessages ~~~~~~~~~~~~~~~~~~~~~~~~~~
//     ############################################################################
//     */
//     function _handle_tes_message(binary_msg) {
//         /**
//         Callback when a tes_message is received and passed to an appriopriate
//         event handler method.
//         @param binary_msg: (capnp._DynamicStructBuilder) The received
//             tesMessage.
//         */
//         console.debug('Received TESMessage..')
//         try {
//             tes_msg = msgs_capnp.TradeMessage.from_bytes(binary_msg)
//             response = tes_msg.type.response
//         } catch (err) {
//             console.error('Exception in decoding message', 'exception', err.message})
//             return
//         }
//
//         switch (response.body.which()) {
//             case 'heartbeat':
//                 console.debug('Received heartbeat ack from TES.', 'type', 'heartbeat_ack')
//                 this.on_heartbeat(response.clientID, response.senderCompID)
//                 break;
//             case 'test':
//                 test = response.body.test
//                 console.debug('Test Message:',  test.string})
//                 this.on_test_message(response.clientID,
//                                      response.senderCompID,
//                                      build_test_message(test))
//                 break;
//             case 'system':
//                 system = response.body.system
//                 console.debug('System Message:', 'error_code', system.errorCode,
//                               'system_message', system.message})
//                 this.on_system_message(response.clientID,
//                                        response.senderCompID,
//                                        *build_system_message(system))
//                 break;
//             case 'logonAck':
//                 logon_ack = response.body.logonAck
//                 console.debug('LogonAck Message:',
//                              extra={'clientID': response.clientID,
//                                     'senderCompID': response.senderCompID})
//                 this.on_logon_ack(response.clientID,
//                                   response.senderCompID,
//                                   *build_logon(logon_ack))
//                 break;
//             case 'logoffAck':
//                 logoff_ack = response.body.logoffAck
//                 console.debug('LogoffAck Message:',
//                              extra={'clientID': response.clientID,
//                                     'senderCompID': response.senderCompID})
//                 this.on_logoff_ack(response.clientID,
//                                    response.senderCompID,
//                                    *build_logoff(logoff_ack))
//                 break;
//             case 'executionReport':
//                 execution_report = response.body.executionReport
//                 console.debug('Received executionReport Message:',
//                              extra={'clientID': response.clientID,
//                                     'senderCompID': response.senderCompID})
//                 this.on_exec_report(response.clientID,
//                                     response.senderCompID,
//                                     build_exec_report(execution_report))
//                 break;
//             case 'accountDataReport':
//                 acct_data_report = response.body.accountDataReport
//                 console.debug('Received account data report.',
//                              extra={'type': 'account_data_report',
//                                     'acct_data_report': String(acct_data_report)})
//                 this.on_account_data(response.clientID,
//                                      response.senderCompID,
//                                      build_account_data_report(acct_data_report))
//                 break;
//             case 'workingOrdersReport':
//                 working_orders_report = response.body.workingOrdersReport
//                 console.debug('Received working orders report.',
//                              extra={'type': 'working_orders_report',
//                                     'working_orders_report': str(
//                                        working_orders_report)})
//                 this.on_working_orders_report(
//                     response.clientID,
//                     response.senderCompID,
//                     build_working_orders_report(working_orders_report))
//                 break;
//             case 'accountBalancesReport':
//                 acct_bals_report = response.body.accountBalancesReport
//                 console.debug('Received exchange account balances.', 'type',
//                               'account_balance_report', String(acct_bals_report))
//                 this.on_account_balances(
//                     response.clientID,
//                     response.senderCompID,
//                     build_account_balances_report(acct_bals_report))
//                 break;
//             case 'openPositionsReport':
//                 open_pos_report = response.body.openPositionsReport;
//                 console.debug('Received open positions report.', 'type',
//                               'open_positions_report', String(open_pos_report));
//                 this.on_open_positions(
//                     response.clientID,
//                     response.senderCompID,
//                     build_open_positions_report(open_pos_report));
//                 break;
//             case 'completedOrdersReport':
//                 completed_orders_report = response.body.completedOrdersReport;
//                 console.debug('Received completed orders report.', 'type',
//                               'completed_orders_report',
//                               String(completed_orders_report));
//                 this.on_completed_orders_report(
//                     response.clientID,
//                     response.senderCompID,
//                     build_completed_orders_report(completed_orders_report));
//                 break;
//             case 'exchangePropertiesReport':
//                 exchange_properties_report = response.body.exchangePropertiesReport;
//                 console.debug('Received exchange properties report.', 'type',
//                               'exchange_properties_report',
//                               String(exchange_properties_report));
//                 this.on_exchange_properties_report(
//                     response.clientID,
//                     response.senderCompID,
//                     build_exchange_properties_report(exchange_properties_report));
//                 break;
//             default:
//                 console.error('Unable to parse Response Type')
//         }
//     }
//
//     function on_heartbeat(clientID, senderCompID) {
//         /**
//         Override in subclass to handle TES heartbeat response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         */
//     }
//
//     function on_test_message(clientID, senderCompID, string) {
//         /**
//         Override in subclass to handle TES test message response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param string: (str) Test message from TES.
//         */
//     }
//
//     function on_system_message(clientID, senderCompID, errorCode, message) {
//         /**
//         Override in subclass to handle TES system message response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param errorCode: (int) The errorCode from TES.
//         @param message: (str) The error message from TES.
//         */
//     }
//
//     function on_logon_ack(clientID, senderCompID, success, message, clientAccounts) {
//         /**
//         Override in subclass to handle TES logonAck response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param success: (bool) True if logon is successful, False otherwise.
//         @param message: (str) Logon message from TES.
//         @param clientAccounts: (List[int]) A list of *all* accountIDs that are
//             logged on in the current logon request, including accounts that are
//             logged on in previous logon requests.
//         */
//     }
//
//     function on_logoff_ack(clientID, senderCompID, success, message) {
//         /**
//         Override in subclass to handle TES logoffAck response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param success: (bool) If True, logoff is successful, False otherwise.
//         @param message: (str) Logoff message from TES.
//         */
//     }
//
//     function on_exec_report(clientID, senderCompID, report) {
//         /**
//         Override in subclass to handle TES ExecutionReport response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param report: ExecutionReport Javascript object.
//         */
//     }
//
//     function on_account_data(clientID, senderCompID, report) {
//         /**
//         Override in subclass to handle TES AccountDataReport response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param report: AccountDataReport Javascript object.
//         */
//     }
//
//     function on_account_balances(clientID, senderCompID, report) {
//         /**
//         Override in subclass to handle TES AccountBalancesReport response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param report: AccountBalancesReport Javascript object.
//         */
//     }
//
//     function on_open_positions(clientID, senderCompID, report) {
//         /**
//         Override in subclass to handle TES OpenPositionsReport response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param report: OpenPositionReport Javascript object.
//         */
//     }
//
//     function on_working_orders_report(clientID, senderCompID, report) {
//         /**
//         Override in subclass to handle TES WorkingOrdersReport response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param report: WorkingOrdersReport Javascript object.
//         */
//     }
//
//     function on_completed_orders_report(clientID, senderCompID, report) {
//         /**
//         Override in subclass to handle TES CompletedOrdersReport response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param report: CompletedOrdersReport Javascript object.
//         */
//     }
//
//     function on_exchange_properties_report(clientID, senderCompID, report) {
//         /**
//         Override in subclass to handle TES ExchangePropertiesReport response.
//         @param clientID: (int) clientID of the response.
//         @param senderCompID: (str) senderCompID of the response.
//         @param report: ExchangePropertiesReport Javascript object.
//         */
//     }
