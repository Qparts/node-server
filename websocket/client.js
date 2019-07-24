const WebSocket = require('ws');
const { GET_COMPLETED_REQUESTS, QUOTATION_COMPLETED } = require('./constants');
const {
	GET_QUOTATIONS_URL,
	PUT_QUOTATION_READ_URL,
	CUSTOMER_NOTIFICATION_WS,
	CUSTOMER_PUSH_NOTIFICATION_WS
} = require('../routes/constants.js');
const {
	apiGetRequest,
	apiPostRequest,
	apiPutRequest
} = require('../routes/api/apiRequest.js');

function Client(io) {
	listen();

	function listen() {
		io.on('connection', socket => {
			if (!socket.request.session.customer) {
				return socket.disconnect();
			}

			const { token, id, subscription } = socket.request.session.customer;
			const { webpush } = require('../server');
			const wsNotificationClient = new WebSocket(
				`${CUSTOMER_NOTIFICATION_WS}/${id}/token/${token}`
			);
			const wsPushClient = new WebSocket(
				`${CUSTOMER_PUSH_NOTIFICATION_WS}/${id}/token/${token}`
			);
			console.log('a new client is connected');

			wsNotificationClient.on('message', () => {
				apiGetRequest(
					`${GET_QUOTATIONS_URL}/${id}/completed`,
					socket.request.session.customer
				).then(data => {
					if (data.statusCode === 200) {
						const json = JSON.parse(data.body);
						socket.emit(GET_COMPLETED_REQUESTS, json);
					} else {
						socket.emit(GET_COMPLETED_REQUESTS, data.statusCode);
					}
				});
			});

			if (subscription) {
				wsPushClient.on('message', quotationComplete => {
					const json = JSON.parse(quotationComplete);

					const data = {
						...json,
						body: json.url,
						title: json.title
					};

					webpush
						.sendNotification(subscription, JSON.stringify(data))
						.catch(err => {
							console.error(err.stack);
						});
				});
			}

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
