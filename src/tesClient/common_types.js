// common_types.js
/*
 ****** NOT UPDATED, REFER TO COMMUNICATIONS PROTOCOL FOR LATEST VERSION******
 */

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

export {
    // Enums
    Side,
    OrderType,
    OrderStatus,
    LeverageType,
    AccountType,
    ExecutionType
}
