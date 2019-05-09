import AccountInfo from "~/tesClient/account/AccountInfo";

class AccountCredentials {
	public account_info;
	public apiKey;
	public secretKey;
	public passphrase;

	constructor({ accountId, apiKey, secretKey, passphrase = "" }) {
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
		this.account_info = new AccountInfo({ accountId });
		this.apiKey = String(apiKey);
		this.secretKey = String(secretKey);
		this.passphrase = String(passphrase);
	}

	accountInfo = () => this.account_info;
}

export default AccountCredentials;
