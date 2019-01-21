import { message_body_types } from "~/tes_client/constants";
const capnp = require("capnp");
const msgs_capnp = require("~/CommunicationProtocol/TradeMessage.capnp");

class MessageParser {

    static parseMessage = ({ message }) => {
        const { message_body_type, message_body_contents } = MessageParser.parseBinaryMessageBody({ binary_message: message });
        const parsed_message_body_contents = MessageParser.parseMessageBodyContents({
            message_body_type,
            message_body_contents
        });
        return { message_body_type, parsed_message_body_contents }
    }

    static parseBinaryMessageBody = ({ binary_message }) => {
        const message = capnp.parse(msgs_capnp.TradeMessage, binary_message);
        const message_body = message.type.response.body;
        const message_body_type = Object.keys(message_body)[0];
        const message_body_contents = message_body[message_body_type];
        return { message_body_type, message_body_contents };
    };

    static parseMessageBodyContents = ({ message_body_type, message_body_contents }) => {
        switch (message_body_type) {
            case message_body_types.LOGON_COMPLETE:
                return MessageParser.parseLogonComplete({ message_body_contents });

            case message_body_types.ACCOUNT_BALANCES_REPORT:
                return MessageParser.parseAccountBalancesReport({ message_body_contents });

            case message_body_types.LOGOFF_COMPLETE:
                return MessageParser.parseLogoffComplete({ message_body_contents });

            case message_body_types.ACCOUNT_DATA_REPORT:
                return MessageParser.parseAccountDataReport({ message_body_contents });

            case message_body_types.EXECUTION_REPORT:
                return MessageParser.parseExecutionReport({ message_body_contents });

            case message_body_types.EXCHANGE_PROPERTIES_REPORT:
                return MessageParser.parseExchangePropertiesReport({ message_body_contents })

            case message_body_types.COMPLETED_ORDERS_REPORT:
                return MessageParser.parseCompletedOrdersReport({ message_body_contents })

            case message_body_types.WORKING_ORDERS_REPORT:
                return MessageParser.parseWorkingOrdersReport({ message_body_contents })

            default:
                return { message_body_type };
        }
    };

    static parseAccountBalancesReport = ({ message_body_contents }) => {
        const { accountInfo } = message_body_contents;
        const account_info = MessageParser.parseAccountInfo({ account_info_from_tes: accountInfo })
        const balances = message_body_contents.balances.map(balance => ({
            currency: balance.currency,
            full_balance: balance.fullBalance,
            available_balance: balance.availableBalance
        }));
        return { account_info, balances };
    };

    static parseLogonComplete = ({ message_body_contents }) => {
        const { success, message, clientAccounts } = message_body_contents;
        return { success, message, client_accounts: clientAccounts };
    };

    static parseAccountDataReport = ({ message_body_contents }) => {
        const { accountInfo, balances, openPositions, orders } = message_body_contents;
        return { account_info: accountInfo, balances, openPositions, orders };
    };

    static parseLogoffComplete = ({ message_body_contents }) => {
        const { success, message } = message_body_contents;
        return { success, message };
    };

    static parseExecutionReport = ({ message_body_contents }) => {
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
        } = message_body_contents;

        const account_info = MessageParser.parseAccountInfo({ account_info_from_tes: accountInfo })

        return {
            order_id: orderID,
            client_order_id: clientOrderID,
            client_order_link_id: clientOrderLinkID,
            exchange_order_id: exchangeOrderID,
            account_info,
            symbol,
            side,
            order_type: orderType,
            quantity,
            price,
            time_in_force: timeInForce,
            leverage_type: leverageType,
            leverage,
            order_status: orderStatus,
            filled_quantity: filledQuantity,
            average_fill_price: avgFillPrice,
            rejection_reason: rejectionReason,
            type: type
        };
    };

    static parseAccountInfo = ({ account_info_from_tes }) => {
        const account_info = {
            account_id: account_info_from_tes.accountID,
            exchange: account_info_from_tes.exchange,
            account_type: account_info_from_tes.accountType,
            exchange_account_id: account_info_from_tes.exchangeAccountID,
            exchange_client_id: account_info_from_tes.exchangeClientID
        }
        return account_info
    }

    static parseExchangePropertiesReport = ({ message_body_contents }) => {
        const { exchange, currencies } = message_body_contents
        const symbol_properties = message_body_contents.symbolProperties.map(properties_of_symbol => ({
            symbol: properties_of_symbol.symbol,
            price_precision: properties_of_symbol.pricePrecision,
            quantity_precision: properties_of_symbol.quantityPrecision,
            min_quantity: properties_of_symbol.minQuantity,
            max_quantity: properties_of_symbol.maxQuantity,
            margin_supported: properties_of_symbol.marginSupported,
            leverage: properties_of_symbol.leverage
        }))
        const time_in_forces = message_body_contents.timeInForces
        const order_types = message_body_contents.orderTypes

        return {
            exchange,
            currencies,
            symbol_properties,
            time_in_forces,
            order_types
        }
    }

    static parseCompletedOrdersReport = ({ message_body_contents }) => {
        const account_info = MessageParser.parseAccountInfo({ account_info_from_tes: message_body_contents.accountInfo })
        const orders = message_body_contents.orders.map(order => ({
            order_id: order.orderID,
            client_order_id: order.clientOrderID,
            client_order_link_id: order.clientOrderLinkID,
            exchange_order_id: order.exchangeOrderID,
            account_info: MessageParser.parseAccountInfo({ account_info_from_tes: order.accountInfo }),
            symbol: order.symbol,
            side: order.side,
            order_type: order.orderType,
            quantity: order.quantity,
            price: order.price,
            time_in_force: order.timeInForce,
            leverage_type: order.leverageType,
            leverage: order.leverage,
            order_status: order.orderStatus,
            filled_quantity: order.filledQuantity,
            avg_fill_price: order.avgFillPrice,
            // type: type
        }))

        return {
            account_info,
            orders
        }
    }

    static parseWorkingOrdersReport = ({ message_body_contents }) => {
        const account_info = MessageParser.parseAccountInfo({ account_info_from_tes: message_body_contents.accountInfo })
        const orders = message_body_contents.orders.map(order => ({
            order_id: order.orderID,
            client_order_id: order.clientOrderID,
            client_order_link_id: order.clientOrderLinkID,
            exchange_order_id: order.exchangeOrderID,
            account_info: MessageParser.parseAccountInfo({ account_info_from_tes: order.accountInfo }),
            symbol: order.symbol,
            side: order.side,
            order_type: order.orderType,
            quantity: order.quantity,
            price: order.price,
            time_in_force: order.timeInForce,
            leverage_type: order.leverageType,
            leverage: order.leverage,
            order_status: order.orderStatus,
            filled_quantity: order.filledQuantity,
            avg_fill_price: order.avgFillPrice,
            // type: type
        }))

        return {
            account_info,
            orders
        }
    }
}

export default MessageParser