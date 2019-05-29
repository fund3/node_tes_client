import AuthorizationRefreshParams from "./requestParams/AuthorizationRefreshParams";
import RequestHeader from "./requestParams/RequestHeader";
import MessageFactory from "./factories/MessageFactory";
import Messenger from "./messages/Messenger";
import { messageBodyTypes } from "~/tesClient/constants";


class Client {

    constructor({
        clientId,
        senderCompId,
        accountCredentialsList,
        curveServerKey,
        tesSocketEndpoint
    }) {
        this.clientId = clientId;
        this.senderCompId = senderCompId;
        this.accountCredentialsList = accountCredentialsList;
        this.accessToken = undefined;
        this.refreshToken = undefined;
        this.defaultRequestHeader = new RequestHeader({
            clientId, senderCompId
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
            return reject({
                errorMessage: "Error occurred on some exchange accounts.",
                erroneousAccountIds: this.erroneousAccountIds
            });
        } else {
            setTimeout(() => this.checkAccountData(resolve, reject), 100);
        }
    };

    sendMessage = ({
            expectedRequestId,
            responseMessageBodyType,
            message,
            requestIdCallback,
            responseTypeCallback
    }) => {
        this.messenger.sendMessage({
            expectedRequestId,
            responseMessageBodyType,
            message,
            requestIdCallback,
            responseTypeCallback
        });
    };

    updateAccessToken = ({ newAccessToken }) => {
        this.accessToken = newAccessToken;
        this.defaultRequestHeader.accessToken = newAccessToken;
    };

    internalAuthorizationGrantCallback = (authorizationGrant) => {
        if (authorizationGrant) {
            if (authorizationGrant.success) {
                this.updateAuthorization({ authorizationGrant });
            } else {
                this.scheduleAuthorizationRefresh({ delayInSeconds: 60000 })
            }
        }
    };

    refreshAuthorization = () => {
        this.sendAuthorizationRefreshMessage({
            authorizationRefreshParams: new AuthorizationRefreshParams({
                refreshToken: this.refreshToken
            }),
            requestIdCallback: this.internalAuthorizationGrantCallback
        })
    };

    scheduleAuthorizationRefresh = ({ delayInSeconds }) => {
        setTimeout(this.refreshAuthorization, delayInSeconds);
    };

    updateAuthorization = ({ authorizationGrant }) => {
        this.refreshToken = authorizationGrant.refreshToken;
        this.updateAccessToken({ newAccessToken:
            authorizationGrant.accessToken});
        this.scheduleAuthorizationRefresh({
            delayInSeconds:
                (authorizationGrant.expireAt - Date.now()/1000 - 30) * 1000
        });
    };

    processAccountId = ({ accountId }) => {
        this.pendingAccountIds.delete(accountId);
        if (this.pendingAccountIds.size === 0){
            if (!this.accountDataSystemError) {
                this.accountDataUpdated = true;
            }
            this.messenger.unsubscribeCallbackFromResponseType({
                responseMessageBodyType: messageBodyTypes.ACCOUNT_DATA_REPORT
            });
            this.messenger.unsubscribeCallbackFromResponseType({
                responseMessageBodyType: messageBodyTypes.SYSTEM
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

    ready = async () => new Promise((resolve, reject) => {
        this.checkAccountData(resolve, reject);
    });

    close = () => {
        this.messenger.cleanup();
    };

    subscribeCallbackToResponseType = ({
        responseMessageBodyType,
        responseTypeCallback
    }) => {
        this.messenger.subscribeCallbackToResponseType({
            responseMessageBodyType,
            responseTypeCallback
        })
    };

    unsubscribeCallbackFromResponseType = ({ responseMessageBodyType }) => {
        this.messenger.unsubscribeCallbackFromResponseType({
            responseMessageBodyType
        });
    };

    sendHeartbeatMessage = ({
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const heartbeatMessage =
            this.messageFactory.buildHeartbeatMessage({
                requestHeader: this.defaultRequestHeader
            });
        this.sendMessage({
            expectedRequestId: heartbeatMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.HEARTBEAT,
            message: heartbeatMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendTestMessage = ({
        testMessageParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const testMessage =
            this.messageFactory.buildTestMessage({
                requestHeader: this.defaultRequestHeader,
                testMessageParams
            });
        this.sendMessage({
            expectedRequestId: testMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.TEST,
            message: testMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetServerTimeMessage = ({
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getServerTimeMessage =
            this.messageFactory.buildGetServerTimeMessage({
                requestHeader: this.defaultRequestHeader
            });
        this.sendMessage({
            expectedRequestId: getServerTimeMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.SERVER_TIME,
            message: getServerTimeMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    subscribeLogonCallbacks = () => {
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
        });
        // If there is no subscriber to the observable, it seems
        // like a subscription will be automatically added to the
        // observable if a message is sent from .  Eventually
        // there will be a leak since too many eventlisteners are
        // subscribed.  This is a hack to subscribe a subscription
        // that listens to non-existent "null" messageTypes so that
        // at any given time there will only be one extra
        // subscription.
        this.messenger.subscribePlaceholderCallback();
    };

    internalLogonAckCallback = ({ logonAck }) => {
        if (logonAck && logonAck.success) {
            this.subscribeLogonCallbacks();
            if (logonAck.authorizationGrant) {
                this.internalAuthorizationGrantCallback(
                    logonAck.authorizationGrant);
            }
        }
    };

    sendLogonMessage = ({
        logonParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const logonMessage = this.messageFactory.buildLogonMessage({
            requestHeader: this.defaultRequestHeader, logonParams });
        logonParams.credentials.forEach(
            (accountCredentials) =>
                this.pendingAccountIds.add(
                    accountCredentials.accountInfo.accountID)
        );
        this.sendMessage({
            expectedRequestId: logonMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.LOGON_ACK,
            message: logonMessage,
            requestIdCallback: (logonAck) => {
                this.internalLogonAckCallback({ logonAck });
                requestIdCallback(logonAck);
            },
            responseTypeCallback
        });
    };

    sendLogoffMessage = ({
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const logoffMessage = this.messageFactory.buildLogoffMessage({
            requestHeader: this.defaultRequestHeader
        });
        this.sendMessage({
            expectedRequestId: logoffMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.LOGOFF_ACK,
            message: logoffMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendAuthorizationRefreshMessage = ({
        authorizationRefreshParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const authorizationRefreshMessage =
            this.messageFactory.buildAuthorizationRefreshMessage({
                requestHeader: this.defaultRequestHeader,
                authorizationRefreshParams
            });
        this.sendMessage({
            expectedRequestId:
                authorizationRefreshMessage.type.request.requestID,
            responseMessageBodyType:
                messageBodyTypes.AUTHORIZATION_GRANT,
            message: authorizationRefreshMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendPlaceSingleOrderMessage = ({
        placeOrderParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const placeOrderMessage =
            this.messageFactory.buildPlaceSingleOrderMessage({
                requestHeader: this.defaultRequestHeader, placeOrderParams });

        this.sendMessage({
            expectedRequestId: placeOrderMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: placeOrderMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendPlaceContingentOrderMessage = ({
        placeContingentOrderParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const placeContingentOrderMessage =
            this.messageFactory.buildPlaceContingentOrderMessage({
                requestHeader: this.defaultRequestHeader,
                placeContingentOrderParams
            });

        this.sendMessage({
            expectedRequestId:
                placeContingentOrderMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: placeContingentOrderMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendReplaceOrderMessage = ({
        replaceOrderParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const replaceOrderMessage =
            this.messageFactory.buildReplaceOrderMessage({
                requestHeader: this.defaultRequestHeader, replaceOrderParams });

        this.sendMessage({
            expectedRequestId: replaceOrderMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: replaceOrderMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendCancelOrderMessage = ({
        cancelOrderParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const cancelOrderMessage =
            this.messageFactory.buildCancelOrderMessage({
                requestHeader: this.defaultRequestHeader, cancelOrderParams});

        this.sendMessage({
            expectedRequestId: cancelOrderMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: cancelOrderMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetOrderStatusMessage = ({
        getOrderStatusParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getOrderStatusMessage =
            this.messageFactory.buildGetOrderStatusMessage({
                requestHeader: this.defaultRequestHeader,
                getOrderStatusParams
            });
        this.sendMessage({
            expectedRequestId: getOrderStatusMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.EXECUTION_REPORT,
            message: getOrderStatusMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetAccountDataMessage = ({
        getAccountDataParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getAccountDataMessage =
            this.messageFactory.buildGetAccountDataMessage({
                requestHeader: this.defaultRequestHeader,
                getAccountDataParams
            });
        this.sendMessage({
            expectedRequestId: getAccountDataMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.ACCOUNT_DATA_REPORT,
            message: getAccountDataMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetAccountBalancesMessage = ({
        getAccountBalancesParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getAccountBalancesMessage =
            this.messageFactory.buildGetAccountBalancesMessage({
                requestHeader: this.defaultRequestHeader,
                getAccountBalancesParams
            });
        this.sendMessage({
            expectedRequestId: getAccountBalancesMessage.type.request.requestID,
            responseMessageBodyType:
                messageBodyTypes.ACCOUNT_BALANCES_REPORT,
            message: getAccountBalancesMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetOpenPositionsMessage = ({
        getOpenPositionsParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getOpenPositionsMessage =
            this.messageFactory.buildGetOpenPositionsMessage({
                requestHeader: this.defaultRequestHeader,
                getOpenPositionsParams
            });
        this.sendMessage({
            expectedRequestId: getOpenPositionsMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.OPEN_POSITIONS_REPORT,
            message: getOpenPositionsMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetWorkingOrdersMessage = ({
        getWorkingOrdersParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getWorkingOrdersMessage =
            this.messageFactory.buildGetWorkingOrdersMessage({
                requestHeader: this.defaultRequestHeader,
                getWorkingOrdersParams
            });
        this.sendMessage({
            expectedRequestId: getWorkingOrdersMessage.type.request.requestID,
            responseMessageBodyType: messageBodyTypes.WORKING_ORDERS_REPORT,
            message: getWorkingOrdersMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetCompletedOrdersMessage = ({
        getCompletedOrdersParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getCompletedOrdersMessage =
            this.messageFactory.buildGetCompletedOrdersMessage({
                requestHeader: this.defaultRequestHeader,
                getCompletedOrdersParams
            });
        this.sendMessage({
            expectedRequestId:
                getCompletedOrdersMessage.type.request.requestID,
            responseMessageBodyType:
                messageBodyTypes.COMPLETED_ORDERS_REPORT,
            message: getCompletedOrdersMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };

    sendGetExchangePropertiesMessage = ({
        getExchangePropertiesParams,
        requestIdCallback = undefined,
        responseTypeCallback = undefined
    }) => {
        const getExchangePropertiesMessage =
            this.messageFactory.buildGetExchangePropertiesMessage({
                requestHeader: this.defaultRequestHeader,
                getExchangePropertiesParams
            });
        this.sendMessage({
            expectedRequestId:
                getExchangePropertiesMessage.type.request.requestID,
            responseMessageBodyType:
                messageBodyTypes.EXCHANGE_PROPERTIES_REPORT,
            message: getExchangePropertiesMessage,
            requestIdCallback,
            responseTypeCallback
        });
    };
}

export default Client;
