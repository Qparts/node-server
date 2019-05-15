const router = require('express').Router();
const {
	getQuotation, addCart, getRepliedQuotation, wireTransfer, creditCard, paymentResponse, getBanks
} = require.main.require('./controllers/cartController');

const { WIRE_TRANSFER, CREDIT_CARD, PAYMENT_3DSECURE_RESPONSE, BANKS } = require('../../constants');

router.post(`/${WIRE_TRANSFER}`, wireTransfer);
router.post(`/${CREDIT_CARD}`, creditCard);
router.get(`/${PAYMENT_3DSECURE_RESPONSE}`, paymentResponse);
router.get(`/${BANKS}`, getBanks);

module.exports = router;