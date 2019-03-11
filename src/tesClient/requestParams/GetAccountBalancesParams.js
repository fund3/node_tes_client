import AccountInfo from "~/tesClient/account/AccountInfo";


class GetAccountBalancesParams {
  constructor({ accountId }) {
    /**
     * @param accountInfo: (int) accountInfo corresponding to an account
     *     on an exchange. Required.
    */
    this.accountInfo = AccountInfo({ accountId });
  }
}

export default GetAccountBalancesParams;
