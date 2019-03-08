class AccountInfo {
  constructor({
      accountId,
      exchange,
      accountType,
      exchangeAccountId,
      exchangeClientId
  }) {
    /**
     * @param accountId: (int) id corresponding to an account on an exchange
     *    Required.
     * @param exchange: (String) exchange in which account_id is contained.
     *     Empty in client request.
     * @param accountType: (String) exchange account type (exchange,
     *     margin, combined), empty in client request.
     * @param exchangeAccountId: (String) account/wallet id, empty in client
     *     request.
     * @param exchangeClientId: (String) exchange client (customer) ID,
     *    empty in client request.
    */
    this.accountID = accountId;
    this.exchange = String(exchange);
    this.accountType = String(accountType);
    this.exchangeAccountID = String(exchangeAccountId);
    this.exchangeClientID = String(exchangeClientId);
  }
}

export default AccountInfo;
