const data = require('../../../user.json');
const regionsData = require('../../../regions.json');
const errorMessages = require('../../../errorMessages.json');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../apiRequest');
const _ = require('lodash');

const {
  SIGNUP_URL, EMAIL_REGISTER_URL, EMAIL_LOGIN_URL, SOCIAL_MEDIA_LOGIN_URL, RESET_PASSWORD_URL, RESET_SMS_URL, SOCIAL_MEDIA_LINK_URL,
  ADD_ADDRESS_URL, ADD_VEHICLE_URL, CHANGE_EMAIL_URL, CHANGE_PASSWORD_URL, CHANGE_NAME_URL
} = require('../../constants')

const { invalidToken } = require('../constants');

const getCurrentUser = (req, res) => {
  res.send(data);
}

const editName = (req, res) => {
  const { firstName, lastName, defaultLang } = req.body;
  const customerId = getCustomerId(req);
  apiPutRequest(CHANGE_NAME_URL, { firstName, lastName, defaultLang, customerId }, req.session.customer)
    .then(data => {
      if (data.statusCode === 201) {
        res.sendStatus(data.statusCode);
      } else {
        res.sendStatus(500);
      }
    });
}
const editPhone = (req, res) => {
  let newPhone = data;
  newPhone.mobile = req.body.phone;

  res.send(newPhone.mobile);

}
const editEmail = (req, res) => {
  let newEmail = data;
  newEmail.email = req.body.email;

  res.send(newEmail.email);

}
const resetPassword = (req, res) => {
  const { mobile, password } = req.body;
  apiPutRequest(RESET_PASSWORD_URL, { mobile, password })
    .then(data => {
      if (data.statusCode !== 200) {
        res.sendStatus(data.statusCode);
      } else {
        res.sendStatus(data.statusCode).send(data.body);
      }
    });
}

const resetPasswordSms = (req, res) => {
  apiPostRequest(RESET_SMS_URL, req.body)
    .then(data => {
      if (data.statusCode === 401 || data.statusCode === 404) {
        res.status(data.statusCode).send(errorMessages.form.signin.resetPassword);
      } else {
        const json = JSON.parse(data.body);
        req.session.code = json.code.toString();
        res.status(data.statusCode).send(json);
      }
    });
}

const getRegions = (req, res) => {
  const { countryId } = req.params;
  const regions = regionsData.filter(region => {
    return region.countryId == countryId;
  });

  res.send(regions);
}

const emailLogin = (req, res) => {
  apiPostRequest(EMAIL_LOGIN_URL, req.body)
    .then(data => {
      if (data.statusCode !== 200) {
        res.status(data.statusCode).send(errorMessages.form.signin.incorrectPassword);
      } else {
        saveCurrentCustomer(req, data.body)
        res.send(data.body);
      }
    })
  // saveCurrentCustomer(req, require('../../../user.json'))
  // res.send(require('../../../user.json'));
}

const socialMediaLogin = (req, res) => {
  apiPostRequest(SOCIAL_MEDIA_LOGIN_URL, req.body)
    .then(data => {
      if (data.statusCode !== 200) {
        res.status(data.statusCode).send(errorMessages.form.signin.incorrectPassword);
      } else {
        saveCurrentCustomer(req, data.body);
        res.send(data.body);
      }
    })
}

const signup = (req, res) => {
  const {
    firstName, lastName, mobile, email, countryId, countryCode, password, platform, socialMediaId
  } = req.body.customer;
  req.session.customer = req.body.customer;
  apiPostRequest(SIGNUP_URL, { countryCode, mobile, email })
    .then(data => {
      const result = data.body;
      if (data.statusCode === 409 && result === 'mobile') {
        res.status(data.statusCode).send({ error: errorMessages.form.signup.mobile, field: result });
      } else if (data.statusCode === 409 && result === 'email') {
        res.status(data.statusCode).send({ error: errorMessages.form.signup.email, field: result });
      } else if (data.statusCode === 200) {
        const json = JSON.parse(data.body);
        req.session.code = json.code.toString();
        res.status(data.statusCode).send(json);
      } else {
        res.status(500);
      }
    });
  // req.session.customer = req.body;
  // req.session.code = require('../../../signup.json').code;
  // console.log('====================================');
  // console.log({ countryCode, mobile, email });
  // console.log(req.session);
  // console.log('====================================');
  // res.status(200).send(req.session.code);
}

const registerEmail = (req, res) => {
  apiPostRequest(EMAIL_REGISTER_URL, { firstName, lastName, mobile, email, countryId, countryCode, password } = req.session.customer)
    .then(data => {
      if (data.statusCode === 200) {
        res.send(data.body);
      } else {
        res.sendStatus(data.statusCode);
      }
    });
  // console.log('====================================');
  // console.log(req.session);
  // console.log('====================================');
  // const data = require('../../../register.json');
  // if (req.session.code !== req.body.code) res.status(403).send("The code you entered is not correct. Please try again");

  // else {
  // res.send({ firstName, lastName, mobile, email, countryId, countryCode, password } = req.session.customer);
  // }
}

