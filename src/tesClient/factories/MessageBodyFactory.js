import { messageBodyTypes } from "~/tesClient/constants";

class MessageBodyFactory {
    static buildMessageBody = ({ messageBodyType, messageBodyContents }) => {
        switch (messageBodyType) {
            case messageBodyTypes.HEARTBEAT:
                return { [messageBodyTypes.HEARTBEAT]: "" };

            case messageBodyTypes.LOGOFF:
                return { [messageBodyTypes.LOGOFF]: "" };

            default:
                return { [messageBodyType]: messageBodyContents};
        }
    };

    static buildHeartbeatMessageBody = () => {
        const messageBodyType = messageBodyTypes.HEARTBEAT;
        return MessageBodyFactory.buildMessageBody({ messageBodyType });
    };

    static buildTestMessageBody = ({ testMessageParams }) => {
        const messageBodyType = messageBodyTypes.TEST;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType, messageBodyContents: testMessageParams });
    };

    static buildGetServerTimeMessageBody = () => {
        const messageBodyType = messageBodyTypes.GET_SERVER_TIME;
        return MessageBodyFactory.buildMessageBody({ messageBodyType });
    };

    static buildLogonMessageBody = ({ logonParams }) => {
        const messageBodyType = messageBodyTypes.LOGON;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: logonParams
        });
    };

    static buildLogoffMessageBody = () => {
        const messageBodyType = messageBodyTypes.LOGOFF;
        return MessageBodyFactory.buildMessageBody({ messageBodyType });
    };

    static buildAuthorizationRefreshMessageBody = ({
        authorizationRefreshParams
    }) => {
        const messageBodyType = messageBodyTypes.AUTHORIZATION_REFRESH;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: authorizationRefreshParams
        });
    };

    static buildPlaceSingleOrderMessageBody = ({
        placeOrderParams
     }) => {
        const messageBodyType = messageBodyTypes.PLACE_SINGLE_ORDER;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: placeOrderParams
        });
    };

    static buildPlaceContingentOrderMessageBody = ({
        placeContingentOrderParams
     }) => {
        const messageBodyType = messageBodyTypes.PLACE_CONTINGENT_ORDER;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: placeContingentOrderParams
        });
    };

    static buildReplaceOrderMessageBody = ({
        replaceOrderParams
     }) => {
        const messageBodyType = messageBodyTypes.REPLACE_ORDER;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: replaceOrderParams
        });
    };

    static buildCancelOrderMessageBody = ({ cancelOrderParams }) => {
        const messageBodyType = messageBodyTypes.CANCEL_ORDER;

        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: cancelOrderParams
        });
    };

    static buildGetOrderStatusMessageBody = ({ getOrderStatusParams }) => {
        const messageBodyType = messageBodyTypes.GET_ORDER_STATUS;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: getOrderStatusParams
        });
    };

    static buildGetAccountDataMessageBody = ({ getAccountDataParams }) => {
        const messageBodyType = messageBodyTypes.GET_ACCOUNT_DATA;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: getAccountDataParams
        });
    };

    static buildGetAccountBalancesMessageBody = ({
        getAccountBalancesParams
    }) => {
        const messageBodyType = messageBodyTypes.GET_ACCOUNT_BALANCES;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: getAccountBalancesParams
        });
    };

    static buildGetOpenPositionsMessageBody = ({ getOpenPositionsParams }) => {
        const messageBodyType = messageBodyTypes.GET_OPEN_POSITIONS;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: getOpenPositionsParams
        });
    };

    static buildGetWorkingOrdersMessageBody = ({ getWorkingOrdersParams }) => {
        const messageBodyType = messageBodyTypes.GET_WORKING_ORDERS;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: getWorkingOrdersParams
        });
    };

    static buildGetCompletedOrdersMessageBody = ({
        getCompletedOrdersParams
    }) => {
        const messageBodyType = messageBodyTypes.GET_COMPLETED_ORDERS;

        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: getCompletedOrdersParams
        });
    };

    static buildGetExchangePropertiesMessageBody = ({
        getExchangePropertiesParams
    }) => {
        const messageBodyType = messageBodyTypes.GET_EXCHANGE_PROPERTIES;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: getExchangePropertiesParams
        });
    }
}

export default MessageBodyFactory;
