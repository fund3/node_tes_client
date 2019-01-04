class AccountCredentials {
  constructor({
      account_info,
      api_key,
      secret_key,
      passphrase
  }) {
    /**
    * @param AccountCredentials object is used for logon
    * @param accountInfo: AccountInfo object containing accountID
    * @param apiKey: String api_key for connecting to exchange API
    *    associated with accountID
    * @param secretKey: String secret_key for connecting to exchange API
    *    associated with accountID
    * @param passphrase: String (optional) passphrase for connecting to API
    *    associated with accountID
    */
    this.accountInfo = account_info;
    this.apiKey = String(api_key);
    this.secretKey = String(secret_key);
    this.passphrase = String(passphrase);
  }

  accountInfo = () => this.account_info;
}

export default AccountCredentials;
