import zmq from "zeromq";

class TesSocket {

    public socketEndpoint;
    public socket;
    
  constructor({ curveServerKey, socketEndpoint }) {
    this.socketEndpoint = socketEndpoint;
    this.socket = zmq.socket("dealer");
    this.authenticate({ curveServerKey });
  }

  authenticate = ({ curveServerKey }) => {
    const curveKeypair = zmq.curveKeypair();
    this.socket.curve_publickey = curveKeypair.public;
    this.socket.curve_secretkey = curveKeypair.secret;
    this.socket.curve_serverkey = curveServerKey;
  };

  connect = () => {
    this.socket.connect(this.socketEndpoint);
  };

  setOnMessage = ({ onMessage }) => {
    this.socket.on('message', onMessage);
  };

  sendMessage = ({ message }) => this.socket.send(message);

  get = () => this.socket;

  close = () => this.socket.close();
}

export default TesSocket;
