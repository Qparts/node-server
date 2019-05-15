const router = require('express').Router();
const V1 = '/v1';
const V2 = '/v2';

router.use(`${V2}/customer`, require('./v2/customerRouter'));
router.use(`${V2}/location`, require('./v2/locationRouter'));
router.use(`${V2}/vehicle`, require('./v2/vehicleRouter'));
router.use(`${V2}/cart`, require('./v2/cartRouter'));
router.use(`${V2}/product`, require('./v2/productRouter'));
router.use(`${V2}/quotation`, require('./v2/quotationRouter'));

module.exports = router;