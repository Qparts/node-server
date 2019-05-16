const router = require('express').Router();
const { 
	getPendingRequests, getCompletedRequests, postQuotation, putQuotationRequestRead, getClosedRequests
} = require.main.require('./controllers/quotationController');

const { QUOTATION_CUSTOMER, QUOTATION_READ } = require('../../constants');

router.post('/', postQuotation);
router.get(`/${QUOTATION_CUSTOMER}/:customerId/pending`, getPendingRequests);
router.get(`/${QUOTATION_CUSTOMER}/:customerId/completed`, getCompletedRequests);
router.get(`/${QUOTATION_CUSTOMER}/:customerId/closed`, getClosedRequests);
router.put(`/${QUOTATION_READ}`, putQuotationRequestRead);

module.exports = router;