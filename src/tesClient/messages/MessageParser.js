import { messageBodyTypes } from "~/tesClient/constants";
const capnp = require("capnp");
const msgsCapnp = require("~/CommunicationProtocol/TradeMessage.capnp");
import isNil from 'lodash/isNil'

class MessageParser {

    static parseMessage = ({ message }) => {
        const { messageBodyType, messageBodyContents } =
            MessageParser.parseBinaryMessageBody({ binaryMessage: message });
        const parsedMessageBodyContents =
            MessageParser.parseMessageBodyContents({
                messageBodyType,
                messageBodyContents
            });
        return { messageBodyType, parsedMessageBodyContents }
    }

    static parseBinaryMessageBody = ({ binaryMessage }) => {
        const message = capnp.parse(msgsCapnp.TradeMessage, binaryMessage);
        const messageBody = message.type.response.body;
        const messageBodyType = Object.keys(messageBody)[0];
        const messageBodyContents = messageBody[messageBodyType];
        return { messageBodyType, messageBodyContents };
    }

    static parseMessageBodyContents =
        ({ messageBodyType, messageBodyContents }) => {
            switch (messageBodyType) {
                case messageBodyTypes.LOGON_COMPLETE:
                    return MessageParser.parseLogonComplete(
                        { messageBodyContents });

                case messageBodyTypes.ACCOUNT_BALANCES_REPORT:
                    return MessageParser.parseAccountBalancesReport({
                        messageBodyContents });

                case messageBodyTypes.LOGOFF_COMPLETE:
                    return MessageParser.parseLogoffComplete({
                        messageBodyContents });

                case messageBodyTypes.ACCOUNT_DATA_REPORT:
                    return MessageParser.parseAccountDataReport({
                        messageBodyContents });

                case messageBodyTypes.EXECUTION_REPORT:
                    return MessageParser.parseExecutionReport({
                        messageBodyContents });

                case messageBodyTypes.EXCHANGE_PROPERTIES_REPORT:
                    return MessageParser.parseExchangePropertiesReport({
                        messageBodyContents });

                case messageBodyTypes.COMPLETED_ORDERS_REPORT:
                    return MessageParser.parseCompletedOrdersReport({
                        messageBodyContents });

                case messageBodyTypes.WORKING_ORDERS_REPORT:
                    return MessageParser.parseWorkingOrdersReport({
                        messageBodyContents });

                default:
                    return { messageBodyType };
            }
    };

    static parseAccountBalancesReport = ({ messageBodyContents }) => {
        const { accountInfo } = messageBodyContents;
        const accountInfoFromTes = MessageParser.parseAccountInfo(
            { accountInfoFromTes: accountInfo });
        const balances = messageBodyContents.balances.map(balance => ({
            currency: balance.currency,
            fullBalance: balance.fullBalance,
            availableBalance: balance.availableBalance
        }));
        return { accountInfo: accountInfoFromTes, balances: balances };
    };

    static parseLogonComplete = ({ messageBodyContents }) => {
        const { success, message, clientAccounts } = messageBodyContents;
        return { success, message, clientAccounts: clientAccounts };
    };

    static parseAccountDataReport = ({ messageBodyContents }) => {
        const { accountInfo, balances, openPositions, orders } =
            messageBodyContents;
        return { accountInfo: accountInfo, balances, openPositions, orders };
    };

    static parseLogoffComplete = ({ messageBodyContents }) => {
        const { success, message } = messageBodyContents;
        return { success, message };
    };

    static parseExecutionReport = ({ messageBodyContents }) => {
        const {
            orderID,
            clientOrderID,
            clientOrderLinkID,
            exchangeOrderID,
            accountInfo,
            symbol,
            side,
            orderType,
            quantity,
            price,
            timeInForce,
            leverageType,
            leverage,
            orderStatus,
            filledQuantity,
            avgFillPrice,
            rejectionReason,
            type
        } = messageBodyContents;

        const accountInfoFromTes = MessageParser.parseAccountInfo(
            { accountInfoFromTes: accountInfo });

        return {
            orderId: orderID,
            clientOrderId: clientOrderID,
            clientOrderLinkId: clientOrderLinkID,
            exchangeOrderId: exchangeOrderID,
            accountInfo: accountInfoFromTes,
            symbol,
            side,
            orderType: orderType,
            quantity,
            price,
            timeInForce: timeInForce,
            leverageType: leverageType,
            leverage,
            orderStatus: orderStatus,
            filledQuantity: filledQuantity,
            averageFillPrice: avgFillPrice,
            rejectionReason: rejectionReason,
            type: type
        };
    };

    static parseAccountInfo = ({ accountInfoFromTes }) => {
        const accountInfo = {
            accountId: accountInfoFromTes.accountID,
            exchange: accountInfoFromTes.exchange,
            accountType: accountInfoFromTes.accountType,
            exchangeAccountId: accountInfoFromTes.exchangeAccountID,
            exchangeClientId: accountInfoFromTes.exchangeClientID
        };
        return accountInfo
    }

    static parseExchangePropertiesReport = ({ messageBodyContents }) => {
        const { exchange, currencies } = messageBodyContents;
        const symbolProperties =
            messageBodyContents.symbolProperties.map(propertiesOfSymbol => ({
                symbol: propertiesOfSymbol.symbol,
                pricePrecision: propertiesOfSymbol.pricePrecision,
                quantityPrecision: propertiesOfSymbol.quantityPrecision,
                minQuantity: propertiesOfSymbol.minQuantity,
                maxQuantity: propertiesOfSymbol.maxQuantity,
                marginSupported: propertiesOfSymbol.marginSupported,
                leverage: propertiesOfSymbol.leverage
            }));
        const timeInForces = messageBodyContents.timeInForces;
        const orderTypes = messageBodyContents.orderTypes;

        return {
            exchange,
            currencies,
            symbolProperties,
            timeInForces,
            orderTypes
        }
    }

    static parseCompletedOrdersReport = ({ messageBodyContents }) => {
        const accountInfo = MessageParser.parseAccountInfo({
            accountInfoFromTes: messageBodyContents.accountInfo });
        const orders = messageBodyContents.orders.map(
            order => MessageParser.parseOrder({ order }));
        return {
            accountInfo,
            orders
        }
    }

    static parseWorkingOrdersReport = ({ messageBodyContents }) => {
        const accountInfo = MessageParser.parseAccountInfo({
            accountInfoFromTes: messageBodyContents.accountInfo });
        const orders = messageBodyContents.orders.map(
            order => MessageParser.parseOrder({ order }));
        return {
            accountInfo,
            orders
        }
    }

    static parseOrder = ({ order }) => ({
        orderId: order.orderID,
        clientOrderId: order.clientOrderID,
        clientOrderLinkId: order.clientOrderLinkID,
        exchangeOrderId: order.exchangeOrderID,
        accountInfo: MessageParser.parseAccountInfo({
            accountInfoFromTes: order.accountInfo }),
        symbol: order.symbol,
        side: order.side,
        orderType: order.orderType,
        quantity: order.quantity,
        price: order.price,
        timeInForce: order.timeInForce,
        leverageType: order.leverageType,
        leverage: order.leverage,
        orderStatus: order.orderStatus,
        filledQuantity: order.filledQuantity,
        avgFillPrice: order.avgFillPrice,
        type: {
            statusUpdate: isNil(order.type) ? null : order.type.statusUpdate
        }
    });
}

export default MessageParser;
