import AccountInfo from "~/tesClient/account/AccountInfo";
import { leverageType, timeInForce } from "~/tesClient/constants";


class PlaceSingleOrderParams {
  constructor ({
      accountId,
      clientOrderID,
      symbol,
      side,
      quantity,
      orderType,
      price,
      timeInForce = timeInForce.GTC,
      leverageType = leverageType.NONE,
      leverage = 0.0,
      clientOrderLinkId = ''
  }) {
        this.accountInfo = AccountInfo(accountId);
        this.clientOrderID = clientOrderID;
        this.symbol = symbol;
        this.side = side;
        this.quantity = quantity;
        this.price = price;
        this.orderType = orderType;
        this.timeInForce = timeInForce;
        this.leverageType =leverageType;
        this.leverage = leverage;
        this.clientOrderLinkId = clientOrderLinkId;
    }
}

export default PlaceSingleOrderParams;
