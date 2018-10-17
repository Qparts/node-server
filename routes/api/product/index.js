const router = require('express').Router();
const {
 bestSellers, offers
} = require('./middleware');

router.get('/best-sellers', bestSellers)
router.get('/offers', offers)
module.exports = router;