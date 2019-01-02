const router = require('express').Router();
const { getData } = require('./methods');

router.get('/:product/:makeId', getData)

module.exports = router;