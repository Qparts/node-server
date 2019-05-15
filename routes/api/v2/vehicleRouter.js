const router = require('express').Router();
const {
	getMakes
} = require.main.require('./controllers/vehicleController');

router.get('/makes', getMakes);

module.exports = router;