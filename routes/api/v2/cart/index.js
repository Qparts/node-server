const router = require('express').Router();
const {
    getQuotation, addCart, getRepliedQuotation, wireTransfer
} = require('./middleware');

const { WIRE_TRANSFER } = require('../../../constants');

// router.get('/quotation-carts/customer/:customerId', getQuotation)
// router.get('/quotation-carts/customer/:customerId/submitted', getRepliedQuotation)
// router.post('/quotation-cart', addCart)
router.post(`/${WIRE_TRANSFER}`, wireTransfer)

module.exports = router;