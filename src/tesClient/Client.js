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
        tesSocketEndpoint
    }) {
        this.clientId = clientId;
        this.senderCompId = senderCompId;
        this.accountCredentialsList = accountCredentialsList;
        this.accessToken = accessToken;
        this.defaultRequestHeader = new RequestHeader({
            clientId, senderCompId, accessToken
        });
        const backendSocketEndpoint = "inproc://" +
            String(clientId) + senderCompId;
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
        onResponse,
        responseTypeCallback = undefined
    }) => {
        const heartbeatMessage =
            this.messageFactory.buildHeartbeatMessage({
                requestHeader
            });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.HEARTBEAT,
            message: heartbeatMessage,
            onResponse
        });
    };

    sendTestMessage = ({
        requestHeader = this.defaultRequestHeader,
        testMessageParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const testMessage =
            this.messageFactory.buildTestMessage({
                requestHeader,
                testMessageParams
            });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.TEST,
            message: testMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetServerTimeMessage = ({
        requestHeader = this.defaultRequestHeader,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const getServerTimeMessage =
            this.messageFactory.buildGetServerTimeMessage({
                requestHeader
            });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.SERVER_TIME,
            message: getServerTimeMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendLogonMessage = ({
        requestHeader = this.defaultRequestHeader,
        logonParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const logonMessage = this.messageFactory.buildLogonMessage({
            requestHeader, logonParams });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.LOGON_ACK,
            message: logonMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendLogoffMessage = ({
        requestHeader = this.defaultRequestHeader,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const logoffMessage = this.messageFactory.buildLogoffMessage({
            requestHeader
        });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.LOGOFF_ACK,
            message: logoffMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendPlaceSingleOrderMessage = ({
        requestHeader = this.defaultRequestHeader,
        placeOrderParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const placeOrderMessage =
            this.messageFactory.buildPlaceSingleOrderMessage({
                requestHeader, placeOrderParams });

        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: placeOrderMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendReplaceOrderMessage = ({
        requestHeader = this.defaultRequestHeader,
        replaceOrderParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const replaceOrderMessage =
            this.messageFactory.buildReplaceOrderMessage({
                requestHeader, replaceOrderParams });

        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: replaceOrderMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendCancelOrderMessage = ({
        requestHeader = this.defaultRequestHeader,
        cancelOrderParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const cancelOrderMessage =
            this.messageFactory.buildCancelOrderMessage({
                requestHeader, cancelOrderParams});

        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: cancelOrderMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetOrderStatusMessage = ({
        requestHeader = this.defaultRequestHeader,
        getOrderStatusParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const getOrderStatusMessage =
            this.messageFactory.buildGetOrderStatusMessage({
                requestHeader, getOrderStatusParams });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: getOrderStatusMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetAccountDataMessage = ({
        requestHeader = this.defaultRequestHeader,
        getAccountDataParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const getAccountDataMessage =
            this.messageFactory.buildGetAccountDataMessage({
                requestHeader, getAccountDataParams });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.ACCOUNT_DATA_REPORT,
            message: getAccountDataMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetAccountBalancesMessage = ({
        requestHeader = this.defaultRequestHeader,
        getAccountBalancesParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const getAccountBalancesMessage =
            this.messageFactory.buildGetAccountBalancesMessage({
                requestHeader, getAccountBalancesParams});
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType:
                messageBodyTypes.ACCOUNT_BALANCES_REPORT,
            message: getAccountBalancesMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetOpenPositionsMessage = ({
        requestHeader = this.defaultRequestHeader,
        getOpenPositionsParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const getOpenPositionsMessage =
            this.messageFactory.buildGetOpenPositionsMessage({
                requestHeader, getOpenPositionsParams });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.OPEN_POSITIONS_REPORT,
            message: getOpenPositionsMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetWorkingOrdersMessage = ({
        requestHeader = this.defaultRequestHeader,
        getWorkingOrderParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const getWorkingOrdersMessage =
            this.messageFactory.buildGetWorkingOrdersMessage({
                requestHeader, getWorkingOrderParams });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.WORKING_ORDERS_REPORT,
            message: getWorkingOrdersMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetCompletedOrdersMessage = ({
        requestHeader = this.defaultRequestHeader,
        getCompletedOrdersParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
            const getCompletedOrdersMessage =
                this.messageFactory.buildGetCompletedOrdersMessage({
                    requestHeader, getCompletedOrdersParams });
            this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
                responseMessageBodyType:
                    messageBodyTypes.COMPLETED_ORDERS_REPORT,
                message: getCompletedOrdersMessage,
                requestIdCallback,
            responseTypeCallback
            });
    };

    sendGetExchangePropertiesMessage = ({
        requestHeader = this.defaultRequestHeader,
        getExchangePropertiesParams,
        requestIdCallback,
        responseTypeCallback = undefined
    }) => {
        const getExchangePropertiesMessage =
            this.messageFactory.buildGetExchangePropertiesMessage({
                requestHeader,
                getExchangePropertiesParams
            });
        this.messenger.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType:
                messageBodyTypes.EXCHANGE_PROPERTIES_REPORT,
            message: getExchangePropertiesMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };
}

export default Client;