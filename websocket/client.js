

const WebSocket = require('ws');
const { GET_NOTIFICATION } = require('./constants');



function Client(io) {
    listen();


    function listen() {

        io.on('connection', socket => {
            const { token, id } = socket.request.session.customer;
            
            console.log('connected a new client');
            // const wsClient = new WebSocket(`ws://qtest.fareed9.com:8081/service-q-quotation/ws/notifications/customer/${id}/token/${token}`);

            socket.emit(GET_NOTIFICATION, 'you have one notification');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            // wsClient.on('message', (message) => {
            //     console.log(message);

            // });

        });

        // console.log(io.listeners('connection'));
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