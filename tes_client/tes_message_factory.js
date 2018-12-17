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
    return new Array(system.errorCode, system.message);
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
    return new Array(logonAck.success, logonAck.message, client_accounts);
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
    return new Array(logoff_success, logoff_msg);
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
                                'rejection_message', String(oR.message),
                                'rejection_code', String(oR.rejectionCode));

        case 'orderReplaced':
            oR = executionReport.type.orderReplaced;
            console.debug('Order replaced.',
                         'er_type': 'orderReplaced', 'order_replaced', String(oR));

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


function build_account_data_report(accountDataReport) {
    /**
    Builds AccountDataReport Javscript object from capnp object, including
    AccountBalances, OpenPositions, and ExecutionReports.
    @param accountDataReport: (capnp._DynamicStructBuilder) AccountDataReport
        object.
    @return: (AccountDataReport) Javascript class object.
    */
    acct_balances = new Array(accountDataReport.balances);
    var ab;
    for (ab = 0; ab < open_positions.length; ab++) { 
      acct_balances[ab] = build_js_balance_from_capnp(acct_balances[ab]);
    }

    open_positions = new Array(accountDataReport.openPositions);
    var op;
    for (op = 0; op < open_positions.length; op++) { 
      open_positions[op] = build_js_open_position_from_capnp(open_positions[op]);
    }

    orders = new Array(accountDataReport.orders);
    var er;
    for (er = 0; er < orders.length; er++) { 
      orders[er] = build_js_execution_report_from_capnp(orders[er]);
    }    

    return new AccountDataReport(
        build_js_account_info_from_capnp(accountDataReport.accountInfo),
        acct_balances,
        open_positions,
        orders
    );
}


function build_account_balances_report(accountBalancesReport) {
    /**
    Builds AccountBalancesReport Javascript object from capnp object.
    @param accountBalancesReport: (capnp._DynamicStructBuilder)
        AccountBalancesReport object.
    @return: (AccountBalancesReport) Javascript class object.
    */    
    acct_balances = new Array(accountBalancesReport.balances);
    var ab;
    for (ab = 0; ab < open_positions.length; ab++) { 
      acct_balances[ab] = build_js_balance_from_capnp(acct_balances[ab]);
    }
    return new AccountBalancesReport(
        accountInfo=build_js_account_info_from_capnp(
            accountBalancesReport.accountInfo),
        balances=acct_balances
    );
}


function build_open_positions_report(openPositionReport) {
    /**
    Builds OpenPositionReport Javascript object from capnp object.
    @param openPositionReport: (capnp._DynamicStructBuilder)
        OpenPositionReport object.
    @return: (OpenPositionReport) Javascript object.
    */
    open_positions = new Array(openPositionReport.openPositions);
    var op;
    for (op = 0; op < open_positions.length; op++) { 
      open_positions[op] = build_js_open_position_from_capnp(open_positions[op]);
    }
    return new OpenPositionsReport(
        accountInfo=build_js_account_info_from_capnp(
            openPositionReport.accountInfo),
        openPositions=open_pos
    );
}


function build_working_orders_report(workingOrdersReport) {
    /**
    Builds WorkingOrdersReport Javascript object from capnp object.
    @param workingOrdersReport: (capnp._DynamicStructBuilder)
        WorkingOrdersReport object.
    @return: (WorkingOrdersReport) Javascript object.
    */
    orders = new Array(workingOrdersReport.orders);
    var er;
    for (er = 0; er < orders.length; er++) { 
      orders[er] = build_js_execution_report_from_capnp(orders[er]);
    }  
    return new WorkingOrdersReport(
        build_js_account_info_from_capnp(workingOrdersReport.accountInfo),
        orders
    );
}


function build_completed_orders_report(completedOrdersReport) {
    /**
    Builds CompletedOrdersReport Javascript object from capnp object.
    @param completedOrdersReport: (capnp._DynamicStructBuilder)
        CompletedOrdersReport object.
    @return: (CompletedOrdersReport) Javascript object.
    */
    orders = new Array(completedOrdersReport.orders);
    var er;
    for (er = 0; er < orders.length; er++) { 
      orders[er] = build_js_execution_report_from_capnp(orders[er]);
    }  

    return CompletedOrdersReport(
        build_js_account_info_from_capnp(completedOrdersReport.accountInfo),
        orders
    );
}


function build_exchange_properties_report(exchangePropertiesReport) {
    /**
    Builds ExchangePropertiesReport Javascript object from capnp object.
    @param exchangePropertiesReport: (capnp._DynamicStructBuilder)
        ExchangePropertiesReport object.
    @return: (ExchangePropertiesReport) Javascript object.
    */
    currencies = new Array(exchangePropertiesReport.currencies);
    symbolProperties = {};
    symbolPropertiesArray = new Array(exchangePropertiesReport.symbolProperties)
    var sp;
    for (sp = 0; sp < symbolPropertiesArray.length; sp++) {
        symbolProperties[sp.symbol] = SymbolProperties(
            sp.symbol,
            sp.pricePrecision,
            sp.quantityPrecision,
            sp.minQuantity,
            sp.maxQuantity,
            sp.marginSupported,
            new Array(sp.leverage)
        );
    }
    timeInForces = new Array(exchangePropertiesReport.timeInForces);
    var tif;
    for (tif = 0; tif < timeInForces.length; tif++) {
        timeInForces[tif] = String(timeInForces[tif]);
    }
    orderTypes = new Array(exchangePropertiesReport.orderTypes);
    var ot;
    for (ot = 0; ot < orderTypes.length; ot++) {
        orderTypes[ot] = String(orderTypes[ot]);
    }

    return ExchangePropertiesReport(
        String(exchangePropertiesReport.exchange),
        currencies,
        symbolProperties,
        imeInForces,
        orderTypes
    );
}
