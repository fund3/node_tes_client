class AccountCredentials {
  constructor({
      accountInfo,
      apiKey,
      secretKey,
      passphrase = ''
  }) {
    /**
    AccountCredentials object is used for logon
    * @param accountInfo: AccountInfo object containing accountID
    * @param apiKey: String apiKey for connecting to exchange API
    *    associated with accountID
    * @param secretKey: String secretKey for connecting to exchange API
    *    associated with accountID
    * @param passphrase: String (optional) passphrase for connecting to API
    *    associated with accountID
    */
    this.accountInfo = accountInfo;
    this.apiKey = String(apiKey);
    this.secretKey = String(secretKey);
    this.passphrase = String(passphrase);
  }

  accountInfo = () => this.accountInfo;
}

export default AccountCredentials;
