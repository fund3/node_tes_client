import * as zmq from "zeromq";

class MessageSocket {
    
    constructor({ socket_endpoint }) {
        this.socket = zmq.socket("dealer");
        this.socket_endpoint = socket_endpoint
    }

    activate = () => this.socket.connect(this.socket_endpoint)

    sendMessage = ({ message }) => this.socket.send(message)
}

export default MessageSocket