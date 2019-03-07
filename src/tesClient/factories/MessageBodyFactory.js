import AccountInfo from "~/tesClient/account/AccountInfo";
import isNil from "lodash/isNil";
import { messageBodyTypes } from "~/tesClient/constants";

class MessageBodyFactory {
	static buildMessageBody = ({ messageBodyType, messageBodyContents }) => {
		switch (messageBodyType) {
			case messageBodyTypes.HEARTBEAT:
				return { [messageBodyTypes.HEARTBEAT]: "" };

			case messageBodyTypes.TEST:
				return { [messageBodyTypes.TEST]: messageBodyContents };

			case messageBodyTypes.LOGON_REQUEST:
				return {
					[messageBodyTypes.LOGON_REQUEST]: messageBodyContents
				};

			case messageBodyTypes.LOGOFF:
				return { [messageBodyTypes.LOGOFF]: "" };

			case messageBodyTypes.PLACE_ORDER:
				return { [messageBodyTypes.PLACE_ORDER]: messageBodyContents };

			case messageBodyTypes.REPLACE_ORDER:
				return { [messageBodyTypes.REPLACE_ORDER]:
					messageBodyContents };

			case messageBodyTypes.CANCEL_ORDER:
				return { [messageBodyTypes.CANCEL_ORDER]:
					messageBodyContents };

			case messageBodyTypes.GET_ORDER_STATUS:
				return { [messageBodyTypes.GET_ORDER_STATUS]:
					messageBodyContents };

			case messageBodyTypes.GET_ORDER_MASS_STATUS:
				return { [messageBodyTypes.GET_ORDER_MASS_STATUS]:
					messageBodyContents };

			case messageBodyTypes.GET_ACCOUNT_DATA:
				return { [messageBodyTypes.GET_ACCOUNT_DATA]:
					messageBodyContents };

			case messageBodyTypes.GET_ACCOUNT_BALANCES:
				return { [messageBodyTypes.GET_ACCOUNT_BALANCES]:
					messageBodyContents };

			case messageBodyTypes.GET_OPEN_POSITIONS:
				return { [messageBodyTypes.GET_OPEN_POSITIONS]:
					messageBodyContents };

			case messageBodyTypes.GET_WORKING_ORDERS:
				return { [messageBodyTypes.GET_WORKING_ORDERS]:
					messageBodyContents };

			case messageBodyTypes.GET_COMPLETED_ORDERS:
				return { [messageBodyTypes.GET_COMPLETED_ORDERS]:
					messageBodyContents };

			case messageBodyTypes.GET_EXCHANGE_PROPERTIES:
				return { [messageBodyTypes.GET_EXCHANGE_PROPERTIES]:
					messageBodyContents };

			default:
				return {};
		}
	};

	static buildHeartbeatMessageBody = () => {
		const messageBodyType = messageBodyTypes.HEARTBEAT;
		return MessageBodyFactory.buildMessageBody({ messageBodyType });
	};

	static buildLogonMessageBody = ({ accountCredentialsList }) => {
		const messageBodyType = messageBodyTypes.LOGON_REQUEST;
		const messageBodyContents = { credentials: accountCredentialsList };
		return MessageBodyFactory.buildMessageBody({
			messageBodyType,
			messageBodyContents
		});
	};

	static buildGetAccountBalancesMessageBody = ({ accountId }) => {
		const messageBodyType = messageBodyTypes.GET_ACCOUNT_BALANCES;
		const messageBodyContents = {
			accountInfo: new AccountInfo({ accountId }) };
		return MessageBodyFactory.buildMessageBody({
			messageBodyType,
			messageBodyContents
		});
	};

	static buildGetAccountDataMessageBody = ({ accountId }) => {
		const messageBodyType = messageBodyTypes.GET_ACCOUNT_DATA;
		const messageBodyContents = {
			accountInfo: new AccountInfo({ accountId }) };
		return MessageBodyFactory.buildMessageBody({
			messageBodyType,
			messageBodyContents
		});
	};

	static buildLogoffMessageBody = () => {
		const messageBodyType = messageBodyTypes.LOGOFF;
		return MessageBodyFactory.buildMessageBody({ messageBodyType });
	};

	static buildPlaceOrderMessageBody = ({ 
		accountInfo,
		clientOrderId,
		symbol,
		side,
		quantity,
		orderType,
		price,
		timeInForce,
		leverageType,
		leverage,
		clientOrderLinkId
	 }) => {
		const messageBodyType = messageBodyTypes.PLACE_ORDER;
		let messageBodyContents = {
			accountInfo: accountInfo,
			clientOrderID: clientOrderId,
			symbol,
			side,
			quantity,
			orderType: orderType,
			price,
			timeInForce: timeInForce,
			leverageType: leverageType,
			leverage,
			clientOrderLinkID: clientOrderLinkId
		};
		return MessageBodyFactory.buildMessageBody({
			messageBodyType,
			messageBodyContents
		});
	};

	static buildGetOrderStatusMessageBody = ({ accountInfo, orderId }) => {
		const messageBodyType = messageBodyTypes.GET_ORDER_STATUS;
		const messageBodyContents = {
			accountInfo: accountInfo, orderID: orderId };
		return MessageBodyFactory.buildMessageBody({
			messageBodyType,
			messageBodyContents
		});
	};

	static buildGetWorkingOrdersMessageBody = ({ accountId }) => {
		const messageBodyType = messageBodyTypes.GET_WORKING_ORDERS;
		const messageBodyContents = {
			accountInfo: new AccountInfo({ accountId }) };
		return MessageBodyFactory.buildMessageBody({
			messageBodyType,
			messageBodyContents
		});
	};

	static buildCancelOrderMessageBody = ({ accountId, orderId }) => {
		const messageBodyType = messageBodyTypes.CANCEL_ORDER;
		const messageBodyContents = {
			accountInfo: new AccountInfo({ accountId }),
			orderID:  orderId};
		return MessageBodyFactory.buildMessageBody({
			messageBodyType,
			messageBodyContents
		});
	};

	static buildGetCompletedOrdersMessageBody = (
		{ accountId, count, since }) => {
			const messageBodyType = messageBodyTypes.GET_COMPLETED_ORDERS;
			let messageBodyContents = {
				accountInfo: new AccountInfo({ accountId }) };
			if (!isNil(count)) {
				messageBodyContents.count = count;
			}
			if (!isNil(since)) {
				messageBodyContents.since = since;
			}
			return MessageBodyFactory.buildMessageBody({
				messageBodyType,
				messageBodyContents
			});
	};

	static buildGetExchangePropertiesMessageBody = ({ exchange }) => {
		const messageBodyType = messageBodyTypes.GET_EXCHANGE_PROPERTIES;
		const messageBodyContents = { exchange: exchange };
		return MessageBodyFactory.buildMessageBody({
			messageBodyType,
			messageBodyContents
		});
	}
}

export default MessageBodyFactory;
