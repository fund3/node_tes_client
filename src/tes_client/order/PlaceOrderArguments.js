class PlaceOrderArguments {
  constructor ({
      accountInfo,
      clientOrderId,
      symbol,
      side,
      quantity,
      orderType,
      price,
      timeInForce,
      leverageType,
      leverage,
      clientOrderLinkId
  }) {
        this.accountInfo = accountInfo;
        this.clientOrderID = clientOrderId;
        this.symbol = symbol;
        this.side = side;
        this.quantity = quantity;
        this.price = price;
        // TODO: deal with optional arguments
    }
}

export default PlaceOrderArguments;
