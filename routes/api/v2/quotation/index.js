const router = require('express').Router();
const { 
    getPendingRequests, getCompletedRequests, postQuotation, putCompletedRequestRead
} = require('./middleware');

const { QUOTATION_CUSTOMER, QUOTATION_COMLETED_READ } = require('../../../constants');

router.post('/', postQuotation);
router.get(`/${QUOTATION_CUSTOMER}/:customerId/pending`, getPendingRequests);
router.get(`/${QUOTATION_CUSTOMER}/:customerId/completed`, getCompletedRequests);
router.put(`/${QUOTATION_COMLETED_READ}`, putCompletedRequestRead);

module.exports = router;