const router = require('express').Router();
const { 
    getPendingRequests, getCompletedRequests
} = require('./middleware');

const { QUOTATION_CUSTOMER } = require('../../../constants');

router.get(`/${QUOTATION_CUSTOMER}/:customerId/pending`, getPendingRequests)
router.get(`/${QUOTATION_CUSTOMER}/:customerId/completed`, getCompletedRequests)

module.exports = router;