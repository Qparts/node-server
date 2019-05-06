

const WebSocket = require('ws');
const { GET_NOTIFICATION } = require('./constants');



function Client(io) {
    listen();


    function listen() {

        io.on('connection', socket => {
            const { token, id } = socket.request.session.customer;
            const wsClient = new WebSocket(`ws://qtest.fareed9.com:8081/service-q-quotation/ws/notifications/customer/${id}/token/${token}`);

            console.log('a new client is connected');
            

            wsClient.on('message', (message) => {
                console.log(message);

            });

        });

    }


    this.closeConnection = () => {
        // console.log('close Connection');
        // console.log(io);


        // wsClient.on('close', () => {
        //     console.log('closing the connection now');
        //     WebSocket.close();
        // })
    }

}

module.exports = Client;