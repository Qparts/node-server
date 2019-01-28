const getCustomerId = (req) => {
    return req.session.customer ? req.session.customer.id : null;
}

module.exports = { getCustomerId }