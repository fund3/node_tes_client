// tes_message_factory.js

// external dependency imports
var capnp = require("capnp");
// load capnp schema
const msgs_capnp = capnp.import("../../CommunicationProtocol/TradeMessage.capnp");
const exch_capnp = capnp.import("../../CommunicationProtocol/Exchanges.capnp");
// internal dependency imports
import {AccountCredentials, AccountInfo, AccountType //, TradeMessage
    } from "./common_types";

// const EXCHANGE_ENUM_MAPPING = {
//     poloniex: exch_capnp.Exchange.poloniex,
//     kraken: exch_capnp.Exchange.kraken,
//     gemini: exch_capnp.Exchange.gemini,
//     bitfinex: exch_capnp.Exchange.bitfinex,
//     bittrex: exch_capnp.Exchange.bittrex,
//     binance: exch_capnp.Exchange.binance,
//     coinbasePro: exch_capnp.Exchange.coinbasePro,
//     coinbasePrime: exch_capnp.Exchange.coinbasePrime,
//     bitstamp: exch_capnp.Exchange.bitstamp,
//     itBit: exch_capnp.Exchange.itBit
// };

// class TradeMessage {
//     constructor(request) {
//         this.request = request
//     }
// }

function buildAccountInfoCapnp(accountID) {
    const accountInfo = new AccountInfo(1,
        "kraken", "exchange", "123", "456");
    console.log(accountInfo);
    const logon_capnp = capnp.serialize(msgs_capnp.AccountInfo, accountInfo);
    console.log(logon_capnp);
    const logonJs = capnp.parse(msgs_capnp.AccountInfo, logon_capnp);
    console.log(logonJs);

}


// function buildAccountCredentials() {
//     const accountInfo = new AccountInfo(1,
//         "kraken", "exchange", "123", "456");
//     const accountCredentials = new AccountCredentials(new AccountInfo(1,
//         "kraken", "exchange", "123", "456"), "apikey",
//         "secretKEy", "passphrase");
//     console.log(accountCredentials);
//     const logon_capnp = capnp.serialize(msgs_capnp.AccountCredentials, accountCredentials);
//     console.log(logon_capnp);
//     const logonJs = capnp.parse(msgs_capnp.AccountCredentials, logon_capnp);
//     console.log(logonJs);
// }


class TradeMessage {
    constructor(type) {
        this.type = type;
    }
}


class Request {
    constructor(clientId, senderCompId, body){
        this.clientID = clientId;
        this.senderCompID = senderCompId;
        this.body = body;
    }
}


class Logon {
    constructor(credentials) {
        this.credentials = credentials;
    }
}


class Body {
    constructor(bodyType, body) {
        switch(bodyType) {
            // system
            case "heartbeat":
                break;
            case "test":
                this.body = body;
                break;
            // logon-logoff
            case "logon":
                this.logon = body;
                break;
            case "logoff":
                this.logoff = body;
                break;
            // trading requests
            case "placeOrder":
                this.placeOrder = body;
                break;
            case "replaceOrder":
                this.replaceOrder = body;
                break;
            case "cancelOrder":
                this.cancelOrder = body;
                break;
            case "getOrderStatus":
                this.getOrderStatus = body;
                break;
            case "getOrderMassStatus":
                this.getOrderMassStatus = body;
                break;
            // account-related request
            case "getAccountData":
                this.getAccountData = body;
                break;
            case "getAccountBalances":
                this.getAccountBalances = body;
                break;
            case "getOpenPositions":
                this.getOpenPositions = body;
                break;
            case "getWorkingOrders":
                this.getWorkingOrders = body;
                break;
            case "getCompletedOrders":
                this.getCompletedOrders = body;
                break;
            case "getExchangeProperties":
                this.getExchangeProperties = body;
                break;
        }
    }
}


class Type {
    constructor(tradeMessageType, tradeMessage) {
        switch(tradeMessageType) {
            case "request":
                this.request = tradeMessage;
                break;
            case "response":
                this.response = tradeMessage;
                break;
        }
    }
}


function buildRequest (clientId, senderCompId, body) {
    return {clientID: clientId, senderCompID: senderCompId, body: body};
}


function buildLogon (credentials) {
    return {credentials: credentials};
}


