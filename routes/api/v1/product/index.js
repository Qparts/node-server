const router = require('express').Router();
const {
 bestSellers, offers, getProduct
} = require('./middleware');

router.get('/best-sellers', bestSellers)
router.get('/offers', offers)
router.get('/product/:productId', getProduct)
module.exports = router;