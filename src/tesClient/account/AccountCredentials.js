import AccountInfo from "~/tesClient/account/AccountInfo";

class AccountCredentials {
  constructor({
      accountId,
      apiKey,
      secretKey,
      passphrase = ''
  }) {
    /**
    AccountCredentials object is used for logon
    * @param accountId: (int) accountId assigned by Fund3
    * @param apiKey: (String) apiKey for connecting to exchange API
    *    associated with accountID
    * @param secretKey: (String) secretKey for connecting to exchange API
    *    associated with accountID
    * @param passphrase: (String) optional passphrase for connecting to API
    *    associated with accountID
    */
    this.accountInfo = new AccountInfo({ accountId });
    this.apiKey = String(apiKey);
    this.secretKey = String(secretKey);
    this.passphrase = String(passphrase);
  }

  accountInfo = () => this.accountInfo;
}

export default AccountCredentials;
