const { GET_MAKES_URL } = require('../../../constants');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../../apiRequest');

const getMakes = (req, res) => {
 apiGetRequest(GET_MAKES_URL)
  .then(data => {
    if (data.statusCode !== 200) {
    res.sendStatus(data.statusCode);
   } else {
    res.send(data.body);
   }
  });
}

module.exports = {
 getMakes
}