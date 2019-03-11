import AccountInfo from "~/tesClient/account/AccountInfo";


class GetOrderStatusParams {
  constructor({ accountId, orderId }) {
    /**
     * @param accountInfo: (int) accountInfo corresponding to an account
     *     on an exchange. Required.
     * @param orderId: (String) id corresponding to an order on TES.
     *    Required.
    */
    this.accountInfo = new AccountInfo({ accountId });
    this.orderID = orderId
  }
}

export default GetOrderStatusParams;
