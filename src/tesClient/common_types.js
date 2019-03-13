// common_types.js

// Enums
const Side = {
    // Trading Sides
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    buy: 1,
    sell: 2
};


const OrderType = {
    // Supported Order Types
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    market: 1,
    limit: 2,
    stop: 3,
    stopLimit: 4,
    trailingStop: 5,
    trailingStopLimit: 6
};


const OrderStatus = {
    // Order Status on Exchange
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    received: 1,
    adopted: 2,
    working: 3,
    partiallyFilled: 4,
    filled: 5,
    pendingReplace: 6,
    replaced: 7,
    pendingCancel: 8,
    canceled: 9,
    rejected: 10,
    expired: 11,
    failed: 12
};


const ExecutionType = {
    undefined: 0,
    orderAccepted: 1,
    orderRejected: 2,
    orderReplaced: 3,
    replaceRejected: 4,
    orderCanceled: 5,
    cancelRejected: 6,
    orderFilled: 7,
    statusUpdate: 8,
    statusUpdateRejected: 9
};

const LeverageType = {
    // Leverage Type
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    exchangeDefault: 1,
    custom: 2,
};


const AccountType = {
    // Account Type
    // https://github.com/fund3/CommunicationProtocol/blob/master/TradeMessage.capnp
    //
    undefined: 0,
    exchange: 1,
    margin: 2,
    combined: 3,
};

// Classes

class Order {
    //
    // object created for placing a new Order.
    //
    constructor(accountInfo, 
                clientOrderID, 
                symbol, 
                side, 
                orderType, 
                quantity, 
                price, 
                timeInForce, 
                leverageType, 
                leverage, 
                clientOrderLinkID) {
        /**
        * @param accountInfo: AccountInfo
        * @param clientOrderID: int orderID generated on the client side
        * @param symbol: String
        * @param side: String (see Side enum)
        * @param orderType: String (see OrderType enum)
        * @param quantity: float
        * @param price: float
        * @param timeInForce: String (see TimeInForce enum)
        * @param leverageType: String (see LeverageType enum)
        * @param leverage: float leverage being used on this specific order
        * @param clientOrderLinkID: String used for labeling the order, e.g.
        * when multiple Strategies are trading on the same account)
        */
        this.accountInfo = accountInfo;
        this.clientOrderID = clientOrderID;
        this.symbol = String(symbol);
        this.side = String(side);
        this.orderType = String(orderType);
        this.quantity = quantity;
        this.price = price;
        this.timeInForce = timeInForce;
        this.leverageType = leverageType;
        this.leverage = leverage;
        this.clientOrderLinkID = clientOrderLinkID;
    }

    accountInfo() {return this.accountInfo}

    clientOrderID() {return this.clientOrderID}

    symbol() {return this.symbol}

    side() {return this.side}

    orderType() {return this.orderType}

    quantity() {return this.quantity}

    price() {return this.price}

    timeInForce() {return this.timeInForce}

    leverageType() {return this.leverageType}

    leverage() {return this.leverage}

    clientOrderLinkID() {return this.clientOrderLinkID}
}


class RequestRejected {
    constructor(message){
        /** @param message: String rejection reason */
        this.message = String(message);
    }

    message() {return this.message}
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

    currency() {return this.currency}

    fullBalance() {return this.fullBalance}

    availableBalance() {return this.availableBalance}
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

    symbol() {return this.symbol}

    side() {return this.side}

    quantity() {return this.quantity}

    initialPrice() {return this.initialPrice}

    unrealizedPL() {return this.unrealizedPL}
}


class ExecutionReport {
    //
    // returned in response to place, modify, cancel, getOrderStatus requests
    //
    constructor(orderId, 
                clientOrderID, 
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
                clientOrderLinkID) {
        /**
        * @param orderId: String orderID as assigned by TES
        * @param clientOrderID: int orderID generated on the client side
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
        * @param clientOrderLinkID: String internal id used for
        */
        this.orderId = String(orderId);
        this.clientOrderID = clientOrderID;
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
        this.clientOrderLinkID = String(clientOrderLinkID);
    }

    orderId() {return this.orderId}

    clientOrderID() {return this.clientOrderID}

    exchangeOrderId() {return this.exchangeOrderId}

    accountInfo() {return this.accountInfo}

    symbol() {return this.symbol}

    side() {return this.side}

    orderType() {return this.orderType}

    quantity() {return this.quantity}

    price() {return this.price}

    timeInForce() {return this.timeInForce}

    leverageType() {return this.leverageType}

    leverage() {return this.leverage}

    orderStatus() {return this.orderStatus}

    filledQuantity() {return this.filledQuantity}

    avgFillPrice() {return this.avgFillPrice}

    executionReportType() {return this.executionReportType}

    rejectionReason() {return this.rejectionReason}

    clientOrderLinkID() {return this.clientOrderLinkID}
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

    accountInfo() {return this.accountInfo}

    balances() {return this.balances}

    openPositions() {return this.openPositions}

    orders() {return this.orders}
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

    accountInfo() {return this.accountInfo}

    balances() {return this.balances}
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

    accountInfo() {return this.accountInfo}

    openPositions() {return this.openPositions}
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

    accountInfo() {return this.accountInfo}

    orders() {return this.orders}
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

    accountInfo() {return this.accountInfo}

    orders() {return this.orders}
}


class OrderInfo {
    constructor(orderId, clientOrderID, clientOrderLinkID, exchangeOrderId,
                symbol) {
        /**
         * @param orderId: String required
         * @param clientOrderID: int empty in client request
         * @param clientOrderLinkID: String empty in client request
         * @param exchangeOrderId: String empty in client request
         * @param symbol: String empty in client request
         */
        this.orderId = String(orderId);
        this.clientOrderID = clientOrderID;
        this.clientOrderLinkID = String(clientOrderLinkID);
        this.exchangeOrderId = String(exchangeOrderId);
        this.symbol = symbol;
    }

    orderId() {return this.orderId}

    clientOrderID() {return this.clientOrderID}

    clientOrderLinkID() {return this.clientOrderLinkID}

    exchangeOrderId() {return this.exchangeOrderId}

    symbol() {return this.symbol}
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

    symbol() {return this.symbol}

    pricePrecision() {return this.pricePrecision}

    quantityPrecision() {return this.quantityPrecision}

    minQuantity() {return this.minQuantity}

    maxQuantity() {return this.maxQuantity}

    marginSupported() {return this.marginSupported}

    leverage() {return this.leverage}
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

    exchange() {return this.exchange}

    currencies() {return this.currencies}

    symbolProperties() {return this.symbolProperties}

    timeInForces() {return this.timeInForces}

    orderTypes() {return this.orderTypes}
}

export {
    // Enums
    Side,
    OrderType,
    OrderStatus,
    LeverageType,
    AccountType,

    // Classes
    Order,
    RequestRejected,
    Balance,
    OpenPosition,
    ExecutionReport,
    AccountDataReport,
    AccountBalancesReport,
    OpenPositionsReport,
    WorkingOrdersReport,
    CompletedOrdersReport,
    OrderInfo,
    SymbolProperties,
    ExchangePropertiesReport,
}