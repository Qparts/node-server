const { GET_PRODUCTS_BEST_SELLERS, GET_PRODUCTS_OFFERS, GET_PRODUCT, GET_GENERAL_SEARCH } = require('../../../constants');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../../apiRequest');

const bestSellers = (req, res) => {

	apiGetRequest(GET_PRODUCTS_BEST_SELLERS)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(500);
			} else {
				res.send(data.body);
			}
		});
}

const offers = (req, res) => {
	apiGetRequest(GET_PRODUCTS_OFFERS)
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

const getGeneralSearch = (req, res) => {
	apiGetRequest(`${GET_GENERAL_SEARCH}${req.url}`)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(data.statusCode);
			} else {
				res.send(data.body);
			}
		})
}

module.exports = {
	bestSellers,
	offers,
	getProduct,
	getGeneralSearch
}