import MessageBodyFactory from "./MessageBodyFactory";
import { message_types } from "~/tes_client/constants";

class MessageFactory {
	constructor({ client_id, sender_comp_id, account_credentials_list }) {
		this.client_id = client_id;
		this.sender_comp_id = sender_comp_id;
		this.account_credentials_list = account_credentials_list;
	}

	buildMessage = ({ message_body }) => ({
		clientID: this.client_id,
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

	buildRequestMessage = ({ message_body }) => {
		const message = this.buildMessage({ message_body });
		return this.buildMessageContainer({ message, message_type: message_types.REQUEST });
	};

	buildLogonMessage = () => {
		const { account_credentials_list } = this;
		const message_body = MessageBodyFactory.buildLogonMessageBody({ account_credentials_list });
		return this.buildRequestMessage({ message_body });
	};

	buildLogoffMessage = () => {
		const message_body = MessageBodyFactory.buildLogoffMessageBody();
		return this.buildRequestMessage({ message_body });
	};

	buildHeartbeatMessage = () => {
		const message_body = MessageBodyFactory.buildHeartbeatMessageBody();
		return this.buildRequestMessage({ message_body });
	};

	buildGetAccountBalancesMessage = ({ account_id }) => {
		const message_body = MessageBodyFactory.buildGetAccountBalancesMessageBody({ account_id });
		return this.buildRequestMessage({ message_body });
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
		client_order_link_id
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
		return this.buildRequestMessage({ message_body });
	};

	buildGetOrderStatusMessage = ({ account_info, order_id }) => {
		const message_body = MessageBodyFactory.buildGetOrderStatusMessageBody({
			account_info,
			order_id
		});
		return this.buildRequestMessage({ message_body });
	};

	buildGetAccountDataMessage = () => {
		const message_body = MessageBodyFactory.buildGetAccountDataMessageBody({
			account_id: "TODO"
		});
		return this.buildRequestMessage({ message_body });
	};

	buildGetWorkingOrdersMessage = ({ account_id }) => {
		const message_body = MessageBodyFactory.buildGetWorkingOrdersMessageBody({ account_id });
		return this.buildRequestMessage({ message_body });
	};

	buildCancelOrderMessage = ({ account_id, order_id }) => {
		const message_body = MessageBodyFactory.buildCancelOrderMessageBody({ account_id, order_id });
		return this.buildRequestMessage({ message_body });
	};

	buildGetCompletedOrdersMessage = ({ account_id, count, since }) => {
		const message_body = MessageBodyFactory.buildGetCompletedOrdersMessageBody({ account_id, count, since });
		return this.buildRequestMessage({ message_body });
	};

	buildGetExchangePropertiesMessage = ({ exchange }) => {
		const message_body = MessageBodyFactory.buildGetExchangePropertiesMessageBody({ exchange });
		return this.buildRequestMessage({ message_body });
	};
}

export default MessageFactory;
