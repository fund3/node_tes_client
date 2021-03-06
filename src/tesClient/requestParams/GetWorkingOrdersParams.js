import AccountInfo from "~/tesClient/account/AccountInfo";


class GetWorkingOrdersParams {
  constructor({ accountId }) {
    /**
     * @param accountInfo: (int) accountInfo corresponding to an account
     *     on an exchange. Required.
    */
    this.accountInfo = new AccountInfo({ accountId });
  }
}

export default GetWorkingOrdersParams;
