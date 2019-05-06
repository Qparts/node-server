const router = require('express').Router();
const {
    bestSellers, offers, getProduct, getGeneralSearch, getPopularBrandsOil
} = require('./middleware');

const { PRODUCT, BEST_SELLERS, OFFERS, SEARCH_GENERAL, POPULAR_BRANDS_OIL } = require('../../../constants');

router.get(`/${BEST_SELLERS}`, bestSellers)
router.get(`/${OFFERS}`, offers)
router.get(`/${PRODUCT}/:productId`, getProduct)
router.get(`/${SEARCH_GENERAL}`, getGeneralSearch)
router.get(`/${POPULAR_BRANDS_OIL}`, getPopularBrandsOil)
module.exports = router;