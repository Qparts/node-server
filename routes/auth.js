const setHeaderAuthorization = (customer = {}) => {
  return `Bearer ${getToken(customer)} && ${getId(customer)} && ${process.env.AUTHORIZATION}`
}

const getToken = ({ token }) => {
  return token ? token : 'no-token';
}

const getId = ({ id }) => {
  return id ? id : 'no_id';
}

module.exports = {
  setHeaderAuthorization
};