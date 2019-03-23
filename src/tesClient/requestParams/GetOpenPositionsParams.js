import AccountInfo from "../account/AccountInfo";


class GetOpenPositionsParams {
  constructor({ accountId }) {
    /**
     * @param accountInfo: (int) accountInfo corresponding to an account
     *     on an exchange. Required.
    */
    this.accountInfo = new AccountInfo({ accountId });
  }
}

export default GetOpenPositionsParams;
