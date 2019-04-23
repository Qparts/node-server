const errorMessages = require.main.require('./errorMessages.json');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../../apiRequest');
const _ = require('lodash');
const upload = require('../../../../services/fileUpload');

const {
  SIGNUP_URL, ACCOUNT_VERIFY_URL, EMAIL_REGISTER_URL, LOGIN_URL, SOCIAL_MEDIA_AUTH_URL, RESET_PASSWORD_URL, RESET_SMS_URL, SOCIAL_MEDIA_LINK_URL,
  ADD_ADDRESS_URL, ADD_VEHICLE_URL, CHANGE_EMAIL_URL, CHANGE_PASSWORD_URL, CHANGE_NAME_URL, LOGOUT_URL
} = require('../../../constants')

const { invalidToken } = require('../../constants');

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
  apiPostRequest(RESET_PASSWORD_URL, req.body)
    .then(data => {
      if (data.statusCode !== 200) {
        res.sendStatus(data.statusCode);
      } else {
        res.sendStatus(data.statusCode);
      }
    });
}

const resetPasswordToken = (req, res) => {
  const { tokenId } = req.params;

  apiGetRequest(`${RESET_PASSWORD_URL}/token/${tokenId}`, req.body)
    .then(data => {
      if (data.statusCode !== 201) {
        res.sendStatus(500);
      } else {
        res.sendStatus(data.statusCode);
      }
    });
}

const updatePassword = (req, res) => {
  const { password, token } = req.body;

  apiPutRequest(RESET_PASSWORD_URL, { password, token })
    .then(data => {
      if (data.statusCode !== 200) {
        res.sendStatus(500);
      } else {
        saveCurrentCustomer(req, data.body)
        res.send(data.body);
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

const login = (req, res) => {
  apiPostRequest(LOGIN_URL, req.body)
    .then(data => {
      if (data.statusCode === 200) {
        saveCurrentCustomer(req, data.body)
        res.send(data.body);
      } else {
        res.status(data.statusCode).send(errorMessages.form.signin.incorrectPassword);
      }
    });
}

const socialMediaAuth = (req, res) => {
  apiPostRequest(SOCIAL_MEDIA_AUTH_URL, {...req.body, countryId: 1})
    .then(data => {
      if (data.statusCode !== 200) {
        res.sendStatus(data.statusCode);
      } else {
        saveCurrentCustomer(req, data.body);
        res.send(data.body);
      }
    })
}

const signup = (req, res) => {
  apiPostRequest(SIGNUP_URL, req.body.customer)
    .then(data => {
      if (data.statusCode === 409) {
        res.status(data.statusCode).send({ error: errorMessages.form.signup.email, field: 'email' });
      } else if (data.statusCode === 202) {
        saveCurrentCustomer(req, data.body)
        res.send(data.body);
      } else {
        res.status(500);
      }
    });
}

const accountVerification = (req, res) => {
  apiPostRequest(ACCOUNT_VERIFY_URL, req.body)
    .then(data => {
      if (data.statusCode === 200) {
        res.send(data.body);
      } else {
        res.sendStatus(data.statusCode);
      }
    });
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
}

const addSocialMediaLink = (req, res) => {
  const customerId = getCustomerId(req);
  const { platform, socialMediaId, email } = req.body;

  apiPostRequest(SOCIAL_MEDIA_LINK_URL, { platform, socialMediaId, customerId, email }, req.session.customer)
    .then(data => {
      if (data.statusCode === 201) {
        res.sendStatus(data.statusCode);
      } else if (data.statusCode === 409) {
        res.status(data.statusCode).send({ error: errorMessages.socialMediaLink.usedEmail });
      } else {
        res.sendStatus(500);
      }
    });
}

const addAddress = (req, res) => {
  const customerId = getCustomerId(req);
  const {
    line1, line2, cityId, zipCode, title, latitude, longitude, mobile, defaultAddress
  } = req.body;

  apiPostRequest(ADD_ADDRESS_URL, {
    customerId, line1, line2, cityId, zipCode, title, latitude, longitude, mobile, defaultAddress
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
  const { vehicleYearId, vin, defaultVehicle, vinImage } = req.body;
  const imageAttached = vinImage ? true : false;
  
  
  apiPostRequest(ADD_VEHICLE_URL, { customerId, vehicleYearId, vin, defaultVehicle, imageAttached }, req.session.customer)
    .then(data => {
      if (data.statusCode !== 200) {
        res.sendStatus(500);
      } else {
        const id = data.body.id;
        const name = `${id}.png`;
        if (vinImage) {
          upload(vinImage, name, process.env.AWS_BUCKET_VIN);
        }
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
  const customerId = getCustomerId(req);
  apiPostRequest(LOGOUT_URL, customerId, req.session.customer)
    .then(data => {
      if (data.statusCode !== 200) {
        res.sendStatus(500);
      } else {
        req.session.destroy();
        res.sendStatus(204);
      }
    });
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
  editName,
  editPhone,
  editEmail,
  resetPassword,
  updatePassword,
  resetPasswordToken,
  resetPasswordSms,
  login,
  socialMediaAuth,
  signup,
  accountVerification,
  registerEmail,
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