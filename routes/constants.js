const BASE_URL = 'http://qtest.fareed9.com:8081';

const CUSTOMER_SERVICE = 'service-q-customer';
const LOCATION_SERVICE = 'service-qetaa-location';
const VEHICLE_SERVICE = 'service-qetaa-vehicle';
const CART_SERVICE = 'service-qetaa-cart';
const PRODUCT_SERVICE = 'service-qetaa-product';

const API_V1 = '/rest/api/v1';
const API_V2 = '/rest/api/v2';

const SIGNUP = 'signup';
const ACCOUNT_VERIFY = 'account-verify';


const EMAIL_LOGIN_URL = `${CUSTOMER_SERVICE}${API_V2}/login/email`;
const SIGNUP_URL = `${CUSTOMER_SERVICE}${API_V2}/${SIGNUP}`;
const ACCOUNT_VERIFY_URL = `${CUSTOMER_SERVICE}${API_V2}/${ACCOUNT_VERIFY}`;
const ADD_ADDRESS_URL = `${CUSTOMER_SERVICE}${API_V2}/address`;
const ADD_VEHICLE_URL = `${CUSTOMER_SERVICE}${API_V2}/vehicle`;
const SOCIAL_MEDIA_LOGIN_URL = `${CUSTOMER_SERVICE}${API_V2}/login/social-media`;
const SOCIAL_MEDIA_LINK_URL = `${CUSTOMER_SERVICE}${API_V2}/social-media`;
const EMAIL_REGISTER_URL = `${CUSTOMER_SERVICE}${API_V2}/register/email`;
const SOCIAL_MEDIA_REGISTER_URL = `${CUSTOMER_SERVICE}${API_V2}/register/social-media`;
const RESET_PASSWORD_URL = `${CUSTOMER_SERVICE}${API_V2}/reset-password`;
const RESET_SMS_URL = `${CUSTOMER_SERVICE}${API_V2}/reset-sms/mobile`;
const CHANGE_NAME_URL = `${CUSTOMER_SERVICE}${API_V2}/customer`;
const CHANGE_EMAIL_URL = `${CUSTOMER_SERVICE}${API_V2}/change-email`;
const CHANGE_PASSWORD_URL = `${CUSTOMER_SERVICE}${API_V2}/password`;
const FIND_CITY_URL = `${LOCATION_SERVICE}${API_V1}/find-city`;
const COUNTRIES_URL = `${LOCATION_SERVICE}${API_V1}/countries`;
const REGIONS_URL = `${LOCATION_SERVICE}${API_V1}/regions/country-id`;
const GET_MAKES_URL = `${VEHICLE_SERVICE}${API_V1}/makes`;
const GET_QUOTATION_CART_URL = `${CART_SERVICE}${API_V1}/quotation-carts/customer`;
const ADD_QUOTATION_CART_URL = `${CART_SERVICE}${API_V1}/quotation-cart`;
const GET_PRODUCTS_BEST_SELLERS = `${PRODUCT_SERVICE}${API_V1}/best-sellers`;
const GET_PRODUCTS_OFFERS = `${PRODUCT_SERVICE}${API_V1}/offers`;
const GET_PRODUCT = `${PRODUCT_SERVICE}${API_V1}/product`;

module.exports = {
 BASE_URL,
 EMAIL_LOGIN_URL,
 SIGNUP_URL,
 ACCOUNT_VERIFY_URL,
 EMAIL_REGISTER_URL,
 SOCIAL_MEDIA_REGISTER_URL,
 COUNTRIES_URL,
 REGIONS_URL,
 FIND_CITY_URL,
 SOCIAL_MEDIA_LOGIN_URL,
 RESET_PASSWORD_URL,
 RESET_SMS_URL,
 SOCIAL_MEDIA_LINK_URL,
 ADD_ADDRESS_URL,
 ADD_VEHICLE_URL,
 GET_MAKES_URL,
 CHANGE_EMAIL_URL,
 CHANGE_PASSWORD_URL,
 CHANGE_NAME_URL,
 GET_QUOTATION_CART_URL,
 ADD_QUOTATION_CART_URL,
 GET_PRODUCTS_BEST_SELLERS,
 GET_PRODUCTS_OFFERS,
 GET_PRODUCT,

 SIGNUP,
 ACCOUNT_VERIFY
}