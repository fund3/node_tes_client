import * as zmq from "zeromq";

class MessageSocket {
  constructor({ socket_endpoint }) {
    this.socket = zmq.socket("dealer");
    this.socket_endpoint = socket_endpoint;
  }

  connect = () => {
    this.socket.connect(this.socket_endpoint);
  };

  sendSerializedMessage = ({ serialized_message }) => this.socket.send(serialized_message);
}

export default MessageSocket;
