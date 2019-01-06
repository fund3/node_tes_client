import { Observable } from "rxjs";
import { message_body_types } from '~/tes_client/constants'

const capnp = require("capnp");
const msgs_capnp = require("~/CommunicationProtocol/TradeMessage.capnp");

class MessageResponder {

	constructor({ tes_socket }) {
		this.tes_socket = tes_socket
		this.listenForResponses()
	}

	listenForResponses = () => {
		this.message_observer = Observable.create((observer) => {
			this.tes_socket.setOnMessage({
				onMessage: message => {
					const { message_body_type, parsed_message_body_contents } = this.parseMessage({ message });
					observer.next({
						message_body_type,
						parsed_message_body_contents
					});
				}
			});
		})
	}

	subscribeCallbackToResponseType = ({ callback, response_message_body_type }) => {
		this.message_observer.subscribe(({ 
			message_body_type, 
			parsed_message_body_contents 
		}) => {
			if(message_body_type !== response_message_body_type) return;
			callback(parsed_message_body_contents) 
		})
	}

	parseMessage = ({ message }) => {
		const { message_body_type, message_body_contents } = this.parseBinaryMessageBody({ binary_message: message });
		const parsed_message_body_contents = this.parseMessageBodyContents({
			message_body_type,
			message_body_contents
		});
		return { message_body_type, parsed_message_body_contents }
	}

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