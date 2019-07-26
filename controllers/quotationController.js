const {
	GET_QUOTATIONS_URL,
	POST_QUOTATIONS_WIRE_TRANSFER_URL,
	POST_QUOTATIONS_CC_URL,
	PUT_QUOTATION_READ_URL,
	PUT_QUOTATION_PAYMENT_URL,
	Q_WIRE_TRANSFER
} = require('../routes/constants');
const {
	apiGetRequest,
	apiPostRequest,
	apiPutRequest
} = require('../routes/api/apiRequest');
const { customer } = require('../utils');
const upload = require('../services/fileUploadService');

const getPendingRequests = (req, res) => {
	const { customerId } = req.params;
	apiGetRequest(
		`${GET_QUOTATIONS_URL}/${customerId}/pending`,
		req.session.customer
	).then(data => {
		if (data.statusCode === 200) {
			res.send(data.body);
		} else {
			res.sendStatus(data.statusCode);
		}
	});
};

const getClosedRequests = (req, res) => {
	const { customerId } = req.params;
	apiGetRequest(
		`${GET_QUOTATIONS_URL}/${customerId}/closed`,
		req.session.customer
	).then(data => {
		if (data.statusCode === 200) {
			res.send(data.body);
		} else {
			res.sendStatus(data.statusCode);
		}
	});
};

const getCompletedRequests = (req, res) => {
	const { customerId } = req.params;
	apiGetRequest(
		`${GET_QUOTATIONS_URL}/${customerId}/completed`,
		req.session.customer
	).then(data => {
		if (data.statusCode === 200) {
			res.send(data.body);
		} else {
			res.sendStatus(data.statusCode);
		}
	});
};

const postQuotation = (req, res) => {
	const URL =
		req.url === `/${Q_WIRE_TRANSFER}`
			? POST_QUOTATIONS_WIRE_TRANSFER_URL
			: POST_QUOTATIONS_CC_URL;
	const customerId = customer.getCustomerId(req);
	const quotationItems = req.body.quotationItems.map((quotationItem, id) => {
		return {
			...quotationItem,
			tempId: ++id
		};
	});

	const cloneQuotationItems = quotationItems.map(quotationItem => {
		return {
			quantity: quotationItem.quantity,
			itemName: quotationItem.itemName,
			hasImage: quotationItem.hasImage,
			tempId: quotationItem.tempId
		};
	});

	const filterQuotationItems = quotationItems.filter(quotationItem => {
		return quotationItem.hasImage;
	});

	const { vinImage, ...filteredBody } = req.body;
	const body = {
		...filteredBody,
		customerId,
		quotationItems: cloneQuotationItems
	};

	apiPostRequest(URL, body, req.session.customer).then(data => {
		if (data.statusCode === 202 || data.statusCode === 200) {
			const parseData = JSON.parse(data.body);

			parseData.items.forEach(async item => {
				filterQuotationItems.forEach(quotationItem => {
					if (item.tempId === quotationItem.tempId) {
						upload(
							quotationItem.image,
							item.imageName,
							process.env.AWS_BUCKET_QUOTATION_ITEM
						);
					}
				});
			});

			if (body.imageAttached) {
				upload(
					vinImage,
					parseData.vehicleImageName,
					process.env.AWS_BUCKET_VIN
				);
			}

			res.status(data.statusCode).send(data.body);
		} else {
			res.sendStatus(data.statusCode);
		}
	});
};

const getQuotationPayment = (req, res) => {
	const { status: paymentStatus } = req.query;
	const quotationId = parseInt(req.query.quotationId);

	apiPutRequest(
		PUT_QUOTATION_PAYMENT_URL,
		{ quotationId, paymentStatus },
		req.session.customer
	).then(data => {
		res.sendStatus(data.statusCode);
	});
};

const putQuotationRequestRead = (req, res) => {
	const customerId = customer.getCustomerId(req);
	const { quotationId } = req.body;
	apiPutRequest(
		PUT_QUOTATION_READ_URL,
		{ customerId, quotationId },
		req.session.customer
	).then(data => {
		res.sendStatus(data.statusCode);
	});
};

module.exports = {
	getPendingRequests,
	getCompletedRequests,
	postQuotation,
	putQuotationRequestRead,
	getClosedRequests,
	getQuotationPayment
};
