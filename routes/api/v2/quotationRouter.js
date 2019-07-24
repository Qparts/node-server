const router = require('express').Router();
const {
	getPendingRequests,
	getCompletedRequests,
	postQuotation,
	putQuotationRequestRead,
	getClosedRequests,
	getQuotationPayment
} = require.main.require('./controllers/quotationController');

const {
	QUOTATION_CUSTOMER,
	QUOTATION_READ,
	Q_WIRE_TRANSFER,
	Q_CREDIT_CARD,
	Q_PAYMENT_3DSECURE_RESPONSE
} = require('../../constants');

router.post('/', postQuotation);
router.post(`/${Q_WIRE_TRANSFER}`, postQuotation);
router.post(`/${Q_CREDIT_CARD}`, postQuotation);
router.get(`/${Q_PAYMENT_3DSECURE_RESPONSE}`, getQuotationPayment);
router.get(`/${QUOTATION_CUSTOMER}/:customerId/pending`, getPendingRequests);
router.get(
	`/${QUOTATION_CUSTOMER}/:customerId/completed`,
	getCompletedRequests
);
router.get(`/${QUOTATION_CUSTOMER}/:customerId/closed`, getClosedRequests);
router.put(`/${QUOTATION_READ}`, putQuotationRequestRead);

module.exports = router;
