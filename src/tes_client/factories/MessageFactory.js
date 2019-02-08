import MessageBodyFactory from "./MessageBodyFactory";
import { message_types } from "~/tes_client/constants";

class MessageFactory {
	constructor({ sender_comp_id, account_credentials_list }) {
		this.sender_comp_id = sender_comp_id;
		this.account_credentials_list = account_credentials_list;
	}

	buildMessage = ({ message_body, client_id }) => ({
		clientID: client_id,
		senderCompID: this.sender_comp_id,
		body: message_body
	});

	buildMessageContainer = ({ message, message_type }) => {
		switch (message_type) {
			case message_types.REQUEST:
				return { type: { [message_types.REQUEST]: message } };

			case message_types.RESPONSE:
				return { type: { [message_types.RESPONSE]: message } };

			default:
				return {};
		}
	};

	buildRequestMessage = ({ message_body, client_id }) => {
		const message = this.buildMessage({ message_body, client_id });
		return this.buildMessageContainer({ message, message_type: message_types.REQUEST });
	};

	buildLogonMessage = ({ client_id }) => {
		const { account_credentials_list } = this;
		const message_body = MessageBodyFactory.buildLogonMessageBody({ account_credentials_list });
		return this.buildRequestMessage({ message_body, client_id });
	};

	buildLogoffMessage = ({ client_id }) => {
		const message_body = MessageBodyFactory.buildLogoffMessageBody();
		return this.buildRequestMessage({ message_body, client_id });
	};

	buildHeartbeatMessage = ({ client_id }) => {
		const message_body = MessageBodyFactory.buildHeartbeatMessageBody();
		return this.buildRequestMessage({ message_body, client_id });
	};

	buildGetAccountBalancesMessage = ({ account_id, client_id }) => {
		const message_body = MessageBodyFactory.buildGetAccountBalancesMessageBody({ account_id });
		return this.buildRequestMessage({ message_body, client_id });
	};

	buildPlaceOrderMessage = ({ 
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
		client_order_link_id,
		client_id
	 }) => {
		const message_body = 
			MessageBodyFactory.buildPlaceOrderMessageBody({
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
			});
		return this.buildRequestMessage({ message_body, client_id });
	};

	buildGetOrderStatusMessage = ({ account_info, order_id, client_id }) => {
		const message_body = MessageBodyFactory.buildGetOrderStatusMessageBody({
			account_info,
			order_id
		});
		return this.buildRequestMessage({ message_body, client_id });
	};

	buildGetAccountDataMessage = ({ account_id, client_id }) => {
		const message_body = MessageBodyFactory.buildGetAccountDataMessageBody({ account_id });
		return this.buildRequestMessage({ message_body, client_id });
	};

	buildGetWorkingOrdersMessage = ({ account_id, client_id }) => {
		const message_body = MessageBodyFactory.buildGetWorkingOrdersMessageBody({ account_id });
		return this.buildRequestMessage({ message_body, client_id });
	};

	buildCancelOrderMessage = ({ account_id, order_id, client_id }) => {
		const message_body = MessageBodyFactory.buildCancelOrderMessageBody({ account_id, order_id });
		return this.buildRequestMessage({ message_body, client_id });
	};

	buildGetCompletedOrdersMessage = ({ account_id, count, since, client_id }) => {
		const message_body = MessageBodyFactory.buildGetCompletedOrdersMessageBody({ account_id, count, since });
		return this.buildRequestMessage({ message_body, cilent_id });
	};

	buildGetExchangePropertiesMessage = ({ exchange, client_id }) => {
		const message_body = MessageBodyFactory.buildGetExchangePropertiesMessageBody({ exchange });
		return this.buildRequestMessage({ message_body, client_id });
	};
}

export default MessageFactory;
