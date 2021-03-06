import AccountInfo from "~/tesClient/account/AccountInfo";
import { leverageType, timeInForce } from "~/tesClient/constants";


class ReplaceOrderParams {
  constructor ({
      accountId,
      orderId,
      quantity = undefined,
      price = undefined,
      stopPrice = undefined
  }) {
        this.accountInfo = new AccountInfo({ accountId });
        this.orderID = orderId;
        if (quantity !== undefined) {
            this.quantity = quantity;
        }
        if (price !== undefined) {
            this.price = price;
        }
        if (stopPrice !== undefined) {
            this.stopPrice = stopPrice;
        }
    }
}

export default ReplaceOrderParams;