function buildMessageBody (bodyType, body) {
    switch(bodyType) {
            // system
            case "heartbeat":
                break;
            case "test":
                return {test: body};
                // logon-logoff
            case "logon":
                return {logon: body};
            case "logoff":
                return {logoff: body};
            // trading requests
            case "placeOrder":
                return {placeOrder: body};
            case "replaceOrder":
                return {replaceOrder: body};
            case "cancelOrder":
                return {cancelOrder: body};
            case "getOrderStatus":
                return {getOrderStatus: body};
            case "getOrderMassStatus":
                return {getOrderMassStatus: body};
            // account-related request
            case "getAccountData":
                return {getAccountDatabody: body};
            case "getAccountBalances":
                return {getAccountBalances: body};
            case "getOpenPositions":
                return {getOpenPositions: body};
            case "getWorkingOrders":
                return {getWorkingOrders: body};
            case "getCompletedOrders":
                return {getCompletedOrders: body};
            case "getExchangeProperties":
                return {getExchangeProperties: body};
        }
}


function buildTradeMessage (requestOrResponse) {
    return {type: requestOrResponse}
}


function buildType(tradeMessageType, tradeMessage) {
    switch(tradeMessageType) {
        case "request":
            return {request: tradeMessage};
        case "response":
            return {response: tradeMessage};
    }
}


function buildAccountCredentials (accountInfo, apiKey, secretKey, passphrase) {
    return {accountInfo: accountInfo, apiKey: apiKey, secretKey: secretKey,
        passphrase: passphrase}
}


function buildAccountInfo (accountId, exchange, accountType, exchangeAccountId,
                           exchangeClientId) {
    let accountInfo = {accountID: accountId, exchange: 'undefined',
        accountType: 'undefined'};
    return accountInfo
}


function buildLogonCapnp(clientId, senderCompId, credentials) {
    const logon = buildLogon(credentials);
    console.log(logon);
    const request = buildRequest(
        clientId, senderCompId, buildMessageBody("logon", logon));
    console.log(request);
    // return capnp.serialize(msgs_capnp.Request, request);
    const tradeMessage = buildTradeMessage(buildType("request", request));
    console.log(tradeMessage);
    return capnp.serialize(msgs_capnp.TradeMessage, tradeMessage);
}


// function buildLogonAckCapnp


function buildLogonAckJs(logonAck) {
    /**
    Builds Logon Javascript object from capnp object.
    @param logonAck: (capnp._DynamicStructBuilder) LogonAck object.
    @return: array of (bool) success, (str) message, (List[int]) clientAccounts.
    */
    let logonObj = capnp.parse(msgs_capnp.TradeMessage, logon);
    if (Boolean(logonAck.success)) {
        console.debug('Logon success', 'status:', 'logon_success');
    } else {
        console.debug('Logon failure', 'status:', 'logon_failure');
    }
    console.debug('logon response: ', logonAck.message);
    let client_accounts = logonAck.clientAccounts;
    console.debug('client accounts:', client_accounts);
    // NOTE client accounts are not used for now since they are what's
    //  passed to TES in the 1st place
    return [logonAck.success, logonAck.message, client_accounts];
}


// function build_logon_capnp(clientId, senderCompId, credentials) {
//     /**
//     Generates a capnp Logon message with a specific clientID and set of
//     credentials.
//     :param credentials: (List[AccountCredentials]) List of exchange
//         credentials in the form of AccountCredentials.
//     :param clientID: (int) The assigned clientID.
//     :param senderCompID: (str) uuid unique to the session the user is on.
//     :return: (capnp) Logon capnp object.
//     **/
//     let inputBuffer =
//     let logon_capnp = capnp.parse(msgs_capnp.SomeStruct, inputBuffer);
// }


// function build_test_message(test) {
//     /**
//     Builds test message Javascript object from capnp object.
//     @param test: (capnp._DynamicStructBuilder) TestMessage object.
//     @return: (str) test message.
//     */
//     return test.string;
// }
//
//
// function build_system_message(system) {
//     /**
//     Builds system message Javascript object from capnp object.
//     @param system: (capnp._DynamicStructBuilder) system message.
//     @return: array of (int) error code, (str) system message.
//     */
//     return [system.errorCode, system.message];
// }


