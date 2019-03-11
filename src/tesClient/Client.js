import RequestHeader from "./requestParams/RequestHeader"
import MessageFactory from "./factories/MessageFactory";
import Messenger from "./messages/Messenger";

import { messageBodyTypes } from "~/tesClient/constants";

class Client {

    constructor({
        clientId,
        senderCompId,
        accessToken = undefined,
        accountCredentialsList,
        curveServerKey,
        tesSocketEndpoint,
        backendSocketEndpoint
    }) {
        this.clientId = clientId;
        this.senderCompId = senderCompId;
        this.accountCredentialsList = accountCredentialsList;
        this.accessToken = accessToken;
        this.defaultRequestHeader = new RequestHeader({
            clientId, senderCompId, accessToken
        });

        this.messageFactory = new MessageFactory();

        this.messenger = new Messenger({
            curveServerKey,
            tesSocketEndpoint,
            backendSocketEndpoint
        });
    }

    updateAccessToken = ({ newAccessToken }) => {
        this.accessToken = newAccessToken;
        this.defaultRequestHeader.accessToken = newAccessToken;
    };

    sendHeartbeatMessage = ({
        requestHeader = this.defaultRequestHeader,
        onResponse
    }) => {
        const heartbeatMessage =
            this.messageFactory.buildHeartbeatMessage({
                requestHeader
            });
        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.HEARTBEAT,
            message: heartbeatMessage,
            onResponse
        });
    };

    sendTestMessage = ({
        requestHeader = this.defaultRequestHeader,
        testMessageParams,
        onResponse
    }) => {
        const testMessage =
            this.messageFactory.buildTestMessage({
                requestHeader,
                testMessageParams
            });
        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.TEST,
            message: testMessage,
            onResponse
        });
    };

    sendGetServerTimeMessage = ({
        requestHeader = this.defaultRequestHeader,
        onResponse
    }) => {
        const getServerTimeMessage =
            this.messageFactory.buildGetServerTimeMessage({
                requestHeader
            });
        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.SERVER_TIME,
            message: getServerTimeMessage,
            onResponse
        });
    };

    sendLogonMessage = ({
        requestHeader = this.defaultRequestHeader,
        logonParams,
        onResponse
    }) => {
        const logonMessage = this.messageFactory.buildLogonMessage({
            requestHeader, logonParams });
        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.LOGON_ACK,
            message: logonMessage,
            onResponse
        });
    };

    sendLogoffMessage = ({
        requestHeader = this.defaultRequestHeader,
        onResponse
    }) => {
        const logoffMessage = this.messageFactory.buildLogoffMessage({
            requestHeader
        });
        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.LOGOFF_ACK,
            message: logoffMessage,
            onResponse
        });
    };

    sendPlaceSingleOrderMessage = ({
        requestHeader = this.defaultRequestHeader,
        placeOrderParams,
        onResponse
    }) => {
        const placeOrderMessage =
            this.messageFactory.buildPlaceSingleOrderMessage({
                requestHeader, placeOrderParams });

        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: placeOrderMessage,
            onResponse
        });
    };

    sendReplaceOrderMessage = ({
        requestHeader = this.defaultRequestHeader,
        replaceOrderParams,
        onResponse
    }) => {
        const replaceOrderMessage =
            this.messageFactory.buildReplaceOrderMessage({
                requestHeader, replaceOrderParams });

        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: replaceOrderMessage,
            onResponse
        });
    };

    sendCancelOrderMessage = ({
        requestHeader = this.defaultRequestHeader,
        cancelOrderParams,
        onResponse
    }) => {
        const cancelOrderMessage =
            this.messageFactory.buildCancelOrderMessage({
                requestHeader, cancelOrderParams});

        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: cancelOrderMessage,
            onResponse
        });
    };

    sendGetOrderStatusMessage = ({
        requestHeader = this.defaultRequestHeader,
        getOrderStatusParams,
        onResponse
    }) => {
        const getOrderStatusMessage =
            this.messageFactory.buildGetOrderStatusMessage({
                requestHeader, getOrderStatusParams });
        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: getOrderStatusMessage,
            onResponse
        });
    };

    sendGetAccountDataMessage = ({
        requestHeader = this.defaultRequestHeader,
        getAccountDataParams,
        onResponse
    }) => {
        const getAccountDataMessage =
            this.messageFactory.buildGetAccountDataMessage({
                requestHeader, getAccountDataParams });
        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.ACCOUNT_DATA_REPORT,
            message: getAccountDataMessage,
            onResponse
        });
    };

    sendGetAccountBalancesMessage = ({
        requestHeader = this.defaultRequestHeader,
        getAccountBalancesParams,
        onResponse
    }) => {
        const getAccountBalancesMessage =
            this.messageFactory.buildGetAccountBalancesMessage({
                requestHeader, getAccountBalancesParams});
        this.messenger.sendMessage({
            responseMessageBodyType:
                messageBodyTypes.ACCOUNT_BALANCES_REPORT,
            message: getAccountBalancesMessage,
            onResponse
        });
    };

    sendGetOpenPositionsMessage = ({
        requestHeader = this.defaultRequestHeader,
        getOpenPositionsParams,
        onResponse
    }) => {
        const getOpenPositionsMessage =
            this.messageFactory.buildGetOpenPositionsMessage({
                requestHeader, getOpenPositionsParams });
        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.OPEN_POSITIONS_REPORT,
            message: getOpenPositionsMessage,
            onResponse
        });
    };

    sendGetWorkingOrdersMessage = ({
        requestHeader = this.defaultRequestHeader,
        getWorkingOrderParams,
        onResponse
    }) => {
        const getWorkingOrdersMessage =
            this.messageFactory.buildGetWorkingOrdersMessage({
                requestHeader, getWorkingOrderParams });
        this.messenger.sendMessage({
            responseMessageBodyType: messageBodyTypes.WORKING_ORDERS_REPORT,
            message: getWorkingOrdersMessage,
            onResponse
        });
    };

    sendGetCompletedOrdersMessage = ({
        requestHeader = this.defaultRequestHeader,
        getCompletedOrdersParams,
        onResponse
    }) => {
            const getCompletedOrdersMessage =
                this.messageFactory.buildGetCompletedOrdersMessage({
                    requestHeader, getCompletedOrdersParams });
            this.messenger.sendMessage({
                responseMessageBodyType:
                    messageBodyTypes.COMPLETED_ORDERS_REPORT,
                message: getCompletedOrdersMessage,
                onResponse
            });
    };

    sendGetExchangePropertiesMessage = ({
        requestHeader = this.defaultRequestHeader,
        getExchangePropertiesParams,
        onResponse
    }) => {
        const getExchangePropertiesMessage =
            this.messageFactory.buildGetExchangePropertiesMessage({
                requestHeader,
                getExchangePropertiesParams
            });
        this.messenger.sendMessage({
            responseMessageBodyType:
                messageBodyTypes.EXCHANGE_PROPERTIES_REPORT,
            message: getExchangePropertiesMessage,
            onResponse
        });
    };
}

export default Client;
