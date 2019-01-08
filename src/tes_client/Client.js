import MessageFactory from "./factories/MessageFactory";
import Messenger from "./messages/Messenger";

import { message_body_types } from '~/tes_client/constants'

class Client {
  constructor({
      client_id,
      sender_comp_id,
      account_credentials_list,
      curve_server_key,
      tes_socket_endpoint,
      backend_socket_endpoint
  }) {

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
        response_message_body_type: message_body_types.LOGON_COMPLETE,
        message: logon_message,
        onResponse
    });
  };

  sendHeartbeatMessage = (onResponse) => {
    const heartbeat_message = this.message_factory.buildHeartbeatMessage();
    this.messenger.sendMessage({
        response_message_body_type: message_body_types.HEARTBEAT,
        message: heartbeat_message,
        onResponse
    });
  };

  sendGetAccountBalancesMessage = (onResponse) => {
    const get_account_balances_message =
		this.message_factory.buildGetAccountBalancesMessage();
    this.messenger.sendMessage({
        response_message_body_type: message_body_types.ACCOUNT_BALANCES_REPORT,
        message: get_account_balances_message,
        onResponse
    })
  };

  sendLogoffMessage = (onResponse) => {
    const logoff_message = this.message_factory.buildLogoffMessage();
    this.messenger.sendMessage({
        response_message_body_type: message_body_types.LOGOFF_COMPLETE,
        message: logoff_message,
        onResponse
    });
  };

  sendPlaceOrderMessage = ({placeOrderArguments}) => {
    const place_order_message =
		this.message_factory.buildPlaceOrderMessage({placeOrderArguments});
    this.messenger.sendMessage({
        response_message_body_type: message_body_types.EXECUTION_REPORT,
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
