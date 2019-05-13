const { webpush } = require('../server');

module.exports = (req, res, next) => {
	req.session.webpush = webpush;
	next();
};