const router = require('express').Router();
const {
    editName, editPhone, editEmail, resetPassword, updatePassword, login, signup, accountVerification, registerEmail,
    registerSocialMedia, socialMediaAuth, resetPasswordSms, matchCode, addSocialMediaLink, addAddress, addVehicle, changeEmailSendLink, changeEmailVerification,
    changePassword, checkCustomerSession, logout, resetPasswordToken
} = require('./methods');

const {
    LOGIN, SIGNUP, ACCOUNT_VERIFY, SOCIAL_MEDIA_AUTH, RESET_PASSWORD, VEHICLE, PASSWORD
} = require('../../../constants');

router.put('/', editName);
router.post('/address', addAddress)
router.post(`/${VEHICLE}`, addVehicle)
router.post('/edit/phone', editPhone);
router.post('/edit/email', editEmail);
router.post(`/${RESET_PASSWORD}`, resetPassword);
router.put(`/${RESET_PASSWORD}`, updatePassword);
router.get(`/${RESET_PASSWORD}/token/:tokenId`, resetPasswordToken);
router.post('/reset-sms/mobile', resetPasswordSms);
router.post(`/${LOGIN}`, login);
router.post(`/${SOCIAL_MEDIA_AUTH}`, socialMediaAuth);
router.post('/social-media', addSocialMediaLink);
router.post(`/${SIGNUP}`, signup);
router.post(`/${ACCOUNT_VERIFY}`, accountVerification);
router.post('/register/email', matchCode, registerEmail);
router.post('/register/social-media', matchCode, registerSocialMedia);
router.post('/change-email', changeEmailSendLink);
router.put('/change-email', changeEmailVerification);
router.put(`/${PASSWORD}`, changePassword);
router.get('/logout', logout);

module.exports = router;