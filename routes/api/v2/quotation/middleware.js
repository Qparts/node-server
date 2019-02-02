const {
	GET_QUOTATIONS_URL
} = require('../../../constants');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../../apiRequest');
const { getCustomerId } = require('../../../../utils');

const getPendingRequests = (req, res) => {

	const { customerId } = req.params;
	console.log(customerId);
	apiGetRequest(`${GET_QUOTATIONS_URL}/${customerId}/pending`, req.session.customer)
		.then(data => {
			if (data.statusCode === 200) {
				res.send(data.body);
			} else {
				res.send(data.statusCode);
			}
		});
}

const getCompletedRequests = (req, res) => {
	const { customerId } = req.params;
	console.log(customerId);
	apiGetRequest(`${GET_QUOTATIONS_URL}/${customerId}/completed`, req.session.customer)
		.then(data => {
			if (data.statusCode === 200) {
				res.send(data.body);
			} else {
				res.send(data.statusCode);
			}
		});
}

module.exports = {
	getPendingRequests,
	getCompletedRequests
}