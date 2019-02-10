const isProduction = process.env.NODE_ENV === 'production';

const getBaseURL = () => {
    return isProduction ? 'http://10.0.2.14:8081': 'http://qtest.fareed9.com:8081';
}

module.exports = { getBaseURL }