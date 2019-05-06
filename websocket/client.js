

const WebSocket = require('ws');
const { GET_NOTIFICATION } = require('./constants');
const {
    GET_QUOTATIONS_URL, POST_QUOTATIONS_URL, PUT_QUOTATION_READ_URL
} = require('../routes/constants.js');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../routes/api/apiRequest.js');



function Client(io) {
    listen();


    function listen() {

        io.on('connection', socket => {
            const { token, id } = socket.request.session.customer;
            const wsClient = new WebSocket(`ws://qtest.fareed9.com:8081/service-q-quotation/ws/notifications/customer/${id}/token/${token}`);
            console.log('a new client is connected');


            wsClient.on('message', quotationComplete => {
                console.log(quotationComplete);

                apiGetRequest(`${GET_QUOTATIONS_URL}/${id}/completed`, req.session.customer)
                    .then(data => {
                        if (data.statusCode === 200) {
                            console.log(data.body);

                        } else {
                            console.log(data.statusCode);
                        }
                    });
            });

            socket.on('close', () => {
                wsClient.close();
            })

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