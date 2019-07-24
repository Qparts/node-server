const { BASE_URL } = require('../constants');
const { setHeaderAuthorization } = require('../auth');
var request = require('request');

const apiGetRequest = (url, customer) => {
	console.log(`${BASE_URL}/${url}`);
	return new Promise((resolve, reject) => {
		request.get(
			`${BASE_URL}/${url}`,
			{
				headers: {
					Authorization: setHeaderAuthorization(customer)
				}
			},
			function(error, response, body) {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			}
		);
	});
};

const apiPostRequest = (url, body, customer) => {
	console.log(`${BASE_URL}/${url}`);

	const options = {
		body: JSON.stringify(body),
		headers: {
			Authorization: setHeaderAuthorization(customer),
			'content-type': 'application/json'
		}
	};
	return new Promise((resolve, reject) => {
		request.post(`${BASE_URL}/${url}`, options, function(
			error,
			response,
			body
		) {
			if (error) {
				reject(error);
			} else {
				resolve(response);
			}
		});
	});
};

const apiPutRequest = (url, body, customer) => {
	console.log(`${BASE_URL}/${url}`);

	const options = {
		body: JSON.stringify(body),
		headers: {
			Authorization: setHeaderAuthorization(customer),
			'content-type': 'application/json'
		}
	};
	return new Promise((resolve, reject) => {
		request.put(`${BASE_URL}/${url}`, options, function(
			error,
			response,
			body
		) {
			if (error) {
				reject(error);
			} else {
				resolve(response);
			}
		});
	});
};

module.exports = {
	apiGetRequest,
	apiPostRequest,
	apiPutRequest
};
