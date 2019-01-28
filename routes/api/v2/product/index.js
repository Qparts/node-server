const router = require('express').Router();
const {
 bestSellers, offers, getProduct, getGeneralSearch
} = require('./middleware');

const { PRODUCT ,BEST_SELLERS, OFFERS, SEARCH_GENERAL} = require('../../../constants');

router.get(`/${BEST_SELLERS}`, bestSellers)
router.get(`/${OFFERS}`, offers)
router.get(`/${PRODUCT}/:productId`, getProduct)
router.get(`/${SEARCH_GENERAL}`, getGeneralSearch)
module.exports = router;