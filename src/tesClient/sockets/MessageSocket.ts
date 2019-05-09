import * as zmq from "zeromq";

class MessageSocket {

    public socket;
    public socketEndpoint;

  constructor({ socketEndpoint }) {
    this.socket = zmq.socket("dealer");
    this.socketEndpoint = socketEndpoint;
  }

  connect = () => {
    this.socket.connect(this.socketEndpoint);
  };

  sendSerializedMessage = ({ serializedMessage }) =>
      this.socket.send(serializedMessage);

  get = () => this.socket;

  close = () => this.socket.close();
}

export default MessageSocket;
