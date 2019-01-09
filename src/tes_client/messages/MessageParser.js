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

            default:
                return { message_body_type };
        }
    };

    static parseAccountBalancesReport = ({ message_body_contents }) => {
        const { accountInfo } = message_body_contents;
        const account_info = {
            account_id: accountInfo.accountID,
            exchange: accountInfo.exchange,
            account_type: accountInfo.accountType,
            exchange_account_id: accountInfo.exchangeAccountID,
            exchange_client_id: accountInfo.exchangeClientID
        }
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
            rejectionReason
        } = message_body_contents;
        return {
            order_id: orderID,
            client_order_id: clientOrderID,
            client_order_link_id: clientOrderLinkID,
            exchange_order_id: exchangeOrderID,
            account_info: accountInfo,
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
            rejection_reason: rejectionReason
        };
    };
}

export default MessageParser