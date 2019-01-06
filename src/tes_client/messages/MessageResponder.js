import isNil from 'lodash/isNil'
import { message_body_types } from '~/tes_client/constants'

const capnp = require("capnp");
const msgs_capnp = require("~/CommunicationProtocol/TradeMessage.capnp");

class MessageResponder {
	constructor() {
		this.initializeCallbackQueues();
	}

	initializeCallbackQueues = () => {
		this.callback_queues = {};
		Object.values(message_body_types).forEach(
			message_body_type => (this.callback_queues[message_body_type] = [])
        );
	};

    queueCallbackForResponse = ({ callback, response_message_body_type }) => {
        let callbacks_queue = this.callback_queues[response_message_body_type];
		if (isNil(callbacks_queue)) return;
		callbacks_queue.push(callback);
	};

	runCallbacks = ({ callback_argument, message_body_type }) => {
        let callbacks_queue = this.callback_queues[message_body_type];
        if(isNil(callbacks_queue)) return;
        callbacks_queue.forEach(callback => this.runCallback({ callback, callback_argument }))
	};

	runCallback = async ({ callback, callback_argument }) => {
		return callback(callback_argument);
	};

	handleResponse = ({ message }) => {
        const { message_body_type, message_body_contents } = 
            this.parseBinaryMessageBody({ binary_message: message });
		const parsed_message_body_contents = this.parseMessageBodyContents({
			message_body_type,
			message_body_contents
        });
        this.runCallbacks({ 
            message_body_type,
            callback_argument: parsed_message_body_contents,
         })
	};

	parseBinaryMessageBody = ({ binary_message }) => {
		const message = capnp.parse(msgs_capnp.TradeMessage, binary_message);
		const message_body = message.type.response.body;
		const message_body_type = Object.keys(message_body)[0];
		const message_body_contents = message_body[message_body_type];
		return { message_body_type, message_body_contents };
	};

	parseMessageBodyContents = ({ message_body_type, message_body_contents }) => {
		switch (message_body_type) {
			case message_body_types.LOGON_COMPLETE:
				return this.parseLogonComplete({ message_body_contents });

			case message_body_types.ACCOUNT_BALANCES_REPORT:
				return this.parseAccountBalancesReport({ message_body_contents });

			case message_body_types.LOGOFF_COMPLETE:
				return this.parseLogoffComplete({ message_body_contents });

			case message_body_types.ACCOUNT_DATA_REPORT:
				return this.parseAccountDataReport({ message_body_contents });

			case message_body_types.EXECUTION_REPORT:
				return this.parseExecutionReport({ message_body_contents });

			default:
				return { message_body_type };
		}
	};

	parseAccountBalancesReport = ({ message_body_contents }) => {
		const { accountInfo, balances } = message_body_contents;
		return { account_info: accountInfo, balances };
	};

	parseLogonComplete = ({ message_body_contents }) => {
		const { success, message, clientAccounts } = message_body_contents;
		return { success, message, client_accounts: clientAccounts };
	};

	parseAccountDataReport = ({ message_body_contents }) => {
		const { accountInfo, balances, openPositions, orders } = message_body_contents;
		return { account_info: accountInfo, balances, openPositions, orders };
	};

	parseLogoffComplete = ({ message_body_contents }) => {
		const { success, message } = message_body_contents;
		return { success, message };
	};

	parseExecutionReport = ({ message_body_contents }) => {
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
		};
	};
}

export default MessageResponder;