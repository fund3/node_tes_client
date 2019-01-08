import AccountInfo from "~/tes_client/account/AccountInfo";
import { message_body_types } from "~/tes_client/constants";

class MessageBodyFactory {
	static buildMessageBody = ({ message_body_type, message_body_contents }) => {
		switch (message_body_type) {
			case message_body_types.HEARTBEAT:
				return { [message_body_types.HEARTBEAT]: "" };

			case message_body_types.TEST:
				return { [message_body_types.TEST]: message_body_contents };

			case message_body_types.LOGON_REQUEST:
				return { [message_body_types.LOGON_REQUEST]: message_body_contents };

			case message_body_types.LOGOFF:
				return { [message_body_types.LOGOFF]: "" };

			case message_body_types.PLACE_ORDER:
				return { [message_body_types.PLACE_ORDER]: message_body_contents };

			case message_body_types.REPLACE_ORDER:
				return { [message_body_types.REPLACE_ORDER]: message_body_contents };

			case message_body_types.CANCEL_ORDER:
				return { [message_body_types.CANCEL_ORDER]: message_body_contents };

			case message_body_types.GET_ORDER_STATUS:
				return { [message_body_types.GET_ORDER_STATUS]: message_body_contents };

			case message_body_types.GET_ORDER_MASS_STATUS:
				return { [message_body_types.GET_ORDER_MASS_STATUS]: message_body_contents };

			case message_body_types.GET_ACCOUNT_DATA:
				return { [message_body_types.GET_ACCOUNT_DATA]: message_body_contents };

			case message_body_types.GET_ACCOUNT_BALANCES:
				return { [message_body_types.GET_ACCOUNT_BALANCES]: message_body_contents };

			case message_body_types.GET_OPEN_POSITIONS:
				return { [message_body_types.GET_OPEN_POSITIONS]: message_body_contents };

			case message_body_types.GET_WORKING_ORDERS:
				return { [message_body_types.GET_WORKING_ORDERS]: message_body_contents };

			case message_body_types.GET_COMPLETED_ORDERS:
				return { [message_body_types.GET_COMPLETED_ORDERS]: message_body_contents };

			case message_body_types.GET_EXCHANGE_PROPERTIES:
				return { [message_body_types.GET_EXCHANGE_PROPERTIES]: message_body_contents };

			default:
				return {};
		}
	};

	static buildLogonMessageBody = ({ account_credentials_list }) => {
		const message_body_type = message_body_types.LOGON_REQUEST;
		const message_body_contents = { credentials: account_credentials_list };
		return MessageBodyFactory.buildMessageBody({
			message_body_type,
			message_body_contents
		});
	};

	static buildHeartbeatMessageBody = () => {
		const message_body_type = message_body_types.HEARTBEAT;
		return MessageBodyFactory.buildMessageBody({ message_body_type });
	};

	static buildGetAccountBalancesMessageBody = ({ account_id }) => {
		const message_body_type = message_body_types.GET_ACCOUNT_BALANCES;
		const message_body_contents = { accountInfo: new AccountInfo({ account_id }) };
		return MessageBodyFactory.buildMessageBody({
			message_body_type,
			message_body_contents
		});
	};

	static buildGetAccountDataMessageBody = ({ account_id }) => {
		const message_body_type = message_body_types.GET_ACCOUNT_DATA;
		const message_body_contents = { accountInfo: new AccountInfo({ account_id }) };
		return MessageBodyFactory.buildMessageBody({
			message_body_type,
			message_body_contents
		});
	};

	static buildLogoffMessageBody = () => {
		const message_body_type = message_body_types.LOGOFF;
		return MessageBodyFactory.buildMessageBody({ message_body_type });
	};

	static buildPlaceOrderMessageBody = ({ 
		account_info,
		client_order_id,
		symbol,
		side,
		quantity,
		order_type,
		price,
		time_in_force,
		leverage_type,
		leverage,
		client_order_link_id
	 }) => {
		const message_body_type = message_body_types.PLACE_ORDER;
		let message_body_contents = {
			accountInfo: account_info,
			clientOrderID: client_order_id,
			symbol,
			side,
			quantity,
			orderType: order_type,
			price,
			timeInForce: time_in_force,
			leverageType: leverage_type,
			leverage,
			clientOrderLinkID: client_order_link_id
		};
		return MessageBodyFactory.buildMessageBody({
			message_body_type,
			message_body_contents
		});
	};

	static buildGetOrderStatusMessageBody = ({ accountInfo, orderId }) => {
		const message_body_type = message_body_types.GET_ORDER_STATUS;
		const message_body_contents = { accountInfo: accountInfo, orderID: orderId };
		return MessageBodyFactory.buildMessageBody({
			message_body_type,
			message_body_contents
		});
	};
}

export default MessageBodyFactory;
