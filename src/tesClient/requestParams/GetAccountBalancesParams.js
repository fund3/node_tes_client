import AccountInfo from "../account/AccountInfo";


class GetAccountBalancesParams {
  constructor({ accountId }) {
    /**
     * @param accountInfo: (int) accountInfo corresponding to an account
     *     on an exchange. Required.
    */
    this.accountInfo = new AccountInfo({ accountId });
  }
}

export default GetAccountBalancesParams;
