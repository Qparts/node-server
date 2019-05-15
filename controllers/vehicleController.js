const { GET_MAKES_URL } = require('../routes/constants');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../routes/api/apiRequest');

const getMakes = (req, res) => {
	apiGetRequest(GET_MAKES_URL)
		.then(data => {
			if (data.statusCode !== 200) {
				res.sendStatus(data.statusCode);
			} else {
				res.send(data.body);
			}
		});
};

module.exports = {
	getMakes
};