// function build_logoff(logoffAck) {
//     /**
//     Builds Logoff Javascript object from capnp object.
//     @param logoffAck: (capnp._DynamicStructBuilder) LogoffAck object.
//     @return: array of (bool) success, (str) message.
//     */
//     logoff_success = new Boolean(logoffAck.success);
//     logoff_msg = new String(logoffAck.message);
//     if logoff_success {
//         console.debug('Logoff success.', 'status', 'logoff_success'});
//     } else {
//         console.debug('Logoff failure.', 'status', 'logoff_failure'});
//     }
//     console.debug('Logoff message.', 'logoff_message', logoff_msg});
//     return new Array(logoff_success, logoff_msg);
// }
//
//
// function build_exec_report(executionReport) {
//     /**
//     Builds ExecutionReport Javascript object from capnp object.
//     @param executionReport: (capnp._DynamicStructBuilder) ExecutionReport
//         object.
//     @return: (ExecutionReport) javascript object.
//     */
//     console.debug('Execution report:', executionReport})
//     switch (executionReport.type.which()) {
//         case 'orderAccepted':
//             console.debug('Order accepted.', 'er_type', 'orderAccepted');
//
//         case 'orderRejected':
//             oR = executionReport.type.orderRejected;
//             console.debug('Order rejected.',
//                           'er_type', 'orderRejected',
//                                 'rejection_message', String(oR.message),
//                                 'rejection_code', String(oR.rejectionCode));
//
//         case 'orderReplaced':
//             oR = executionReport.type.orderReplaced;
//             console.debug('Order replaced.',
//                          'er_type': 'orderReplaced', 'order_replaced', String(oR));
//
//         case 'replaceRejected':
//             rR = executionReport.type.replaceRejected;
//             console.debug('Replace rejected.',
//                           'er_type', 'replaceRejected',
//                           'rejection_message', String(rR.message),
//                           'rejection_code', String(rR.rejectionCode));
//
//         case 'orderCanceled':
//             console.debug('Order cancelled.', 'er_type', 'orderCanceled');
//
//         case 'cancelRejected':
//             cR = executionReport.type.cancelRejected;
//             console.debug('Cancel rejected. ',
//                           'er_type', 'cancelRejected',
//                           'rejection_message', String(cR.message),
//                           'rejection_code', String(cR.rejectionCode));
//
//         case 'orderFilled':
//             console.debug('Order filled.', 'er_type', 'orderFilled');
//
//         case 'statusUpdate':
//             console.debug('Status update.', 'er_type', 'statusUpdate');
//
//         case 'statusUpdateRejected':
//             sUR = executionReport.type.statusUpdateRejected;
//             console.debug('Status update rejected.',
//                          'er_type', 'statusUpdateRejected',
//                          'rejection_message', String(sUR.message),
//                          'rejection_code', String(sUR.rejectionCode));
//     }
//     return build_js_execution_report_from_capnp(executionReport);
// }
//
//
// function build_account_data_report(accountDataReport) {
//     /**
//     Builds AccountDataReport Javscript object from capnp object, including
//     AccountBalances, OpenPositions, and ExecutionReports.
//     @param accountDataReport: (capnp._DynamicStructBuilder) AccountDataReport
//         object.
//     @return: (AccountDataReport) Javascript class object.
//     */
//     acct_balances = new Array(accountDataReport.balances);
//     var ab;
//     for (ab = 0; ab < open_positions.length; ab++) {
//       acct_balances[ab] = build_js_balance_from_capnp(acct_balances[ab]);
//     }
//
//     open_positions = new Array(accountDataReport.openPositions);
//     var op;
//     for (op = 0; op < open_positions.length; op++) {
//       open_positions[op] = build_js_open_position_from_capnp(open_positions[op]);
//     }
//
//     orders = new Array(accountDataReport.orders);
//     var er;
//     for (er = 0; er < orders.length; er++) {
//       orders[er] = build_js_execution_report_from_capnp(orders[er]);
//     }
//
//     return new AccountDataReport(
//         build_js_account_info_from_capnp(accountDataReport.accountInfo),
//         acct_balances,
//         open_positions,
//         orders
//     );
// }


