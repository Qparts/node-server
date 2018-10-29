const { GET_PRODUCTS_BEST_SELLERS, GET_PRODUCTS_OFFERS, GET_PRODUCT } = require('../../constants');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../apiRequest');

const bestSellers = (req, res) => {
	apiGetRequest(GET_PRODUCTS_BEST_SELLERS, req.session.customer)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(500);
			} else {
				res.send(data.body);
			}
		});
}

const offers = (req, res) => {
	apiGetRequest(GET_PRODUCTS_OFFERS, req.session.customer)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(500);
			} else {
				res.send(data.body);
			}
		});
}

const getProduct = (req, res) => {
	const { productId } = req.params;
	
	apiGetRequest(`${GET_PRODUCT}/${productId}`)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(500);
			} else {
				res.send(data.body);
			}
		})
}

module.exports = {
	bestSellers,
	offers,
	getProduct
}