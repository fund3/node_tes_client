import MessageBodyFactory from './MessageBodyFactory'
import {message_types} from '~/tes_client/constants'

class MessageFactory {

  constructor({
    account_id,
    client_id,
    sender_comp_id,
    account_credentials_list
  }) {
    this.account_id = account_id;
    this.client_id = client_id;
    this.sender_comp_id = sender_comp_id;
    this.account_credentials_list = account_credentials_list;
  }

  buildMessage = ({message_body}) => ({
    clientID: this.client_id,
    senderCompID: this.sender_comp_id,
    body: message_body
  });

  buildMessageContainer = ({message, message_type}) => {
    switch(message_type) {
      case message_types.REQUEST:
        return {type: {[message_types.REQUEST]: message}};

      case message_types.RESPONSE:
        return {type: {[message_types.RESPONSE]: message}};

      default: return {};
    }
  };

  buildRequestMessage = ({message_body}) => {
    const message = this.buildMessage({message_body});
    return this.buildMessageContainer({message,
        message_type: message_types.REQUEST});
  };

  buildLogonMessage = () => {
    const {account_credentials} = this;
    const message_body = MessageBodyFactory.buildLogonMessageBody({account_credentials});
    return this.buildRequestMessage({message_body});
  };

  buildLogoffMessage = () => {
    const message_body = MessageBodyFactory.buildLogoffMessageBody();
    return this.buildRequestMessage({message_body});
  };

  buildHeartbeatMessage = () => {
    const message_body = MessageBodyFactory.buildHeartbeatMessageBody();
    return this.buildRequestMessage({message_body});
  };

  buildGetAccountBalancesMessage = () => {
    const {account_id} = this;
    const message_body = MessageBodyFactory.buildGetAccountBalancesMessageBody({account_id});
    return this.buildRequestMessage({message_body});
  };

  buildPlaceOrderMessage = ({placeOrderArguments}) => {
    const message_body = MessageBodyFactory.buildPlaceOrderMessageBody({placeOrderArguments});
    return this.buildRequestMessage({message_body});
  };

  buildGetOrderStatusMessage = ({accountInfo, orderId}) => {
    const message_body = MessageBodyFactory.buildGetOrderStatusMessageBody({accountInfo, orderId});
    return this.buildRequestMessage({message_body});
  };

  buildGetAccountDataMessage = () => {
    const {account_id} = this;
    const message_body = MessageBodyFactory.buildGetAccountDataMessageBody({account_id});
    return this.buildRequestMessage({message_body});
  };
}

export default MessageFactory;
