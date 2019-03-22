import {messageHandlerCallbackObjectFactory} from "../../lib/tes_client/tes_connection";


class TesResponseHandler {

    // system
  heartbeatHandler () {
    console.log('received heartbeat');
  }

  testHandler (message) {
    console.log(message)
  }

  systemHandler ([errorCode, message]) {
    console.log(errorCode, message)
  }

  // logon-logoff
  logonAckHandler ([success, message, clientAccounts]) {
    console.log(success, message, clientAccounts)
  }

  logoffAckHandler ([success, message]) {
    console.log(success, message)
  }

  // trading
  executionReportHandler ([
      orderID,
      clientOrderID,
      clientOrderLinkID,
      exchangeOrderID,
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
      rejectionReason
  ]) {
    console.log(
        orderID,
        clientOrderID,
        clientOrderLinkID,
        exchangeOrderID,
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
        rejectionReason
    );
  }

  accountDataReportHandler ([
    accountInfo,
    balances,
    openPositions,
    orders
  ]) {
    console.log(accountInfo, balances, openPositions, orders);
  }

  accountBalancesReportHandler ([accountInfo, balances]) {
    console.log(balances);
  }

  openPositionsReportHandler () {

  }

  workingOrdersReport () {

  }

  completedOrdersReport () {

  }

  exchangePropertiesReport () {

  }

}


let tesResponseCallbackObject = messageHandlerCallbackObjectFactory({
    heartbeatHandler: () => console.log("Overrode heartbeat handler!"),
    logonAckHandler: () => console.log("Overrode logonAck handler!"),
    accountBalancesReportHandler: () =>
        console.log("Overrode accountBalancesReport handler!")
});


export default TesResponseHandler;
