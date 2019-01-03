import { message_body_types } from '~/tes_client/constants'
import { AccountInfo } from '~/tes_client/common_types';

class MessageBodyFactory {
	static buildMessageBody = ({ message_body_type, message_body_contents }) => {
		switch (message_body_type) {
			case message_body_types.HEARTBEAT:
				return { [message_body_types.HEARTBEAT]: "" };

			case message_body_types.TEST:
				return { [message_body_types.TEST]: message_body_contents };

			case message_body_types.LOGON:
				return { [message_body_types.LOGON]: message_body_contents };

			case message_body_types.LOGOFF:
				return { [message_body_types.LOGOFF]: "" };

			case message_body_types.PLACE_ORDER:
				return { [message_body_types.PLACE_ORDER]: message_body_contents };

			case message_body_types.REPLACE_ORDER:
				return { [message_body_types.REPLACE_ORDER]: message_body_contents };

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

	static buildLogonMessageBody = ({ account_credentials }) => {
		const message_body_type = message_body_types.LOGON;
		const message_body_contents = { credentials: [account_credentials] };
		const message_body = MessageBodyFactory.buildMessageBody({
			message_body_type,
			message_body_contents
		});
		return message_body;
	};

	static buildHeartbeatMessageBody = () => {
		const message_body_type = message_body_types.HEARTBEAT;
		const message_body = MessageBodyFactory.buildMessageBody({ message_body_type });
		return message_body;
	};

	static buildGetAccountBalancesMessageBody = ({ account_id }) => {
        const message_body_type = message_body_types.GET_ACCOUNT_BALANCES
        const message_body_contents = { accountInfo: new AccountInfo(account_id) }
        const message_body = MessageBodyFactory.buildMessageBody({
			message_body_type,
			message_body_contents
        });
        return message_body
    }
}

export default MessageBodyFactory