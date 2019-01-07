const router = require('express').Router();
const { 
 editName, editPhone, editEmail, resetPassword, login, signup, accountVerification, registerEmail, 
 registerSocialMedia, socialMediaAuth, resetPasswordSms, matchCode, addSocialMediaLink, addAddress, addVehicle, changeEmailSendLink, changeEmailVerification,
 changePassword, checkCustomerSession, logout
 } = require('./methods');
 
 const {LOGIN, SIGNUP, ACCOUNT_VERIFY, SOCIAL_MEDIA_AUTH } = require('../../../constants');

router.put('/', editName);
router.post('/address', addAddress)
router.post('/vehicle', addVehicle)
router.post('/edit/phone', editPhone);
router.post('/edit/email', editEmail);
router.put('/reset-password', matchCode, resetPassword);
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
router.put('/password', changePassword);
router.get('/logout', logout);

module.exports = router;