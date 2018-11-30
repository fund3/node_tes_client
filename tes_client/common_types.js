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
    none: 0,
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


class AccountInfo {
    constructor(accountID, exchange, exchangeAccountID, accountType, 
                exchangeClientID){
        //
        // accountID: int id corresponding to an account on an exchange Required.
        // exchange: str exchange in which accountID is contained
        // exchangeAccountID: str account/wallet id, empty in client request
        // accountType: str exchange account type (exchange,
        //     margin, combined), empty in client request (will replace label)
        // exchangeClientID: str exchange client (customer) ID,
        //    empty in client request
        //
        this.accountID = int(accountID);
        this.exchange = str(exchange or '');
        this.exchangeAccountID = str(exchangeAccountID or '');
        this.accountType = str(accountType or '');
        this.exchangeClientID = str(exchangeClientID or '');
    }
}


class AccountCredentials {
    constructor(accountInfo, apiKey, secretKey, passphrase){
        //
        // AccountCredentials object is used for logon
        // accountInfo: AccountInfo object containing accountID
        // apiKey: str apiKey for connecting to exchange API
        //    associated with accountID
        // secretKey: str secretKey for connecting to exchange API
        //    associated with accountID
        // passphrase: str (optional) passphrase for connecting to API
        //    associated with accountID
        //
        this.accountInfo = accountInfo;
        this.apiKey = str(apiKey);
        this.secretKey = str(secretKey);
        this.passphrase = str(passphrase or '');
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
        // symbol: str
        // side: str (see Side enum)
        // orderType: str (see OrderType enum)
        // quantity: float
        // price: float
        // timeInForce: str (see TimeInForce enum)
        // leverageType: str (see LeverageType enum)
        // leverage: float leverage being used on this specific order
        // clientOrderLinkID: str used for identifying strategy (when
        //    multiple strategies are trading on the same account)
        //
        this.accountInfo = accountInfo;
        this.clientOrderID = int(clientOrderID);
        this.clientOrderLinkID = str(clientOrderLinkID or '');
        this.symbol = str(symbol);
        this.side = str(side);
        this.orderType = str(orderType);
        this.quantity = float(quantity);
        this.price = float(price);
        this.timeInForce = str(timeInForce);
        this.leverageType = str(leverageType);
        this.leverage = float(leverage);
    }
}


class RequestRejected {
    constructor(message){
        //
        // message: str rejection reason
        //
        this.message = str(message or '');
    }
}


class Balance {
    constructor(currency, fullBalance, availableBalance) {
        //
        // currency: str currency pair symbol
        // fullBalance: float
        // availableBalance: float
        //
        this.currency = str(currency);
        this.fullBalance = float(fullBalance);
        this.availableBalance = float(availableBalance);
    }
}


class OpenPosition {
    //
    // OpenPosition is a glorified immutable dict for easy storage and lookup.
    // It is based on the "OpenPosition" struct in:
    // https://github.com/fund3/communication-protocol/blob/master/TradeMessage.capnp
    //
    // TODO dict storing the valid values of these types
    constructor(symbol, side, quantity, initialPrice, unrealizedPL) {
        //
        // symbol: str ticker symbol
        // side: str (see Side enum)
        // quantity: float
        // initialPrice: float
        // unrealizedPL: float
        //
        this.symbol = str(symbol);
        this.side = str(side);
        this.quantity = float(quantity);
        this.initialPrice = float(initialPrice);
        this.unrealizedPL = float(unrealizedPL);
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
        // orderID: str orderID as assigned by TES
        // clientOrderID: int orderID generated on the client side
        // clientOrderLinkID: str internal id used for
        // exchangeOrderID: str orderID as assigned by Exchange
        // accountInfo: accountInfo
        // symbol: str
        // side: str (see Side enum)
        // orderType: str (see OrderType enum)
        // quantity: float
        // price: float
        // timeInForce: str (see TimeInForce enum)
        // leverageType: str (see LeverageType enum)
        // leverage: float leverage being used on this specific order
        // orderStatus: str (see OrderStatus enum)
        // filledQuantity: float amount of quantity which has been filled
        // avgFillPrice: float average price at which the order has been
        //    filled thus far
        // executionReportType: str (see ExecutionReportType enum)
        // rejectionReason: str rejectionReason
        //
        this.orderID = str(orderID);
        this.clientOrderID = int(clientOrderID);
        this.clientOrderLinkID = str(clientOrderLinkID or '');
        this.exchangeOrderID = str(exchangeOrderID);
        this.accountInfo = accountInfo;
        this.symbol = str(symbol);
        this.side = Side[side];
        this.orderType = OrderType[orderType];
        this.quantity = float(quantity);
        this.price = float(price);
        this.timeInForce = TimeInForce[timeInForce];
        this.leverageType = LeverageType[leverageType];
        this.leverage = float(leverage);
        this.orderStatus = str(orderStatus);
        this.filledQuantity = float(filledQuantity);
        this.avgFillPrice = float(avgFillPrice);
        this.executionReportType = str(executionReportType);
        this.rejectionReason = str(rejectionReason) or '';
    }
}


