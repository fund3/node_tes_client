export default {
	// Requests

	// System
    HEARTBEAT: "heartbeat",
    TEST: "test",
    GET_SERVER_TIME: "getServerTime",

	// Logon-Logoff
    LOGON: "logon",
    LOGOFF: "logoff",
    AUTHORIZATION_REFRESH: "authorizationRefresh",

	// Trading Requests
    PLACE_SINGLE_ORDER: "placeSingleOrder",
    PLACE_CONTINGENT_ORDER: "placeContingentOrder",
    REPLACE_ORDER: "replaceOrder",
    CANCEL_ORDER: "cancelOrder",
    CANCEL_ALL_ORDERS: "cancelAllOrders",
    GET_ORDER_STATUS: "getOrderStatus",

	// Account-related Requests
    GET_ACCOUNT_DATA: "getAccountData",
    GET_ACCOUNT_BALANCES: "getAccountBalances",
    GET_OPEN_POSITIONS: "getOpenPositions",
    GET_WORKING_ORDERS: "getWorkingOrders",
    GET_COMPLETED_ORDERS: "getCompletedOrders",
    GET_EXCHANGE_PROPERTIES: "getExchangeProperties",

	// Responses

	// System
    SERVER_TIME: "serverTime",
    SYSTEM: "system",

	// Logon-Logoff
    LOGON_ACK: "logonAck",  // Logon Acknowledgement
    LOGOFF_ACK: "logoffAck",  // Logoff Acknowledgement
    AUTHORIZATION_GRANT: "authorizationGrant",

	// Trading
    EXECUTION_REPORT: "executionReport",

	// Accounting
    ACCOUNT_DATA_REPORT: "accountDataReport",
    ACCOUNT_BALANCES_REPORT: "accountBalancesReport",
    OPEN_POSITIONS_REPORT: "openPositionsReport",
    WORKING_ORDERS_REPORT: "workingOrdersReport",
    COMPLETED_ORDERS_REPORT: "completedOrdersReport",
    EXCHANGE_PROPERTIES_REPORT: "exchangePropertiesReport"
};
