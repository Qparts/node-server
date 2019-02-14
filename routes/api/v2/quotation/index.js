const router = require('express').Router();
const { 
    getPendingRequests, getCompletedRequests, postQuotation
} = require('./middleware');

const { QUOTATION_CUSTOMER } = require('../../../constants');

router.post('/', postQuotation)
router.get(`/${QUOTATION_CUSTOMER}/:customerId/pending`, getPendingRequests)
router.get(`/${QUOTATION_CUSTOMER}/:customerId/completed`, getCompletedRequests)

module.exports = router;