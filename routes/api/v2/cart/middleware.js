const {
	GET_QUOTATION_CART_URL, ADD_QUOTATION_CART_URL, POST_WIRE_TRANSFER_CART_URL, POST_CREDIT_CARD_CART_URL,
	PUT_PAYMENT_3DSECURE_RESPONSE_URL
} = require('../../../constants');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../../apiRequest');
const { getCustomerId } = require('../../../../utils');

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
	const body = {
		customerId: 4,
		addressId: 1,
		deliveryCharges: 100.50,
		discountId: null,
		preferredCuorier: 0,
		cartItems: [
			{
				productId: 1,
				quantity: 3,
				salesPrice: 300.30
			}
		]
	}

	apiPostRequest(POST_WIRE_TRANSFER_CART_URL, body, req.session.customer)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(500);
			} else {
				res.send(data.body);
			}
		});
}

const creditCard = (req, res) => {
	const body = {
		customerId: 4,
		addressId: 1,
		deliveryCharges: 100.50,
		discountId: null,
		preferredCuorier: 0,
		cartItems: [
			{
				productId: 1,
				quantity: 3,
				salesPrice: 300.30
			}
		],
		ccMonth: 01,
		ccYear: 2021,
		ccName: 'Ahmed S Shaaban',
		ccNumber: '4111111111111111',
		ccCvc: '111',
	}

	apiPostRequest(POST_CREDIT_CARD_CART_URL, body, req.session.customer)
		.then(data => {
			if (data.statusCode !== 201) {
				res.send(data.body);
			} else {
				res.sendStatus(data.statusCode);
			}
		});
}

const paymentResponse = (req, res) => {
	const { cartId, id, status, message } = req.query;
	const customerId = getCustomerId(req);

	apiPutRequest(PUT_PAYMENT_3DSECURE_RESPONSE_URL, { cartId, id, status, customerId }, req.session.customer)
		.then(data => {
			if (data.statusCode !== 201) {
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
	paymentResponse
}