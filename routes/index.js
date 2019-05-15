const apiRouters = require('express').Router();

function routers() {
	apiRouters.use('/api', require('./api'));
	return apiRouters;
}


module.exports = routers;