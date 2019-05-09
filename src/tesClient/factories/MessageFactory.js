import MessageBodyFactory from "./MessageBodyFactory";
import { messageTypes } from "~/tesClient/constants";

class MessageFactory {

    constructor() {
        this.requestIdPrefix = 0;
        this.requestIdMultiplier = 10000000;
    }

    getRandomInt = ({ max }) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    generateNewRequestId = () => {
        this.requestIdPrefix += 1;
        return this.requestIdPrefix * this.requestIdMultiplier +
            this.getRandomInt({ max: 1000000 });
    };

    buildMessage = ({ requestHeader, messageBody }) => ({
        ...requestHeader,
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

    buildRequestMessage = ({ requestHeader, messageBody }) => {
        requestHeader.requestID = this.generateNewRequestId();
        const message = this.buildMessage({ requestHeader, messageBody});
        return this.buildMessageContainer({ message,
            messageType: messageTypes.REQUEST });
    };

    buildHeartbeatMessage = ({ requestHeader }) => {
        const messageBody = MessageBodyFactory.buildHeartbeatMessageBody();
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildTestMessage = ({ requestHeader, testMessageParams }) => {
        const messageBody = MessageBodyFactory.buildTestMessageBody({
            testMessageParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildGetServerTimeMessage = ({ requestHeader }) => {
        const messageBody = MessageBodyFactory.buildGetServerTimeMessageBody();
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildLogonMessage = ({ requestHeader, logonParams }) => {
        const messageBody = MessageBodyFactory.buildLogonMessageBody({
            logonParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildLogoffMessage = ({ requestHeader }) => {
        const messageBody = MessageBodyFactory.buildLogoffMessageBody();
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildAuthorizationRefreshMessage = ({
        requestHeader,
        authorizationRefreshParams
    }) => {
        const messageBody =
            MessageBodyFactory.buildAuthorizationRefreshMessageBody({
                authorizationRefreshParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildPlaceSingleOrderMessage = ({
        requestHeader,
        placeOrderParams
     }) => {
        const messageBody =
            MessageBodyFactory.buildPlaceSingleOrderMessageBody({
                placeOrderParams
            });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildPlaceContingentOrderMessage = ({
        requestHeader,
        placeContingentOrderParams
    }) => {
        const messageBody =
            MessageBodyFactory.buildPlaceContingentOrderMessageBody({
                placeContingentOrderParams
            });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildReplaceOrderMessage = ({
        requestHeader,
        replaceOrderParams
     }) => {
        const messageBody =
            MessageBodyFactory.buildReplaceOrderMessageBody({
                replaceOrderParams
            });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildCancelOrderMessage = ({ requestHeader, cancelOrderParams }) => {
        const messageBody = MessageBodyFactory.buildCancelOrderMessageBody({
            cancelOrderParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildGetOrderStatusMessage = ({ requestHeader, getOrderStatusParams }) => {
        const messageBody = MessageBodyFactory.buildGetOrderStatusMessageBody({
            getOrderStatusParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildGetAccountDataMessage = ({ requestHeader, getAccountDataParams }) => {
        const messageBody = MessageBodyFactory.buildGetAccountDataMessageBody({
            getAccountDataParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildGetAccountBalancesMessage = ({
        requestHeader,
        getAccountBalancesParams
    }) => {
        const messageBody =
            MessageBodyFactory.buildGetAccountBalancesMessageBody({
                getAccountBalancesParams
            });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildGetOpenPositionsMessage = ({
        requestHeader,
        getOpenPositionsParams
    }) => {
        const messageBody =
            MessageBodyFactory.buildGetOpenPositionsMessageBody({
                getOpenPositionsParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildGetWorkingOrdersMessage = ({
        requestHeader, getWorkingOrdersParams
    }) => {
        const messageBody =
            MessageBodyFactory.buildGetWorkingOrdersMessageBody({
                getWorkingOrdersParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildGetCompletedOrdersMessage = ({
        requestHeader,
        getCompletedOrdersParams
    }) => {
        const messageBody =
            MessageBodyFactory.buildGetCompletedOrdersMessageBody(
            { getCompletedOrdersParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };

    buildGetExchangePropertiesMessage = ({
        requestHeader,
        getExchangePropertiesParams
    }) => {
        const messageBody =
            MessageBodyFactory.buildGetExchangePropertiesMessageBody(
            { getExchangePropertiesParams });
        return this.buildRequestMessage({ requestHeader, messageBody });
    };
}

export default MessageFactory;
