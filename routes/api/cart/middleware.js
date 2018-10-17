const { GET_QUOTATION_CART_URL, ADD_QUOTATION_CART_URL } = require('../../constants');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../apiRequest');

const getQuotation = (req, res) => {
	const { customerId } = req.params;
	apiGetRequest(`${GET_QUOTATION_CART_URL}/${customerId}`, req.session.customer)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(500);
			} else {
				res.send(data.body);
			}
		});
}

const getRepliedQuotation = (req, res) => {
	const { customerId } = req.params;
	apiGetRequest(`${GET_QUOTATION_CART_URL}/${customerId}/submitted`, req.session.customer)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(500);
			} else {
				res.send(data.body);
			}
		});
}

const addCart = (req, res) => {
	apiPostRequest(ADD_QUOTATION_CART_URL, req.body, req.session.customer)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(500);
			} else {
				res.send(data.body);
			}
		});
}

module.exports = {
	getQuotation,
	addCart,
	getRepliedQuotation
}