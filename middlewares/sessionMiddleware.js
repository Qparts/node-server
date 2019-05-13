const session = require('express-session');
const crypto = require('crypto');

const eightHours = 28800000;

module.exports = session({
	secret: crypto.randomBytes(12).toString('hex'),
	cookie: {
		maxAge: eightHours
	},
	resave: false,
	saveUninitialized: true,
});