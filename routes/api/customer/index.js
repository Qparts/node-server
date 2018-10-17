const router = require('express').Router();
const { 
 getCurrentUser, editName, editPhone, editEmail, resetPassword, getRegions, emailLogin, signup, registerEmail, 
 registerSocialMedia, socialMediaLogin, resetPasswordSms, matchCode, addSocialMediaLink, addAddress, addVehicle, changeEmailSendLink, changeEmailVerification,
 changePassword, checkCustomerSession, logout
 } = require('./methods');

router.get('/', getCurrentUser)
router.put('/', editName);
router.post('/address', addAddress)
router.post('/vehicle', addVehicle)
router.get('/regions/:countryId', getRegions)
router.post('/edit/phone', editPhone);
router.post('/edit/email', editEmail);
router.put('/reset-password', matchCode, resetPassword);
router.post('/reset-sms/mobile', resetPasswordSms);
router.post('/login/email', emailLogin);
router.post('/login/social-media', socialMediaLogin);
router.post('/social-media', addSocialMediaLink);
router.post('/signup', signup);
router.post('/register/email', matchCode, registerEmail);
router.post('/register/social-media', matchCode, registerSocialMedia);
router.post('/change-email', changeEmailSendLink);
router.put('/change-email', changeEmailVerification);
router.put('/password', changePassword);
router.get('/logout', logout);

module.exports = router;