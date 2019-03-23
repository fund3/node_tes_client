import { messageBodyTypes } from "../constants/index";

class MessageBodyFactory {
    static buildMessageBody = ({ messageBodyType, messageBodyContents }) => {
        switch (messageBodyType) {
            case messageBodyTypes.HEARTBEAT:
                return { [messageBodyTypes.HEARTBEAT]: "" };

            case messageBodyTypes.TEST:
                return { [messageBodyTypes.TEST]: messageBodyContents };

            case messageBodyTypes.GET_SERVER_TIME:
                return { [messageBodyTypes.GET_SERVER_TIME]:
                    messageBodyContents};

            case messageBodyTypes.LOGON:
                return { [messageBodyTypes.LOGON]: messageBodyContents};

            case messageBodyTypes.LOGOFF:
                return { [messageBodyTypes.LOGOFF]: "" };

            case messageBodyTypes.AUTHORIZATION_REFRESH:
                return { [messageBodyTypes.AUTHORIZATION_REFRESH]:
                    messageBodyContents};

            case messageBodyTypes.PLACE_SINGLE_ORDER:
                return { [messageBodyTypes.PLACE_SINGLE_ORDER]:
                    messageBodyContents };

            case messageBodyTypes.REPLACE_ORDER:
                return { [messageBodyTypes.REPLACE_ORDER]:
                    messageBodyContents };

            case messageBodyTypes.CANCEL_ORDER:
                return { [messageBodyTypes.CANCEL_ORDER]:
                    messageBodyContents };

            case messageBodyTypes.GET_ORDER_STATUS:
                return { [messageBodyTypes.GET_ORDER_STATUS]:
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

    static buildPlaceSingleOrderMessageBody = ({
        placeOrderParams
     }) => {
        const messageBodyType = messageBodyTypes.PLACE_SINGLE_ORDER;
        return MessageBodyFactory.buildMessageBody({
            messageBodyType,
            messageBodyContents: placeOrderParams
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
