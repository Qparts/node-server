const session = require('express-session');
const crypto = require('crypto');

const age = 604800000;

module.exports = session({
	secret: crypto.randomBytes(12).toString('hex'),
	cookie: {
		maxAge: age
	},
	resave: false,
	saveUninitialized: true,
});
