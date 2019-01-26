const router = require('express').Router();
const {
    getQuotation, addCart, getRepliedQuotation, wireTransfer, creditCard, paymentResponse
} = require('./middleware');

const { WIRE_TRANSFER, CREDIT_CARD, PAYMENT_3DSECURE_RESPONSE } = require('../../../constants');

// router.get('/quotation-carts/customer/:customerId', getQuotation)
// router.get('/quotation-carts/customer/:customerId/submitted', getRepliedQuotation)
// router.post('/quotation-cart', addCart)
router.post(`/${WIRE_TRANSFER}`, wireTransfer)
router.post(`/${CREDIT_CARD}`, creditCard)
router.get(`/${PAYMENT_3DSECURE_RESPONSE}`, paymentResponse)

module.exports = router;