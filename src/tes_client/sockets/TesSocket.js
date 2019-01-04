import * as zmq from "zeromq";

class TesSocket {
    
  constructor({curve_server_key, socket_endpoint}) {
    this.socket_endpoint = socket_endpoint;
    this.socket = zmq.socket("dealer");
    this.authenticate({curve_server_key});
    this.socket.on("close_zmq_sockets", () => this.socket.close());
  }

  authenticate = ({curve_server_key}) => {
    const curve_keypair = zmq.curveKeypair();
    this.socket.curve_publickey = curve_keypair.public;
    this.socket.curve_secretkey = curve_keypair.secret;
    this.socket.curve_serverkey = curve_server_key;
  }

  connect = () => {
    this.socket.connect(this.socket_endpoint);
  }

  setOnMessage = ({onMessage}) => {
    this.socket.on('message', onMessage);
  }

  sendMessage = ({ message }) => this.socket.send(message);

  get = () => this.socket;
}

export default TesSocket;
