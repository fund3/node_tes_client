import MessageBodyFactory from './MessageBodyFactory'
import { message_types } from '~/tes_client/constants'

class MessageFactory {

    constructor({ 
        client_id, 
        sender_comp_id,
        account_credentials
    }) {
        this.client_id = client_id,
        this.sender_comp_id = sender_comp_id,
        this.account_credentials = account_credentials
    }

    buildMessage = ({ message_body }) => ({
        clientID: this.client_id,
        senderCompID: this.sender_comp_id,
        body: message_body
    })

    buildMessageContainer = ({ message, message_type }) => {
        switch(message_type) {
            case message_types.REQUEST:
                return { type: { [message_types.REQUEST]: message } }

            case message_types.RESPONSE:
                return { type: { [message_types.RESPONSE]: message } }

            default: return {}
        }
    }

    buildLogonMessage = () => {
        const { account_credentials } = this
        const message_body = MessageBodyFactory.buildLogonMessageBody({ account_credentials })
        const message = this.buildMessage({ message_body })
        const packaged_message = this.buildMessageContainer({ message, message_type: message_types.REQUEST })
        return packaged_message
    }

    buildHeartbeatMessage = () => {
        const message_body = MessageBodyFactory.buildHeartbeatMessageBody();
        const message = this.buildMessage({ message_body })
        const packaged_message = this.buildMessageContainer({ message, message_type: message_types.REQUEST })
        return packaged_message
    }
}

export default MessageFactory;