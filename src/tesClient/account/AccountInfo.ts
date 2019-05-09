class AccountInfo {

    public exchange;
    public accountID;
    public accountType;
    public exchangeAccountID;
    public exchangeClientID;

  constructor({
      accountId,
      exchange = undefined,
      accountType = undefined,
      exchangeAccountId = undefined,
      exchangeClientId = undefined
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
    if (exchange !== undefined) {
        this.exchange = exchange;
    }
    if (accountType !== undefined) {
        this.accountType = accountType;
    }
    if (exchange !== undefined) {
        this.exchangeAccountID = exchangeAccountId;
    }
    if (exchange !== undefined) {
        this.exchangeClientID = exchangeClientId;
    }
  }
}

export default AccountInfo;
