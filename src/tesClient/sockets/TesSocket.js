import * as zmq from "zeromq";

class TesSocket {
    
  constructor({curveServerKey, socketEndpoint}) {
    this.socketEndpoint = socketEndpoint;
    this.socket = zmq.socket("dealer");
    this.authenticate({curveServerKey});
    this.socket.on("close_zmq_sockets", () => this.socket.close());
  }

  authenticate = ({ curveServerKey }) => {
    const curveKeypair = zmq.curveKeypair();
    console.log(curveKeypair)
    this.socket.curve_publickey = curveKeypair.public;
    this.socket.curve_secretkey = curveKeypair.secret;
    console.log(curveServerKey)
    this.socket.curve_serverkey = curveServerKey;
  }

  connect = () => {
    this.socket.connect(this.socketEndpoint);
  }

  setOnMessage = ({ onMessage }) => {
    this.socket.on('message', onMessage);
  }

  sendMessage = ({ message }) => this.socket.send(message);

  get = () => this.socket;
}

export default TesSocket;
