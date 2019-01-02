const router = require('express').Router();
const V1 = '/v1';
const V2 = '/v2';

// router.use(`${V1}/partForm`, require('./partForm/partForm'));
router.use(`${V2}/customer`, require('./v2/customer'));
// router.use(`${V1}/location`, require('./v1/location'));
// router.use(`${V1}/vehicle`, require('./vehicle'));
// router.use(`${V1}/cart`, require('./cart'));
// router.use(`${V1}/product`, require('./product'));

module.exports = router;