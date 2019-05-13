const router = require('express').Router();
const {
	editName, editPhone, editEmail, resetPassword, updatePassword, login, postCodeLogin, signup, accountVerification, registerEmail,
	resetPasswordSms, matchCode, socialMediaAuth, addSocialMediaLink, addAddress, addVehicle, changeEmailSendLink, changeEmailVerification,
	changePassword, logout, resetPasswordToken, postSubscribeCustomer
} = require('./methods');

const {
	LOGIN, CODE_LOGIN, SIGNUP, ACCOUNT_VERIFY, SOCIAL_MEDIA_AUTH, RESET_PASSWORD, VEHICLE,
	PASSWORD, LOGOUT, SOCIAL_MEDIA, ADDRESS
} = require('../../../constants');

router.put('/', editName);
router.post(`/${ADDRESS}`, addAddress)
router.post(`/${VEHICLE}`, addVehicle)
router.post('/edit/phone', editPhone);
router.post('/edit/email', editEmail);
router.post(`/${RESET_PASSWORD}`, resetPassword);
router.put(`/${RESET_PASSWORD}`, updatePassword);
router.get(`/${RESET_PASSWORD}/token/:tokenId`, resetPasswordToken);
router.post('/reset-sms/mobile', resetPasswordSms);
router.post(`/${LOGIN}`, login);
router.post(`/${CODE_LOGIN}`, postCodeLogin);
router.post(`/${SOCIAL_MEDIA_AUTH}`, socialMediaAuth);
router.post(`/${SOCIAL_MEDIA}`, addSocialMediaLink);
router.post(`/${SIGNUP}`, signup);
router.post(`/${ACCOUNT_VERIFY}`, accountVerification);
router.post('/register/email', matchCode, registerEmail);
router.post('/change-email', changeEmailSendLink);
router.put('/change-email', changeEmailVerification);
router.put(`/${PASSWORD}`, changePassword);
router.get(`/${LOGOUT}`, logout);
router.post('/notification/register', postSubscribeCustomer)

module.exports = router;