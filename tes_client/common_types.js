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
