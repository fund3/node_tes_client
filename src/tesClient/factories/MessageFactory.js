import MessageBodyFactory from "./MessageBodyFactory";
import { messageTypes } from "~/tesClient/constants";

class MessageFactory {
	constructor({ clientId, senderCompID, accountCredentialsList,
				  accessToken }) {
		this.clientId = clientId;
		this.senderCompID = senderCompID;
		this.accountCredentialsList = accountCredentialsList;
		this.accessToken = accessToken;
	}

	updateAccessToken = ({ newAccessToken }) => {
		this.accessToken = newAccessToken;
	};

	buildMessage = ({ messageBody, requestHeader }) => ({
		clientID: requestHeader.clientId === undefined ?
            this.clientId : requestHeader.clientId,
		senderCompID: requestHeader.senderCompId === undefined ?
            this.senderCompId : requestHeader.senderCompId,
		accessToken: requestHeader.accessToken === undefined ?
            this.accessToken : requestHeader.accessToken,
		requestID: requestHeader.requestId,
		body: messageBody
	});

	buildMessageContainer = ({ message, messageType }) => {
		switch (messageType) {
			case messageTypes.REQUEST:
				return { type: { [messageTypes.REQUEST]: message } };

			case messageTypes.RESPONSE:
				return { type: { [messageTypes.RESPONSE]: message } };

			default:
				return {};
		}
	};

	buildRequestMessage = ({ messageBody, requestHeader }) => {
		const message = this.buildMessage({ messageBody, requestHeader });
		return this.buildMessageContainer({ message,
            messageType: messageTypes.REQUEST });
	};

	buildHeartbeatMessage = ({ requestHeader }) => {
		const messageBody = MessageBodyFactory.buildHeartbeatMessageBody();
		return this.buildRequestMessage({ messageBody, requestHeader });
	};

	buildLogonMessage = () => {
		const { accountCredentialsList } = this;
		const messageBody = MessageBodyFactory.buildLogonMessageBody({
            accountCredentialsList });
		return this.buildRequestMessage({ messageBody });
	};

	buildLogoffMessage = () => {
		const messageBody = MessageBodyFactory.buildLogoffMessageBody();
		return this.buildRequestMessage({ messageBody });
	};

	buildGetAccountBalancesMessage = ({ accountId }) => {
		const messageBody =
            MessageBodyFactory.buildGetAccountBalancesMessageBody({
                accountId });
		return this.buildRequestMessage({ messageBody });
	};

	buildPlaceOrderMessage = ({ 
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
		const messageBody =
			MessageBodyFactory.buildPlaceOrderMessageBody({
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
		return this.buildRequestMessage({ messageBody });
	};

	buildGetOrderStatusMessage = ({ accountInfo, orderId }) => {
		const messageBody = MessageBodyFactory.buildGetOrderStatusMessageBody({
			accountInfo,
			orderId
		});
		return this.buildRequestMessage({ messageBody });
	};

	buildGetAccountDataMessage = ({ accountId }) => {
		const messageBody = MessageBodyFactory.buildGetAccountDataMessageBody({
            accountId });
		return this.buildRequestMessage({ messageBody });
	};

	buildGetWorkingOrdersMessage = ({ accountId }) => {
		const messageBody =
            MessageBodyFactory.buildGetWorkingOrdersMessageBody({ accountId });
		return this.buildRequestMessage({ messageBody });
	};

	buildCancelOrderMessage = ({ accountId, orderId }) => {
		const messageBody = MessageBodyFactory.buildCancelOrderMessageBody({
            accountId, orderId });
		return this.buildRequestMessage({ messageBody });
	};

	buildGetCompletedOrdersMessage = ({ accountId, count, since }) => {
		const messageBody =
            MessageBodyFactory.buildGetCompletedOrdersMessageBody(
            { accountId, count, since });
		return this.buildRequestMessage({ messageBody });
	};

	buildGetExchangePropertiesMessage = ({ exchange }) => {
		const messageBody =
            MessageBodyFactory.buildGetExchangePropertiesMessageBody(
            { exchange });
		return this.buildRequestMessage({ messageBody });
	};
}

export default MessageFactory;
