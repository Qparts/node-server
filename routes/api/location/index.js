const router = require('express').Router();
const { apiGetRequest } = require('../apiRequest');
const {
  getCountry, getCountries, getCountriesRegions, findCity, getRegions
} = require('./methods');

router.get('/', getCountries)
router.get('/regions', getCountriesRegions)
router.get('/regions/country-id/:countryId', getRegions)
router.get('/:countryId', getCountry)
router.get('/find-city/name/:city/country/:countryId', findCity);

module.exports = router;