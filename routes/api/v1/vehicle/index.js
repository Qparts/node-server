const router = require('express').Router();
const {
 getMakes
} = require('./middleware');

router.get('/makes', getMakes)

module.exports = router;