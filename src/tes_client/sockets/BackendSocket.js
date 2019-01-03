import * as zmq from "zeromq";

class BackendSocket {

    constructor({ tes_socket, socket_endpoint }) {
        this.socket_endpoint = socket_endpoint
        this.socket = zmq.socket("router");
        this.socket.on("close_zmq_sockets", () => this.socket.close());
        this.tes_socket = tes_socket
    }

    connect = () => {
        this.socket.on('message', (_, message) => this.tes_socket.sendMessage({ message }))
        this.socket.bindSync(this.socket_endpoint)
    }

    get = () => this.socket

}

export default BackendSocket;