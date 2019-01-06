class AccountInfo {
  constructor({
      account_id,
      exchange,
      account_type,
      exchange_account_id,
      exchange_client_id
  }) {
    /**
    * @param accountID: int id corresponding to an account on an exchange Required.
    * @param exchange: String exchange in which account_id is contained
    * @param accountType: String exchange account type (exchange,
    *     margin, combined), empty in client request
    * @param exchangeAccountId: String account/wallet id, empty in client request
    * @param exchangeClientId: String exchange client (customer) ID,
    *    empty in client request
    */
    this.accountID = account_id;
    this.exchange = String(exchange);
    this.accountType = String(account_type);
    this.exchangeAccountID = String(exchange_account_id);
    this.exchangeClientID = String(exchange_client_id);
  }
}

export default AccountInfo;
