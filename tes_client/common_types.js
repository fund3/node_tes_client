// common_types.js

//Enums
var Exchange = {
    //Exchange Names
    //https://github.com/fund3/communication-protocol/blob/master/Exchanges.capnp
    //
    undefined:0,
    poloniex:1,
    kraken:2,
    gemini:3,
    bitfinex:4,
    bittrex:5,
    binance:6,
    coinbasePro:7,
    coinbasePrime:8,
    bitstamp:9,
    itBit:10
};


var Side = {
    //Trading Sides
    //https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined:0,
    buy:1,
    sell:2
};


var OrderType = {
    //Supported Order Types
    //https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined:0,
    market:1,
    limit:2
};


var OrderStatus = {
    //Order Status on Exchange
    //https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined:0,
    received:1,
    adopted:2,
    working:3,
    partiallyFilled:4,
    filled:5,
    pendingReplace:6,
    replaced:7,
    pendingCancel:8,
    canceled:9,
    rejected:10,
    expired:11
};

var TimeInForce = {
    //Order Time In Force
    //https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    gtc: 1,        # Good till cancel
    gtt: 2,        # Good till time
    day: 3,        # Day order
    ioc: 4,        # Immediate or cancel
    fok: 5,        # Fill or kill
};


var LeverageType = {
    //Leverage Type
    //https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    exchangeDefault: 1,
    custom: 2,
};


var AccountType {
    //Account Type
    //https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    exchange: 1,
    margin: 2,
    combined: 3,
};


 var ExecutionReportType = {
    //Execution Report Type
    orderAccepted: 0,
    orderRejected: 1,
    orderReplaced: 2,
    replaceRejected: 3,
    orderCanceled: 4,
    cancelRejected: 5,
    orderFilled: 6,
    statusUpdate: 7,
    statusUpdateRejected: 8,
};


// Classes
class AccountInfo {
    constructor(accountID, exchange, accountType, exchangeAccountID,  
                exchangeClientID){
        //
        // accountID: int id corresponding to an account on an exchange Required.
        // exchange: String exchange in which accountID is contained
        // accountType: String exchange account type (exchange,
        //     margin, combined), empty in client request
        // exchangeAccountID: String account/wallet id, empty in client request
        // exchangeClientID: String exchange client (customer) ID,
        //    empty in client request
        //
        this.accountID = accountID;
        this.exchange = String(exchange);
        this.accountType = String(accountType);
        this.exchangeAccountID = String(exchangeAccountID);
        this.exchangeClientID = String(exchangeClientID);
    }
}


class AccountCredentials {
    constructor(accountInfo, apiKey, secretKey, passphrase){
        //
        // AccountCredentials object is used for logon
        // accountInfo: AccountInfo object containing accountID
        // apiKey: String apiKey for connecting to exchange API
        //    associated with accountID
        // secretKey: String secretKey for connecting to exchange API
        //    associated with accountID
        // passphrase: String (optional) passphrase for connecting to API
        //    associated with accountID
        //
        this.accountInfo = accountInfo;
        this.apiKey = String(apiKey);
        this.secretKey = String(secretKey);
        this.passphrase = String(passphrase);
    }
}


class Order {
    //
    // object created for placing a new Order.
    //
    constructor(accountInfo, clientOrderID, symbol, side, orderType, 
                quantity, price, timeInForce, leverageType, leverage, 
                clientOrderLinkID) {
        //
        // accountInfo: AccountInfo
        // clientOrderID: int orderID generated on the client side
        // accountInfo: accountInfo
        // symbol: String
        // side: String (see Side enum)
        // orderType: String (see OrderType enum)
        // quantity: float
        // price: float
        // timeInForce: String (see TimeInForce enum)
        // leverageType: String (see LeverageType enum)
        // leverage: float leverage being used on this specific order
        // clientOrderLinkID: String used for identifying Stringategy (when
        //    multiple Strategies are trading on the same account)
        //
        this.accountInfo = accountInfo;
        this.clientOrderID = clientOrderID;
        this.clientOrderLinkID = String(clientOrderLinkID);
        this.symbol = String(symbol);
        this.side = String(side);
        this.orderType = String(orderType);
        this.quantity = quantity;
        this.price = price;
        this.timeInForce = String(timeInForce);
        this.leverageType = String(leverageType);
        this.leverage = leverage;
    }
}


class RequeStringejected {
    constructor(message){
        //
        // message: String rejection reason
        //
        this.message = String(message);
    }
}


class Balance {
    constructor(currency, fullBalance, availableBalance) {
        //
        // currency: String currency pair symbol
        // fullBalance: float
        // availableBalance: float
        //
        this.currency = String(currency);
        this.fullBalance = fullBalance;
        this.availableBalance = availableBalance;
    }
}


class OpenPosition {
    //
    // OpenPosition is a glorified immutable dict for easy storage and lookup.
    // It is based on the "OpenPosition" Stringuct in:
    // https://github.com/fund3/communication-protocol/blob/master/TradeMessage.capnp
    //
    // TODO dict storing the valid values of these types
    constructor(symbol, side, quantity, initialPrice, unrealizedPL) {
        //
        // symbol: String ticker symbol
        // side: String (see Side enum)
        // quantity: float
        // initialPrice: float
        // unrealizedPL: float
        //
        this.symbol = String(symbol);
        this.side = String(side);
        this.quantity = quantity;
        this.initialPrice = initialPrice;
        this.unrealizedPL = unrealizedPL;
    }
}


