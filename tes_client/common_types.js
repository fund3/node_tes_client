// common_types.js

// Enums
var Exchange = {
    // Exchange Names
    // https://github.com/fund3/communication-protocol/blob/master/Exchanges.capnp
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
    // Trading Sides
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined:0,
    buy:1,
    sell:2
};


var OrderType = {
    // Supported Order Types
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined:0,
    market:1,
    limit:2
};


var OrderStatus = {
    // Order Status on Exchange
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
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
    // Order Time In Force
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    gtc: 1,        # Good till cancel
    gtt: 2,        # Good till time
    day: 3,        # Day order
    ioc: 4,        # Immediate or cancel
    fok: 5,        # Fill or kill
};


var LeverageType = {
    // Leverage Type
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    exchangeDefault: 1,
    custom: 2,
};


var AccountType {
    // Account Type
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    exchange: 1,
    margin: 2,
    combined: 3,
};


 var ExecutionReportType = {
    // Execution Report Type
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
    constructor(accountID, 
                exchange, 
                accountType, 
                exchangeAccountId,  
                exchangeClientId){
        /**
        * @param accountID: int id corresponding to an account on an exchange Required.
        * @param exchange: String exchange in which accountID is contained
        * @param accountType: String exchange account type (exchange,
        *     margin, combined), empty in client request
        * @param exchangeAccountId: String account/wallet id, empty in client request
        * @param exchangeClientId: String exchange client (customer) ID,
        *    empty in client request
        */
        this.accountID = accountID;
        this.exchange = String(exchange);
        this.accountType = String(accountType);
        this.exchangeAccountId = String(exchangeAccountId);
        this.exchangeClientId = String(exchangeClientId);
    }
}


