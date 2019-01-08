class PlaceOrderArguments {
  constructor ({
      accountInfo,
      clientOrderID,
      symbol,
      side,
      quantity,
      orderType,
      price,
      timeInForce,
      leverageType,
      leverage,
      clientOrderLinkID
  }) {
        this.accountInfo = accountInfo;
        this.clientOrderID = clientOrderID;
        this.symbol = symbol;
        this.side = side;
        this.quantity = quantity;
        this.price = price;
        // TODO: deal with optional arguments
    }
}

export default PlaceOrderArguments;
