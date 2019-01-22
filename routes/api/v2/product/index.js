const router = require('express').Router();
const {
 bestSellers, offers, getProduct
} = require('./middleware');

const { PRODUCT ,BEST_SELLERS, OFFERS} = require('../../../constants');

router.get(`/${BEST_SELLERS}`, bestSellers)
router.get(`/${OFFERS}`, offers)
router.get(`/${PRODUCT}/:productId`, getProduct)
module.exports = router;