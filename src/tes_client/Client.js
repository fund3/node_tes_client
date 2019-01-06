import AccountCredentials from "./account/AccountCredentials";
import AccountInfo from "./account/AccountInfo";
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
    this.account_info = new AccountInfo({account_id});

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

  sendLogonMessage = (onResponse) => {
    const logon_message = this.message_factory.buildLogonMessage();
    this.messenger.sendMessage({
        message: logon_message,
        onResponse
    });
  };

  sendHeartbeatMessage = (onResponse) => {
    const heartbeat_message = this.message_factory.buildHeartbeatMessage();
    this.messenger.sendMessage({
        message: heartbeat_message,
        onResponse
    });
  };

  sendGetAccountBalancesMessage = (onResponse) => {
    const get_account_balances_message =
		this.message_factory.buildGetAccountBalancesMessage();
    this.messenger.sendMessage({
        message: get_account_balances_message,
        onResponse
    })
  };

  sendLogoffMessage = (onResponse) => {
    const logoff_message = this.message_factory.buildLogoffMessage();
    this.messenger.sendMessage({
        message: logoff_message,
        onResponse
    });
  };

  sendPlaceOrderMessage = ({placeOrderArguments}) => {
    const place_order_message =
		this.message_factory.buildPlaceOrderMessage(
		    {placeOrderArguments});
    console.log(place_order_message.type.request.body.placeOrder);
    this.messenger.sendMessage({
        message: place_order_message,
        onResponse: response => console.log(response)
    });
  };

  sendGetOrderStatusMessage = ({accountInfo, orderId}) => {
    const get_order_status_message =
		this.message_factory.buildGetOrderStatusMessage({accountInfo, orderId});
    this.messenger.sendMessage({
        message: get_order_status_message,
        onResponse: ({
			orderID,
			clientOrderID,
			clientOrderLinkID,
			exchangeOrderID,
			accountInfo,
			symbol,
			side,
			orderType,
			quantity,
			price,
			timeInForce,
			leverageType,
			leverage,
			orderStatus,
			filledQuantity,
			avgFillPrice,
			rejectionReason
		}) => console.log(orderID, symbol, quantity, side, orderStatus)
    });
  };

  sendGetAccountDataMessage = () => {
    const get_account_data_message =
		this.message_factory.buildGetAccountDataMessage();
    this.messenger.sendMessage({
        message: get_account_data_message,
        onResponse: ({accountInfo, balances, openPositions, orders}) =>
            console.log(accountInfo, balances, openPositions, orders)
    });
  };
}

export default Client;
