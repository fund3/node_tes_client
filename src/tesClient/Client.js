import RequestHeader from "./requestParams/RequestHeader"
import MessageFactory from "./factories/MessageFactory";
import Messenger from "./messages/Messenger";

import { messageBodyTypes } from "./constants/index";
import { validateArguments } from "./utils/errors";

class Client {

    constructor({
        clientId,
        senderCompId,
        accessToken = undefined,
        accountCredentialsList,
        curveServerKey,
        tesSocketEndpoint
    }) {
        validateArguments(clientId, senderCompId, accountCredentialsList);

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
        this.accountDataUpdated = false;
        this.accountDataSystemError = false;
        this.pendingAccountIds = new Set([]);
        this.erroneousAccountIds = new Set([]);
    }

    checkAccountData = (resolve, reject) => {
        if (this.accountDataUpdated) {
            return resolve();
        } else if (this.accountDataSystemError) {
            return reject(this.erroneousAccountIds);
        } else {
            setTimeout(() => this.checkAccountData(resolve, reject), 100);
        }
    };

    ready = async () => new Promise((resolve, reject) => {
        this.checkAccountData(resolve, reject);
    });

    sendMessage = ({
            expectedRequestId,
            responseMessageBodyType,
            message,
            requestIdCallback,
            responseTypeCallback
    }) => {
        this.generateNewRequestId({ message });
        this.messenger.sendMessage({
            expectedRequestId: message.type.request.requestID,
            responseMessageBodyType,
            message,
            requestIdCallback,
            responseTypeCallback
        });
    };

    getRandomInt = ({ max }) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    generateNewRequestId = ({ message }) => {
        const newRequestId = this.getRandomInt({
            max: 1000000000 });
        this.defaultRequestHeader.requestID = newRequestId;
        message.type.request.requestID = newRequestId;
    };

    updateAccessToken = ({ newAccessToken }) => {
        this.accessToken = newAccessToken;
        this.defaultRequestHeader.accessToken = newAccessToken;
    };

    processAccountId = ({ accountId }) => {
        this.pendingAccountIds.delete(accountId);
        if (this.pendingAccountIds.size === 0){
            if (!this.accountDataSystemError) {
                this.accountDataUpdated = true;
            }
            this.messenger.unsubscribeCallbackFromResponseType({
                responseMessageBodyType:
                    messageBodyTypes.ACCOUNT_DATA_REPORT
            });
            this.messenger.unsubscribeCallbackFromResponseType({
                responseMessageBodyType:
                    messageBodyTypes.SYSTEM
            });
        }
    };

    receiveSystemMessage = ( systemMessage ) => {
        this.accountDataSystemError = true;
        const accountId = systemMessage.accountInfo.accountID;
        this.erroneousAccountIds.add(accountId);
        this.processAccountId({ accountId });
    };

    receiveInitialAccountDataReport = ( accountDataReport ) => {
        this.processAccountId({
            accountId: accountDataReport.accountInfo.accountID
        });
    };

    sendHeartbeatMessage = ({
        requestHeader = this.defaultRequestHeader,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const heartbeatMessage =
            this.messageFactory.buildHeartbeatMessage({
                requestHeader
            });
        this.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.HEARTBEAT,
            message: heartbeatMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendTestMessage = ({
        requestHeader = this.defaultRequestHeader,
        testMessageParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const testMessage =
            this.messageFactory.buildTestMessage({
                requestHeader,
                testMessageParams
            });
        this.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.TEST,
            message: testMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetServerTimeMessage = ({
        requestHeader = this.defaultRequestHeader,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getServerTimeMessage =
            this.messageFactory.buildGetServerTimeMessage({
                requestHeader
            });
        this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const logonMessage = this.messageFactory.buildLogonMessage({
            requestHeader, logonParams });
        logonParams.credentials.forEach(
            (accountCredentials) =>
                this.pendingAccountIds.add(
                    accountCredentials.accountInfo.accountID)
        );
        this.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.LOGON_ACK,
            message: logonMessage,
            requestIdCallback: (logonAck) => {
                if (logonAck.success) {
                    this.messenger.subscribeCallbackToResponseType({
                        responseMessageBodyType:
                            messageBodyTypes.ACCOUNT_DATA_REPORT,
                        responseTypeCallback:
                            this.receiveInitialAccountDataReport
                    });
                    this.messenger.subscribeCallbackToResponseType({
                        responseMessageBodyType:
                            messageBodyTypes.SYSTEM,
                        responseTypeCallback:
                            this.receiveSystemMessage
                    })
                }
                const newAccessToken = logonAck &&
                    logonAck.authorizationGrant &&
                    logonAck.authorizationGrant.accessToken;
                if (newAccessToken) {
                    this.updateAccessToken({ newAccessToken });
                }
                requestIdCallback(logonAck);
            },
            responseTypeCallback
        });
    };

    sendLogoffMessage = ({
        requestHeader = this.defaultRequestHeader,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const logoffMessage = this.messageFactory.buildLogoffMessage({
            requestHeader
        });
        this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const placeOrderMessage =
            this.messageFactory.buildPlaceSingleOrderMessage({
                requestHeader, placeOrderParams });

        this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const replaceOrderMessage =
            this.messageFactory.buildReplaceOrderMessage({
                requestHeader, replaceOrderParams });

        this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const cancelOrderMessage =
            this.messageFactory.buildCancelOrderMessage({
                requestHeader, cancelOrderParams});

        this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getOrderStatusMessage =
            this.messageFactory.buildGetOrderStatusMessage({
                requestHeader, getOrderStatusParams });
        this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getAccountDataMessage =
            this.messageFactory.buildGetAccountDataMessage({
                requestHeader, getAccountDataParams });
        this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getAccountBalancesMessage =
            this.messageFactory.buildGetAccountBalancesMessage({
                requestHeader, getAccountBalancesParams});
        this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getOpenPositionsMessage =
            this.messageFactory.buildGetOpenPositionsMessage({
                requestHeader, getOpenPositionsParams });
        this.sendMessage({
            expectedRequestId: requestHeader.requestID,
            responseMessageBodyType: messageBodyTypes.OPEN_POSITIONS_REPORT,
            message: getOpenPositionsMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetWorkingOrdersMessage = ({
        requestHeader = this.defaultRequestHeader,
        getWorkingOrdersParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getWorkingOrdersMessage =
            this.messageFactory.buildGetWorkingOrdersMessage({
                requestHeader, getWorkingOrdersParams });
        this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
            const getCompletedOrdersMessage =
                this.messageFactory.buildGetCompletedOrdersMessage({
                    requestHeader, getCompletedOrdersParams });
            this.sendMessage({
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
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getExchangePropertiesMessage =
            this.messageFactory.buildGetExchangePropertiesMessage({
                requestHeader,
                getExchangePropertiesParams
            });
        this.sendMessage({
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
