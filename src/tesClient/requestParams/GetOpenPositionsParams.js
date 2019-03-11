import AccountInfo from "~/tesClient/account/AccountInfo";


class GetOpenPositionsParams {
  constructor({ accountId }) {
    /**
     * @param accountInfo: (int) accountInfo corresponding to an account
     *     on an exchange. Required.
    */
    this.accountInfo = AccountInfo({ accountId });
  }
}

export default GetOpenPositionsParams;
