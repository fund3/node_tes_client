import AccountInfo from "./account/AccountInfo";
import AccountCredentials from "./account/AccountCredentials";
import MessageFactory from "./factories/MessageFactory";
import Messenger from "./Messenger";

class Client {
	constructor({
		account_id,
		client_id,
		sender_comp_id,
		api_key,
		secret_key,
		passphrase,
		curve_server_key,
		tes_socket_endpoint,
		backend_socket_endpoint
	}) {
		this.account_info = new AccountInfo({ account_id });

		this.account_credentials = new AccountCredentials({
			account_info: this.account_info,
			api_key,
			secret_key,
			passphrase
		});

		this.message_factory = new MessageFactory({
			account_id,
			client_id,
			sender_comp_id,
			account_credentials: this.account_credentials
		});

		this.messenger = new Messenger({
			curve_server_key,
			tes_socket_endpoint,
			backend_socket_endpoint
		});
	}

	sendLogonMessage = () => {
		const logon_message = this.message_factory.buildLogonMessage();
		this.messenger.sendMessage({
			message: logon_message,
			onResponse: response => console.log(response)
		});
	};

	sendGetAccountBalancesMessage = () => {
		const get_account_balances_message = this.message_factory.buildGetAccountBalancesMessage()
		this.messenger.sendMessage({
			message: get_account_balances_message,
			onResponse: response => console.log(response)
		})
	}
}

export default Client;
