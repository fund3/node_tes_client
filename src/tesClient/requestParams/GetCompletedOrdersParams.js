import AccountInfo from "~/tesClient/account/AccountInfo";


class GetCompletedOrdersParams {
  constructor({ accountId, count = undefined, since = undefined }) {
    /**
     * @param accountInfo: (int) accountInfo corresponding to an account
     *     on an exchange. Required.
    */
    this.accountInfo = new AccountInfo({ accountId });
    if (count !== undefined) {
        this.count = count
    }
    if (since !== undefined) {
        this.since = since
    }
  }
}

export default GetCompletedOrdersParams;