class ExecutionReport {
    //
    // returned in response to place, modify, cancel, getOrderStatus requests
    //
    constructor(orderID, clientOrderID, exchangeOrderID, accountInfo, symbol, 
                side, orderType, quantity, price, timeInForce, leverageType, 
                leverage, orderStatus, filledQuantity, avgFillPrice, 
                executionReportType, rejectionReason, clientOrderLinkID) {
        //
        // orderID: String orderID as assigned by TES
        // clientOrderID: int orderID generated on the client side
        // clientOrderLinkID: String internal id used for
        // exchangeOrderID: String orderID as assigned by Exchange
        // accountInfo: accountInfo
        // symbol: String
        // side: String (see Side enum)
        // orderType: String (see OrderType enum)
        // quantity: float
        // price: float
        // timeInForce: String (see TimeInForce enum)
        // leverageType: String (see LeverageType enum)
        // leverage: float leverage being used on this specific order
        // orderStatus: String (see OrderStatus enum)
        // filledQuantity: float amount of quantity which has been filled
        // avgFillPrice: float average price at which the order has been
        //    filled thus far
        // executionReportType: String (see ExecutionReportType enum)
        // rejectionReason: String rejectionReason
        //
        this.orderID = String(orderID);
        this.clientOrderID = clientOrderID;
        this.clientOrderLinkID = String(clientOrderLinkID);
        this.exchangeOrderID = String(exchangeOrderID);
        this.accountInfo = accountInfo;
        this.symbol = String(symbol);
        this.side = side;
        this.orderType = orderType;
        this.quantity = quantity;
        this.price = price;
        this.timeInForce = timeInForce;
        this.leverageType = leverageType;
        this.leverage = leverage;
        this.orderStatus = String(orderStatus);
        this.filledQuantity = filledQuantity;
        this.avgFillPrice = avgFillPrice;
        this.executionReportType = String(executionReportType);
        this.rejectionReason = String(rejectionReason);
    }
}


class AccountDataReport {
    constructor(accountInfo, balances, openPositions, orders) {
        //
        // accountInfo: accountInfo
        // balances: Array of Balances of all currency pairs on the
        //    account given in accountInfo
        // openPositions: Array of OpenPosition on the account given in
        //    accountInfo
        // orders: Array of ExecutionReport of orders which are currently
        //    active on the account given in accountInfo
        //
        this.accountInfo = accountInfo;
        this.balances = balances;
        this.openPositions = openPositions;
        this.orders = orders;
    }
}


class AccountBalancesReport {
    constructor(accountInfo, balances) {
        //
        // accountInfo: AccountInfo
        // balances: Array of Balances of all currency pairs on the
        //    account given in accountInfo
        //
        this.accountInfo = accountInfo;
        this.balances = balances;
    }
}


class OpenPositionsReport {
    constructor( accountInfo, openPositions) {
        //
        // accountInfo: AccountInfo
        // openPositions: Array of OpenPosition on the account given in
        //    accountInfo
        //
        this.accountInfo = accountInfo;
        this.openPositions = openPositions;
    }
}


class WorkingOrdersReport {
    constructor(accountInfo, orders) {
        //
        // accountInfo: AccountInfo
        // orders: Array of ExecutionReport of orders which are currently
        //    active on the account given in accountInfo
        //
        this.accountInfo = accountInfo;
        this.orders = orders;
    }
}


class CompletedOrdersReport {
    constructor(accountInfo, orders) {
        //
        // accountInfo: AccountInfo
        // exchange: String
        // orders: Array of ExecutionReport of orders completed within the
        //    last 24 hours on the account given in accountInfo
        //
        this.accountInfo = accountInfo;
        this.orders = orders;
    }
}


class OrderInfo {
    constructor(orderID, clientOrderID, clientOrderLinkID, exchangeOrderID,
                symbol) {
        //
        // orderID: String required
        // clientOrderID: int empty in client request
        // clientOrderLinkID: String empty in client request
        // exchangeOrderID: String empty in client request
        // symbol: String empty in client request
        //
        this.orderID = String(orderID);
        this.clientOrderID = clientOrderID;
        this.clientOrderLinkID = String(clientOrderLinkID);
        this.exchangeOrderID = exchangeOrderID;
        this.symbol = symbol;
    }
}


class SymbolProperties {
    constructor(symbol, pricePrecision, quantityPrecision, minQuantity,
                maxQuantity, marginSupported, leverage) {
        //
        // symbol: String
        // pricePrecision: float
        // quantityPrecision: float
        // minQuantity: float
        // maxQuantity: float
        // marginSupported: bool
        // leverage: set of float leverages supported for symbol
        //
        this.symbol = String(symbol);
        this.pricePrecision = pricePrecision;
        this.quantityPrecision = quantityPrecision;
        this.minQuantity = minQuantity;
        this.maxQuantity = maxQuantity;
        this.marginSupported = marginSupported;
        this.leverage = leverage;
    }
}


class ExchangePropertiesReport {
    constructor(exchange, currencies, symbolProperties, timeInForces, orderTypes) {
        //
        // exchange: String
        // currencies: array (set) of String active currencies on exchange
        // symbolProperties: dict of {symbol: SymbolProperties}
        // timeInForces: array (set) of supported TimeInForce across all currencies
        // orderTypes: array (set) of supported OrderType across all currencies
        //
        this.exchange = String(exchange);
        this.currencies = currencies;
        this.symbolProperties = symbolProperties;
        this.timeInForces = timeInForces;
        this.orderTypes = orderTypes;
    }
}
