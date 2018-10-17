const countriesData = require('../../../countries.json');

const { apiGetRequest, apiPostRequest } = require('../apiRequest');
const { COUNTRIES_URL, FIND_CITY_URL, REGIONS_URL } = require('../../constants')

const getCountry = (req, res) => {
  const { countryId } = req.params;
  const country = countriesData.find(country => {
    return country.id == countryId;
  });

  res.send(country);

}

const getCountries = (req, res) => {
  apiGetRequest(COUNTRIES_URL)
    .then(data => {
      res.send(data.body);
    });
}

const getCountriesRegions = (req, res) => {
  res.send(countriesData);
}

const findCity = (req, res) => {
  const { city, countryId } = req.params;
  apiGetRequest(`${FIND_CITY_URL}/name/${city}/country/${countryId}`, req.session.customer)
    .then(data => {
      res.send(data.body);
    });
}

const getRegions = (req, res) => {
  const { countryId } = req.params;
  apiGetRequest(`${REGIONS_URL}/${countryId}`, req.session.customer)
    .then(data => {
      if(data.statusCode !== 200) res.sendStatus(500);
      else {
        res.send(data.body);
      }
    });
}

module.exports = {
  getCountry,
  getCountries,
  getCountriesRegions,
  findCity,
  getRegions
}