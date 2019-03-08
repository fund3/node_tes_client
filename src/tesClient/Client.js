import RequestHeader from "./requestParams/RequestHeader"
import MessageFactory from "./factories/MessageFactory";
import Messenger from "./messages/Messenger";

import { messageBodyTypes } from "~/tesClient/constants";

class Client {

	constructor({
		clientId,
		senderCompId,
		accountCredentialsList,
		curveServerKey,
		tesSocketEndpoint,
		backendSocketEndpoint
	}) {
		this.messageFactory = new MessageFactory({
			clientId,
			senderCompId,
			accountCredentialsList
		});

		this.messenger = new Messenger({
			curveServerKey,
			tesSocketEndpoint,
			backendSocketEndpoint
		});
	}

	sendHeartbeatMessage = ({ onResponse, requestHeader }) => {
		const heartbeatMessage = this.messageFactory.buildHeartbeatMessage({
			requestHeader
		});
		this.messenger.sendMessage({
			responseMessageBodyType: messageBodyTypes.HEARTBEAT,
			message: heartbeatMessage,
			onResponse
		});
	};

	sendLogonMessage = ({ onResponse }) => {
		const logonMessage = this.messageFactory.buildLogonMessage();
		this.messenger.sendMessage({
			responseMessageBodyType: messageBodyTypes.LOGON_COMPLETE,
			message: logonMessage,
			onResponse
		});
	};

	sendGetAccountBalancesMessage = ({ accountId, onResponse }) => {
		const getAccountBalancesMessage =
			this.messageFactory.buildGetAccountBalancesMessage({
			    accountId
			});
		this.messenger.sendMessage({
			responseMessageBodyType: messageBodyTypes.ACCOUNT_BALANCES_REPORT,
			message: getAccountBalancesMessage,
			onResponse
		});
	};

	sendLogoffMessage = ({ onResponse }) => {
		const logoffMessage = this.messageFactory.buildLogoffMessage();
		this.messenger.sendMessage({
			responseMessageBodyType: messageBodyTypes.LOGOFF_COMPLETE,
			message: logoffMessage,
			onResponse
		});
	};

	sendPlaceOrderMessage = ({
		onResponse,
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
		const placeOrderMessage = this.messageFactory.buildPlaceOrderMessage({
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
		});

		this.messenger.sendMessage({
			responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
			message: placeOrderMessage,
			onResponse
		});
	};

	sendGetOrderStatusMessage = ({ onResponse, accountInfo, orderId }) => {
		const getOrderStatusMessage =
			this.messageFactory.buildGetOrderStatusMessage({
				accountInfo,
				orderId
			});
		this.messenger.sendMessage({
			responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
			message: getOrderStatusMessage,
			onResponse
		});
	};

	sendGetAccountDataMessage = ({ onResponse, accountInfo }) => {
		const getAccountDataMessage =
			this.messageFactory.buildGetAccountDataMessage({accountInfo});
		this.messenger.sendMessage({
			responseMessageBodyType: messageBodyTypes.ACCOUNT_DATA_REPORT,
			message: getAccountDataMessage,
			onResponse: ({ accountInfo, balances, openPositions, orders }) =>
				console.log(accountInfo, balances, openPositions, orders)
		});
	};

	sendGetWorkingOrdersMessage = ({ onResponse, accountId }) => {
		const getWorkingOrdersMessage =
			this.messageFactory.buildGetWorkingOrdersMessage({accountId});
		this.messenger.sendMessage({
			responseMessageBodyType: messageBodyTypes.WORKING_ORDERS_REPORT,
			message: getWorkingOrdersMessage,
			onResponse
		});
	};

	sendCancelOrderMessage = ({ onResponse, accountId, orderId }) => {
		const cancelOrderMessage =
			this.messageFactory.buildCancelOrderMessage({accountId, orderId});
		this.messenger.sendMessage({
			responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
			message: cancelOrderMessage,
			onResponse
		});
	};

	sendGetCompletedOrdersMessage = (
		{ onResponse, accountId, count, since}) => {
			const getCompletedOrdersMessage =
				this.messageFactory.buildGetCompletedOrdersMessage(
					{accountId, count, since});
			this.messenger.sendMessage({
				responseMessageBodyType:
					messageBodyTypes.COMPLETED_ORDERS_REPORT,
				message: getCompletedOrdersMessage,
				onResponse
			});
	};

	sendGetExchangePropertiesMessage = ({ onResponse, exchange }) => {
		const getExchangePropertiesMessage =
			this.messageFactory.buildGetExchangePropertiesMessage({exchange});
		this.messenger.sendMessage({
			responseMessageBodyType:
				messageBodyTypes.EXCHANGE_PROPERTIES_REPORT,
			message: getExchangePropertiesMessage,
			onResponse
		});
	};
}

export default Client;
