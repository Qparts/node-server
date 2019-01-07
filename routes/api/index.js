const router = require('express').Router();
const V1 = '/v1';
const V2 = '/v2';

router.use(`${V1}/partForm`, require('./v1/partForm/partForm'));
router.use(`${V2}/customer`, require('./v2/customer'));
router.use(`${V2}/location`, require('./v2/location'));
router.use(`${V1}/vehicle`, require('./v1/vehicle'));
router.use(`${V1}/cart`, require('.//v1/cart'));
router.use(`${V1}/product`, require('./v1/product'));

module.exports = router;