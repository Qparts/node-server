const {
	GET_QUOTATION_CART_URL, ADD_QUOTATION_CART_URL, POST_WIRE_TRANSFER_CART_URL, POST_CREDIT_CARD_CART_URL,
	PUT_PAYMENT_3DSECURE_RESPONSE_URL, GET_BANKS_URL
} = require('../../../constants');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../../apiRequest');
const { customer } = require('../../../../utils');

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

const wireTransfer = (req, res) => {
	const { addressId, cartItems } = req.body;
	const customerId = customer.getCustomerId(req);
	const deliveryCharges = 35;
	const discountId = null;
	const preferredCuorier = null;
	const body = { customerId, addressId, cartItems, deliveryCharges, discountId, preferredCuorier }
	
	apiPostRequest(POST_WIRE_TRANSFER_CART_URL, body, req.session.customer)
		.then(data => {
			if (data.statusCode === 200) {
				res.send(data.body);
			} else {
				res.sendStatus(data.statusCode);
			}
		});
}

const creditCard = (req, res) => {
	const { addressId, cartItems, creditCard } = req.body;
	const customerId = customer.getCustomerId(req);
	const deliveryCharges = 35;
	const discountId = null;
	const preferredCuorier = null;
	const body = { customerId, addressId, cartItems, ...creditCard, deliveryCharges, discountId, preferredCuorier }	

	apiPostRequest(POST_CREDIT_CARD_CART_URL, body, req.session.customer)
		.then(data => {
			if (data.statusCode === 202 || data.statusCode === 201) {
				res.status(data.statusCode).send(data.body);
			} else {
				res.sendStatus(data.statusCode);
			}
		});
}

const paymentResponse = (req, res) => {
	const { cartId, id, status, message } = req.query;
	const customerId = customer.getCustomerId(req);

	apiPutRequest(PUT_PAYMENT_3DSECURE_RESPONSE_URL, { cartId, id, status, customerId }, req.session.customer)
		.then(data => {
			if (data.statusCode !== 201) {
				res.send(data.body);
			} else {
				res.sendStatus(data.statusCode);
			}
		});
}

const getBanks = (req, res) => {
	apiGetRequest(GET_BANKS_URL, req.session.customer)
		.then(data => {
			if (data.statusCode === 200) {
				res.send(data.body);
			} else {
				res.sendStatus(data.statusCode);
			}
		});
}

module.exports = {
	getQuotation,
	addCart,
	getRepliedQuotation,
	wireTransfer,
	creditCard,
	paymentResponse,
	getBanks
}