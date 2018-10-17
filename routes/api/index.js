const router = require('express').Router();

router.use('/partForm', require('./partForm/partForm'));
router.use('/customer', require('./customer'));
router.use('/location', require('./location'));
router.use('/vehicle', require('./vehicle'));
router.use('/cart', require('./cart'));
router.use('/product', require('./product'));

module.exports = router;