const registerSocialMedia = (req, res) => {
  apiPostRequest(SOCIAL_MEDIA_REGISTER_URL, {
    firstName, lastName, mobile, email, countryId, countryCode, socialMediaId, platform
  } = req.session.customer)
    .then(data => {
      if (data.statusCode === 200) {
        res.send(data.body);
      } else {
        res.sendStatus(data.statusCode);
      }
    });
  // const data = require('../../../registerSM.json');
  // const customer_id = "10155279156246862"
  // if (customer_id === req.body.customer.id) res.status(409).send("This user is already registered");
  // else {
  //   res.send(data);
  // }
}

const addSocialMediaLink = (req, res) => {
  const customerId = getCustomerId(req);
  const { platform, socialMediaId } = req.body;
  apiPostRequest(SOCIAL_MEDIA_LINK_URL, { platform, socialMediaId, customerId }, req.session.customer)
    .then(data => {
      if (data.statusCode === 201) {
        res.send(data.body);
      } else {
        res.sendStatus(500);
      }
    });
}

const addAddress = (req, res) => {
  const customerId = getCustomerId(req);
  const {
    line1, line2, cityId, zipCode, title, latitude, longitude
  } = req.body;

  apiPostRequest(ADD_ADDRESS_URL, {
    customerId, line1, line2, cityId, zipCode, title, latitude, longitude
  }, req.session.customer)
    .then(data => {
      if (data.statusCode !== 200) {
        res.sendStatus(500);
      } else {
        res.send(data.body);
      }
    });
}

const addVehicle = (req, res) => {
  const customerId = getCustomerId(req);
  const { vehicleId, vin } = req.body;
  apiPostRequest(ADD_VEHICLE_URL, { customerId, vehicleId, vin }, req.session.customer)
    .then(data => {
      if (data.statusCode !== 200) {
        res.sendStatus(500);
      } else {
        res.send(data.body);
      }
    });
}

const changeEmailSendLink = (req, res) => {
  const customerId = getCustomerId(req);
  const { newEmail } = req.body;
  apiPostRequest(CHANGE_EMAIL_URL, { customerId, newEmail }, req.session.customer)
    .then(data => {
      if (data.statusCode === 201) {
        res.sendStatus(data.statusCode);
      } else if (data.statusCode === 409) {
        res.status(data.statusCode).send(errorMessages.form.changeEmail.email);
      } else {
        res.sendStatus(500);
      }
    });
}

const changeEmailVerification = (req, res) => {
  const { code, email } = req.body;
  apiPutRequest(CHANGE_EMAIL_URL, { code, email })
    .then(data => {
      if (data.statusCode === 201) {
        res.sendStatu(data.statusCode);
      } else {
        res.sendStatus(500);
      }
    });
}

const changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const customerId = getCustomerId(req);
  apiPutRequest(CHANGE_PASSWORD_URL, { oldPassword, newPassword, customerId }, req.session.customer)
    .then(data => {
      const json = JSON.parse(data.body ? data.body : '{}');
      if (data.statusCode === 201) {
        res.sendStatus(data.statusCode);
      } else if (data.statusCode === 401 && json.result === invalidToken) {
        res.sendStatus(500);
      } else {
        res.status(data.statusCode).send(errorMessages.form.changePassword.password);
      }
    });
}

const matchCode = (req, res, next) => {
  // check if the customer entered the correct verification code before making a request to the proxy server
  if (req.session.code !== req.body.code) res.status(403).send("verification code is not matched");
  else {
    next();
  }
}

const saveCurrentCustomer = (req, data) => {
  const json = JSON.parse(data);
  req.session.customer = {
    token: json.token,
    id: json.customer.id,
    defaultLang: json.customer.defaultLang
  };
}

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(204);
}

const getCustomerId = (req) => {
  return req.session.customer ? req.session.customer.id : null;
}

const checkCustomerSession = (req, res, next) => {
  if (_.isEmpty(req.session.customer)) {
  } else {
    next();
  }
}

module.exports = {
  getCurrentUser,
  editName,
  editPhone,
  editEmail,
  resetPassword,
  resetPasswordSms,
  getRegions,
  emailLogin,
  socialMediaLogin,
  signup,
  registerEmail,
  registerSocialMedia,
  matchCode,
  addSocialMediaLink,
  addAddress,
  addVehicle,
  changeEmailSendLink,
  changeEmailVerification,
  changePassword,
  checkCustomerSession,
  logout
}