class AccountDataReport {
    constructor(accountInfo, balances, openPositions, orders) {
        //
        // accountInfo: accountInfo
        // balances: List of Balances of all currency pairs on the
        //    account given in accountInfo
        // openPositions: List of OpenPosition on the account given in
        //    accountInfo
        // orders: List of ExecutionReport of orders which are currently
        //    active on the account given in accountInfo
        //
        this.accountInfo = accountInfo;
        this.balances = list(balances);
        this.openPositions = list(openPositions);
        this.orders = list(orders);
    }
}


class AccountBalancesReport {
    constructor(accountInfo, balances) {
        //
        // accountInfo: AccountInfo
        // balances: List of Balances of all currency pairs on the
        //    account given in accountInfo
        //
        this.accountInfo = accountInfo;
        this.balances = list(balances);
    }
}


class OpenPositionsReport {
    constructor( accountInfo, openPositions) {
        //
        // accountInfo: AccountInfo
        // openPositions: List of OpenPosition on the account given in
        //    accountInfo
        //
        this.accountInfo = accountInfo;
        this.openPositions = list(openPositions);
    }
}


class WorkingOrdersReport {
    constructor(accountInfo, orders) {
        //
        // accountInfo: AccountInfo
        // orders: List of ExecutionReport of orders which are currently
        //    active on the account given in accountInfo
        //
        this.accountInfo = accountInfo;
        this.orders = list(orders);
    }
}


class CompletedOrdersReport {
    constructor(accountInfo, orders) {
        //
        // accountInfo: AccountInfo
        // exchange: str
        // orders: List of ExecutionReport of orders completed within the
        //    last 24 hours on the account given in accountInfo
        //
        this.accountInfo = accountInfo;
        this.orders = list(orders);
    }
}


class OrderInfo {
    constructor(orderID, clientOrderID, clientOrderLinkID, exchangeOrderID,
                symbol) {
        //
        // orderID: int required
        // clientOrderID: int empty in client request
        // clientOrderLinkID: str empty in client request
        // exchangeOrderID: str empty in client request
        // symbol: str empty in client request
        //
        this.orderID = str(orderID);
        this.clientOrderID = int(clientOrderID) if clientOrderID is not None \
            else None;
        this.clientOrderLinkID = str(clientOrderLinkID or '');
        this.exchangeOrderID = str(exchangeOrderID or '');
        this.symbol = str(symbol or '');
    }
}


class SymbolProperties {
    constructor(symbol, pricePrecision, quantityPrecision, minQuantity,
                maxQuantity, marginSupported, leverage) {
        //
        // symbol: str
        // pricePrecision: float
        // quantityPrecision: float
        // minQuantity: float
        // maxQuantity: float
        // marginSupported: bool
        // leverage: set of float leverages supported for symbol
        //
        this.symbol = str(symbol);
        this.pricePrecision = float(pricePrecision);
        this.quantityPrecision = float(quantityPrecision);
        this.minQuantity = float(minQuantity);
        this.maxQuantity = float(maxQuantity);
        this.marginSupported = bool(marginSupported);
        this.leverage = set(leverage);
    }
}


class ExchangePropertiesReport {
    constructor(exchange, currencies, symbolProperties, timeInForces, orderTypes) {
        //
        // exchange: str
        // currencies: set of str active currencies on exchange
        // symbolProperties: dict of {symbol: SymbolProperties}
        // timeInForces: set of supported TimeInForce across all currencies
        // orderTypes: set of supported OrderType across all currencies
        //
        this.exchange = str(exchange);
        this.currencies = set(currencies);
        this.symbolProperties = dict(symbolProperties);
        this.timeInForces = set(timeInForces);
        this.orderTypes = set(orderTypes);
    }
}
