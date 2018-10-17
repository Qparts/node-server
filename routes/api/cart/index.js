const router = require('express').Router();
const {
 getQuotation, addCart, getRepliedQuotation
} = require('./middleware');

router.get('/quotation-carts/customer/:customerId', getQuotation)
router.get('/quotation-carts/customer/:customerId/submitted', getRepliedQuotation)
router.post('/quotation-cart', addCart)

module.exports = router;