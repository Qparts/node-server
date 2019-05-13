

const WebSocket = require('ws');
const { GET_COMPLETED_REQUESTS } = require('./constants');
const {
	GET_QUOTATIONS_URL, POST_QUOTATIONS_URL, PUT_QUOTATION_READ_URL, CUSTOMER_NOTIFICATION_WS
} = require('../routes/constants.js');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../routes/api/apiRequest.js');



function Client(io) {
	listen();


	function listen() {

		io.on('connection', socket => {
			const { token, id } = socket.request.session.customer;
			const wsClient = new WebSocket(`${CUSTOMER_NOTIFICATION_WS}/${id}/token/${token}`);
			console.log('a new client is connected');


			wsClient.on('message', quotationComplete => {
				apiGetRequest(`${GET_QUOTATIONS_URL}/${id}/completed`, socket.request.session.customer)
					.then(data => {
						if (data.statusCode === 200) {
							const json = JSON.parse(data.body);
							socket.emit(GET_COMPLETED_REQUESTS, json);

						} else {
							socket.emit(GET_COMPLETED_REQUESTS, data.statusCode);
						}
					});
			});

			socket.on('disconnect', () => {
				console.log('close connection');
			});

		});

	}


	this.closeConnection = () => {
		io.close();
	};

}

module.exports = Client;