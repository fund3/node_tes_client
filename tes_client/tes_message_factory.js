// tes_message_factory.js

// external dependency imports
var capnp = require("capnp");
// load capnp schema
var msgs_capnp = require("../CommunicationProtocol/TradeMessage.capnp");
var exch_capnp = require("../CommunicationProtocol/Exchanges.capnp")
// internal dependency imports
var common_types = require("./common_types");

var EXCHANGE_ENUM_MAPPING = {
    Exchange.poloniex: exch_capnp.Exchange.poloniex,
    Exchange.kraken: exch_capnp.Exchange.kraken,
    Exchange.gemini: exch_capnp.Exchange.gemini,
    Exchange.bitfinex: exch_capnp.Exchange.bitfinex,
    Exchange.bittrex: exch_capnp.Exchange.bittrex,
    Exchange.binance: exch_capnp.Exchange.binance,
    Exchange.coinbasePro: exch_capnp.Exchange.coinbasePro,
    Exchange.coinbasePrime: exch_capnp.Exchange.coinbasePrime,
    Exchange.bitstamp: exch_capnp.Exchange.bitstamp,
    Exchange.itBit: exch_capnp.Exchange.itBit
};

function build_test_message(test) {
    /**
    Builds test message Javascript object from capnp object.
    @param test: (capnp._DynamicStructBuilder) TestMessage object.
    @return: (str) test message.
    */
    return test.string;
}


function build_system_message(system) {
    /**
    Builds system message Javascript object from capnp object.
    @param system: (capnp._DynamicStructBuilder) system message.
    @return: array of (int) error code, (str) system message.
    */
    return [system.errorCode, system.message];
}


function build_logon(logonAck) {
    /**
    Builds Logon Javascript object from capnp object.
    @param logonAck: (capnp._DynamicStructBuilder) LogonAck object.
    @return: array of (bool) success, (str) message, (List[int]) clientAccounts.
    */
    if logonAck.success {
        console.debug('Logon success', 'status:', 'logon_success');
    } else {
        console.debug('Logon failure', 'status:', 'logon_failure');
    }
    console.debug('logon response: ', logonAck.message);
    client_accounts = new Array(logonAck.clientAccounts);
    console.debug('client accounts:', client_accounts);
    // NOTE client accounts are not used for now since they are what's
    //  passed to TES in the 1st place
    return [logonAck.success, logonAck.message, client_accounts];
}


function build_logoff(logoffAck) {
    /**
    Builds Logoff Javascript object from capnp object.
    @param logoffAck: (capnp._DynamicStructBuilder) LogoffAck object.
    @return: array of (bool) success, (str) message.
    */
    logoff_success = new Boolean(logoffAck.success);
    logoff_msg = new String(logoffAck.message);
    if logoff_success {
        console.debug('Logoff success.', 'status', 'logoff_success'});
    } else {
        console.debug('Logoff failure.', 'status', 'logoff_failure'});
    }
    console.debug('Logoff message.', 'logoff_message', logoff_msg});
    return [logoff_success, logoff_msg];
}


function build_exec_report(executionReport) {
    /**
    Builds ExecutionReport Javascript object from capnp object.
    @param executionReport: (capnp._DynamicStructBuilder) ExecutionReport
        object.
    @return: (ExecutionReport) javascript object.
    */    
    console.debug('Execution report:', executionReport})
    switch (executionReport.type.which()) {
        case 'orderAccepted':
            console.debug('Order accepted.', 'er_type', 'orderAccepted');

        case 'orderRejected':
            oR = executionReport.type.orderRejected;
            console.debug('Order rejected.',
                          'er_type', 'orderRejected',
                                'rejection_message': String(oR.message),
                                'rejection_code': String(oR.rejectionCode));

        case 'orderReplaced':
            oR = executionReport.type.orderReplaced;
            console.debug('Order replaced.',
                         'er_type': 'orderReplaced', 'order_replaced': String(oR));

        case 'replaceRejected':
            rR = executionReport.type.replaceRejected;
            console.debug('Replace rejected.',
                          'er_type', 'replaceRejected', 
                          'rejection_message', String(rR.message),
                          'rejection_code', String(rR.rejectionCode));

        case 'orderCanceled':
            console.debug('Order cancelled.', 'er_type', 'orderCanceled');

        case 'cancelRejected':
            cR = executionReport.type.cancelRejected;
            console.debug('Cancel rejected. ',
                          'er_type', 'cancelRejected',
                          'rejection_message', String(cR.message),
                          'rejection_code', String(cR.rejectionCode));

        case 'orderFilled':
            console.debug('Order filled.', 'er_type', 'orderFilled');

        case 'statusUpdate':
            console.debug('Status update.', 'er_type', 'statusUpdate');

        case 'statusUpdateRejected':
            sUR = executionReport.type.statusUpdateRejected;
            console.debug('Status update rejected.',
                         'er_type', 'statusUpdateRejected',
                         'rejection_message', String(sUR.message),
                         'rejection_code', String(sUR.rejectionCode));
    }
    return build_js_execution_report_from_capnp(executionReport);
}