class AccountCredentials {
    constructor(accountInfo, apiKey, secretKey, passphrase){
        /**
        * @param AccountCredentials object is used for logon
        * @param accountInfo: AccountInfo object containing accountID
        * @param apiKey: String apiKey for connecting to exchange API
        *    associated with accountID
        * @param secretKey: String secretKey for connecting to exchange API
        *    associated with accountID
        * @param passphrase: String (optional) passphrase for connecting to API
        *    associated with accountID
        */
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
    constructor(accountInfo, 
                clientOrderId, 
                symbol, 
                side, 
                orderType, 
                quantity, 
                price, 
                timeInForce, 
                leverageType, 
                leverage, 
                clientOrderLinkId) {
        /**
        * @param accountInfo: AccountInfo
        * @param clientOrderId: int orderID generated on the client side
        * @param accountInfo: accountInfo
        * @param symbol: String
        * @param side: String (see Side enum)
        * @param orderType: String (see OrderType enum)
        * @param quantity: float
        * @param price: float
        * @param timeInForce: String (see TimeInForce enum)
        * @param leverageType: String (see LeverageType enum)
        * @param leverage: float leverage being used on this specific order
        * @param clientOrderLinkId: String used for identifying Stringategy (when
        *    multiple Strategies are trading on the same account)
        */
        this.accountInfo = accountInfo;
        this.clientOrderId = clientOrderId;
        this.symbol = String(symbol);
        this.side = String(side);
        this.orderType = String(orderType);
        this.quantity = quantity;
        this.price = price;
        this.timeInForce = String(timeInForce);
        this.leverageType = String(leverageType);
        this.leverage = leverage;
        this.clientOrderLinkId = String(clientOrderLinkId);
    }
}


class RequestRejected {
    constructor(message){
        /** @param message: String rejection reason */
        this.message = String(message);
    }
}


class Balance {
    constructor(currency, fullBalance, availableBalance) {
        /**
        * @param currency: String currency pair symbol
        * @param fullBalance: float
        * @param availableBalance: float
        */
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
        /**
        * @param symbol: String ticker symbol
        * @param side: String (see Side enum)
        * @param quantity: float
        * @param initialPrice: float
        * @param unrealizedPL: float
        */
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
    constructor(orderId, 
                clientOrderId, 
                exchangeOrderId, 
                accountInfo, 
                symbol, 
                side, 
                orderType, 
                quantity, 
                price, 
                timeInForce, 
                leverageType, 
                leverage, 
                orderStatus, 
                filledQuantity, 
                avgFillPrice, 
                executionReportType, 
                rejectionReason, 
                clientOrderLinkId) {
        /**
        * @param orderId: String orderID as assigned by TES
        * @param clientOrderId: int orderID generated on the client side
        * @param exchangeOrderId: String orderID as assigned by Exchange
        * @param accountInfo: accountInfo
        * @param symbol: String
        * @param side: String (see Side enum)
        * @param orderType: String (see OrderType enum)
        * @param quantity: float
        * @param price: float
        * @param timeInForce: String (see TimeInForce enum)
        * @param leverageType: String (see LeverageType enum)
        * @param leverage: float leverage being used on this specific order
        * @param orderStatus: String (see OrderStatus enum)
        * @param filledQuantity: float amount of quantity which has been filled
        * @param avgFillPrice: float average price at which the order has been
        *    filled thus far
        * @param executionReportType: String (see ExecutionReportType enum)
        * @param rejectionReason: String rejectionReason
        * @param clientOrderLinkId: String internal id used for
        */
        this.orderId = String(orderId);
        this.clientOrderId = clientOrderId;
        this.exchangeOrderId = String(exchangeOrderId);
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
        this.clientOrderLinkId = String(clientOrderLinkId);
    }
}


class AccountDataReport {
    constructor(accountInfo, balances, openPositions, orders) {
        /**
        * @param accountInfo: accountInfo
        * @param balances: Array of Balances of all currency pairs on the
        *    account given in accountInfo
        * @param openPositions: Array of OpenPosition on the account given in
        *    accountInfo
        * @param orders: Array of ExecutionReport of orders which are currently
        *    active on the account given in accountInfo
        */
        this.accountInfo = accountInfo;
        this.balances = balances;
        this.openPositions = openPositions;
        this.orders = orders;
    }
}


class AccountBalancesReport {
    constructor(accountInfo, balances) {
        /**
        * @param accountInfo: AccountInfo
        * @param balances: Array of Balances of all currency pairs on the
        *    account given in accountInfo
        */
        this.accountInfo = accountInfo;
        this.balances = balances;
    }
}


class OpenPositionsReport {
    constructor(accountInfo, openPositions) {
        /**
        * @param accountInfo: AccountInfo
        * @param openPositions: Array of OpenPosition on the account given in
        *    accountInfo
        */
        this.accountInfo = accountInfo;
        this.openPositions = openPositions;
    }
}


class WorkingOrdersReport {
    constructor(accountInfo, orders) {
        /**
        * @param accountInfo: AccountInfo
        * @param orders: Array of ExecutionReport of orders which are currently
        *    active on the account given in accountInfo
        */
        this.accountInfo = accountInfo;
        this.orders = orders;
    }
}


class CompletedOrdersReport {
    constructor(accountInfo, orders) {
        /**
        * @param accountInfo: AccountInfo
        * @param exchange: String
        * @param orders: Array of ExecutionReport of orders completed within the
        *    last 24 hours on the account given in accountInfo
        */
        this.accountInfo = accountInfo;
        this.orders = orders;
    }
}


class OrderInfo {
    constructor(orderId, clientOrderId, clientOrderLinkId, exchangeOrderId,
                symbol) {
        /**
        * @param orderId: String required
        * @param clientOrderId: int empty in client request
        * @param clientOrderLinkId: String empty in client request
        * @param exchangeOrderId: String empty in client request
        * @param symbol: String empty in client request
        */
        this.orderId = String(orderId);
        this.clientOrderId = clientOrderId;
        this.clientOrderLinkId = String(clientOrderLinkId);
        this.exchangeOrderId = exchangeOrderId;
        this.symbol = symbol;
    }
}


class SymbolProperties {
    constructor(symbol, 
                pricePrecision, 
                quantityPrecision, 
                minQuantity,
                maxQuantity, 
                marginSupported, 
                leverage) {
        /**
        * @param symbol: String
        * @param pricePrecision: float
        * @param quantityPrecision: float
        * @param minQuantity: float
        * @param maxQuantity: float
        * @param marginSupported: bool
        * @param leverage: set of float leverages supported for symbol
        */
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
        /**
        * @param exchange: String
        * @param currencies: array (set) of String active currencies on exchange
        * @param symbolProperties: dict of {symbol: SymbolProperties}
        * @param timeInForces: array (set) of supported TimeInForce across all currencies
        * @param orderTypes: array (set) of supported OrderType across all currencies
        */
        this.exchange = String(exchange);
        this.currencies = currencies;
        this.symbolProperties = symbolProperties;
        this.timeInForces = timeInForces;
        this.orderTypes = orderTypes;
    }
}
