const getCustomerId = (req) => {
	return req.session.customer ? req.session.customer.id : null;
};

const getCustomerToken = (req) => {
	return req.session.customer ? req.session.customer.token : null;
};

module.exports = { getCustomerId, getCustomerToken };