function build_account_balances_report(accountBalancesReport) {
    /**
    Builds AccountBalancesReport Javascript object from capnp object.
    @param accountBalancesReport: (capnp._DynamicStructBuilder)
        AccountBalancesReport object.
    @return: (AccountBalancesReport) Javascript class object.
    */
    acct_balances = new Array(accountBalancesReport.balances);
    let ab;
    for (ab = 0; ab < open_positions.length; ab++) {
      acct_balances[ab] = build_js_balance_from_capnp(acct_balances[ab]);
    }
    return new AccountBalancesReport(
        accountInfo=build_js_account_info_from_capnp(
            accountBalancesReport.accountInfo),
        balances=acct_balances
    );
}


// function build_open_positions_report(openPositionReport) {
//     /**
//     Builds OpenPositionReport Javascript object from capnp object.
//     @param openPositionReport: (capnp._DynamicStructBuilder)
//         OpenPositionReport object.
//     @return: (OpenPositionReport) Javascript object.
//     */
//     open_positions = new Array(openPositionReport.openPositions);
//     var op;
//     for (op = 0; op < open_positions.length; op++) {
//       open_positions[op] = build_js_open_position_from_capnp(open_positions[op]);
//     }
//     return new OpenPositionsReport(
//         accountInfo=build_js_account_info_from_capnp(
//             openPositionReport.accountInfo),
//         openPositions=open_pos
//     );
// }
//
//
// function build_working_orders_report(workingOrdersReport) {
//     /**
//     Builds WorkingOrdersReport Javascript object from capnp object.
//     @param workingOrdersReport: (capnp._DynamicStructBuilder)
//         WorkingOrdersReport object.
//     @return: (WorkingOrdersReport) Javascript object.
//     */
//     orders = new Array(workingOrdersReport.orders);
//     var er;
//     for (er = 0; er < orders.length; er++) {
//       orders[er] = build_js_execution_report_from_capnp(orders[er]);
//     }
//     return new WorkingOrdersReport(
//         build_js_account_info_from_capnp(workingOrdersReport.accountInfo),
//         orders
//     );
// }
//
//
// function build_completed_orders_report(completedOrdersReport) {
//     /**
//     Builds CompletedOrdersReport Javascript object from capnp object.
//     @param completedOrdersReport: (capnp._DynamicStructBuilder)
//         CompletedOrdersReport object.
//     @return: (CompletedOrdersReport) Javascript object.
//     */
//     orders = new Array(completedOrdersReport.orders);
//     var er;
//     for (er = 0; er < orders.length; er++) {
//       orders[er] = build_js_execution_report_from_capnp(orders[er]);
//     }
//
//     return CompletedOrdersReport(
//         build_js_account_info_from_capnp(completedOrdersReport.accountInfo),
//         orders
//     );
// }
//
//
// function build_exchange_properties_report(exchangePropertiesReport) {
//     /**
//     Builds ExchangePropertiesReport Javascript object from capnp object.
//     @param exchangePropertiesReport: (capnp._DynamicStructBuilder)
//         ExchangePropertiesReport object.
//     @return: (ExchangePropertiesReport) Javascript object.
//     */
//     currencies = new Array(exchangePropertiesReport.currencies);
//     symbolProperties = {};
//     symbolPropertiesArray = new Array(exchangePropertiesReport.symbolProperties)
//     var sp;
//     for (sp = 0; sp < symbolPropertiesArray.length; sp++) {
//         symbolProperties[sp.symbol] = SymbolProperties(
//             sp.symbol,
//             sp.pricePrecision,
//             sp.quantityPrecision,
//             sp.minQuantity,
//             sp.maxQuantity,
//             sp.marginSupported,
//             new Array(sp.leverage)
//         );
//     }
//     timeInForces = new Array(exchangePropertiesReport.timeInForces);
//     var tif;
//     for (tif = 0; tif < timeInForces.length; tif++) {
//         timeInForces[tif] = String(timeInForces[tif]);
//     }
//     orderTypes = new Array(exchangePropertiesReport.orderTypes);
//     var ot;
//     for (ot = 0; ot < orderTypes.length; ot++) {
//         orderTypes[ot] = String(orderTypes[ot]);
//     }
//
//     return ExchangePropertiesReport(
//         String(exchangePropertiesReport.exchange),
//         currencies,
//         symbolProperties,
//         imeInForces,
//         orderTypes
//     );
// }

export {buildAccountInfoCapnp, buildAccountCredentials, buildLogonCapnp, buildAccountInfo}