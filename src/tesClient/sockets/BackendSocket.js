import * as zmq from "zeromq";

class BackendSocket {

  constructor({tesSocket, socketEndpoint}) {
    this.socketEndpoint = socketEndpoint;
    this.socket = zmq.socket("router");
    this.socket.on("close_zmq_sockets", () => this.socket.close());
    this.tesSocket = tesSocket;
  }

  connect = () => {
    this.socket.on('message', (_, message) =>
        this.tesSocket.sendMessage({ message }));
    this.socket.bindSync(this.socketEndpoint);
  }

  get = () => this.socket;
}

export default BackendSocket;
