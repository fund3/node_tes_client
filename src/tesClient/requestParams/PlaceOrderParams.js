import AccountInfo from "~/tesClient/account/AccountInfo";
import { leverageType, timeInForce } from "~/tesClient/constants";


class PlaceSingleOrderParams {
  constructor ({
      accountId,
      clientOrderId,
      clientOrderLinkId = undefined,
      symbol,
      side,
      orderType = undefined,
      quantity,
      price = undefined,
      stopPrice = undefined,
      timeInForce = undefined,
      expireAt = undefined,
      leverageType = undefined,
      leverage = undefined,
  }) {
        this.accountInfo = new AccountInfo({ accountId });
        this.clientOrderID = clientOrderId;
        if (clientOrderLinkId !== undefined) {
            this.clientOrderLinkID = clientOrderLinkId;
        }
        this.symbol = symbol;
        this.side = side;
        if (orderType !== undefined) {
            this.orderType = orderType;
        }
        this.quantity = quantity;
        if (price !== undefined) {
            this.price = price;
        }
        if (stopPrice !== undefined) {
            this.stopPrice = stopPrice;
        }
        if (timeInForce !== undefined) {
            this.timeInForce = timeInForce;
        }
        if (expireAt !== undefined) {
            this.expireAt = expireAt;
        }
        if (leverageType !== undefined) {
            this.leverageType = leverageType;
        }
        if (leverage !== undefined) {
            this.leverage = leverage;
        }
    }
}

export default PlaceSingleOrderParams;
