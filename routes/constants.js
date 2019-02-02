const BASE_URL = 'http://qtest.fareed9.com:8081';

const CUSTOMER_SERVICE = 'service-q-customer';
const LOCATION_SERVICE = 'service-q-location';
const VEHICLE_SERVICE = 'service-q-vehicle';
const CART_SERVICE = 'service-q-cart';
const PRODUCT_SERVICE = 'service-q-product';
const QUOTATION_SERVICE = 'service-q-quotation';

const API_V1 = 'rest/api/v1';
const API_V2 = 'rest/api/v2';

const LOGIN = 'login';
const SIGNUP = 'signup';
const ACCOUNT_VERIFY = 'account-verify';
const SOCIAL_MEDIA_AUTH = 'social-media-auth';
const COUNTRIES_ONLY = 'countries-only';
const RESET_PASSWORD = 'reset-password';
const PASSWORD = 'password';
const VEHICLE = 'vehicle';
const LOGOUT = 'logout';
const SOCIAL_MEDIA = 'social-media';
const ADDRESS = 'address';
const PRODUCT = 'product';
const BEST_SELLERS = 'products/best-sellers';
const OFFERS = 'products/offers';
const WIRE_TRANSFER = 'cart/wire-transfer';
const CREDIT_CARD = 'cart/credit-card';
const PAYMENT_3DSECURE_RESPONSE = 'payment/3dsecure-response';
const SEARCH_GENERAL = 'search/general';
const QUOTATION_CUSTOMER = 'quotations/customer';


const LOGIN_URL = `${CUSTOMER_SERVICE}/${API_V2}/${LOGIN}`;
const SIGNUP_URL = `${CUSTOMER_SERVICE}/${API_V2}/${SIGNUP}`;
const ACCOUNT_VERIFY_URL = `${CUSTOMER_SERVICE}/${API_V2}/${ACCOUNT_VERIFY}`;
const ADD_ADDRESS_URL = `${CUSTOMER_SERVICE}/${API_V2}/${ADDRESS}`;
const ADD_VEHICLE_URL = `${CUSTOMER_SERVICE}/${API_V2}/${VEHICLE}`;
const SOCIAL_MEDIA_AUTH_URL = `${CUSTOMER_SERVICE}/${API_V2}/${SOCIAL_MEDIA_AUTH}`;
const SOCIAL_MEDIA_LINK_URL = `${CUSTOMER_SERVICE}/${API_V2}/${SOCIAL_MEDIA}`;
const EMAIL_REGISTER_URL = `${CUSTOMER_SERVICE}/${API_V2}/register/email`;
const RESET_PASSWORD_URL = `${CUSTOMER_SERVICE}/${API_V2}/${RESET_PASSWORD}`;
const RESET_SMS_URL = `${CUSTOMER_SERVICE}/${API_V2}/reset-sms/mobile`;
const CHANGE_NAME_URL = `${CUSTOMER_SERVICE}/${API_V2}/customer`;
const CHANGE_EMAIL_URL = `${CUSTOMER_SERVICE}/${API_V2}/change-email`;
const CHANGE_PASSWORD_URL = `${CUSTOMER_SERVICE}/${API_V2}/${PASSWORD}`;
const LOGOUT_URL = `${CUSTOMER_SERVICE}/${API_V2}/${LOGOUT}`;

const FIND_CITY_URL = `${LOCATION_SERVICE}/${API_V2}/find-city`;
const COUNTRIES_URL = `${LOCATION_SERVICE}/${API_V2}/countries`;
const COUNTRIES_ONLY_URL = `${LOCATION_SERVICE}/${API_V2}/${COUNTRIES_ONLY}`;
const REGIONS_URL = `${LOCATION_SERVICE}/${API_V2}/regions/country-id`;

const GET_MAKES_URL = `${VEHICLE_SERVICE}/${API_V2}/makes`;

const GET_QUOTATION_CART_URL = `${CART_SERVICE}/${API_V2}/quotation-carts/customer`;
const ADD_QUOTATION_CART_URL = `${CART_SERVICE}/${API_V2}/quotation-cart`;
const POST_WIRE_TRANSFER_CART_URL = `${CART_SERVICE}/${API_V2}/${WIRE_TRANSFER}`;
const POST_CREDIT_CARD_CART_URL = `${CART_SERVICE}/${API_V2}/${CREDIT_CARD}`;
const PUT_PAYMENT_3DSECURE_RESPONSE_URL = `${CART_SERVICE}/${API_V2}/${PAYMENT_3DSECURE_RESPONSE}`;

const GET_PRODUCTS_BEST_SELLERS = `${PRODUCT_SERVICE}/${API_V2}/${BEST_SELLERS}`;
const GET_PRODUCTS_OFFERS = `${PRODUCT_SERVICE}/${API_V2}/${OFFERS}`;
const GET_PRODUCT = `${PRODUCT_SERVICE}/${API_V2}/${PRODUCT}`;
const GET_GENERAL_SEARCH = `${PRODUCT_SERVICE}/${API_V2}`;

const GET_QUOTATIONS_URL = `${QUOTATION_SERVICE}/${API_V2}/${QUOTATION_CUSTOMER}`;

module.exports = {
    BASE_URL,
    LOGIN_URL,
    SIGNUP_URL,
    ACCOUNT_VERIFY_URL,
    EMAIL_REGISTER_URL,
    COUNTRIES_URL,
    REGIONS_URL,
    FIND_CITY_URL,
    SOCIAL_MEDIA_AUTH_URL,
    COUNTRIES_ONLY_URL,
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
    LOGOUT_URL,
    POST_WIRE_TRANSFER_CART_URL,
    POST_CREDIT_CARD_CART_URL,
    PUT_PAYMENT_3DSECURE_RESPONSE_URL,
    GET_GENERAL_SEARCH,
    GET_QUOTATIONS_URL,

    LOGIN,
    SIGNUP,
    ACCOUNT_VERIFY,
    SOCIAL_MEDIA_AUTH,
    COUNTRIES_ONLY,
    RESET_PASSWORD,
    VEHICLE,
    PASSWORD,
    LOGOUT,
    SOCIAL_MEDIA,
    ADDRESS,
    PRODUCT,
    BEST_SELLERS,
    OFFERS,
    WIRE_TRANSFER,
    CREDIT_CARD,
    PAYMENT_3DSECURE_RESPONSE,
    SEARCH_GENERAL,
    QUOTATION_CUSTOMER
}