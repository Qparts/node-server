const {
	GET_QUOTATIONS_URL, POST_QUOTATIONS_URL
} = require('../../../constants');
const { apiGetRequest, apiPostRequest, apiPutRequest } = require('../../apiRequest');
const { customer } = require('../../../../utils');
const upload = require('../../../../services/fileUpload');

const getPendingRequests = (req, res) => {

	const { customerId } = req.params;
	apiGetRequest(`${GET_QUOTATIONS_URL}/${customerId}/pending`, req.session.customer)
		.then(data => {
			if (data.statusCode === 200) {
				res.send(data.body);
			} else {
				res.send(data.statusCode);
			}
		});
}

const getCompletedRequests = (req, res) => {
	const { customerId } = req.params;
	apiGetRequest(`${GET_QUOTATIONS_URL}/${customerId}/completed`, req.session.customer)
		.then(data => {
			if (data.statusCode === 200) {
				res.send(data.body);
			} else {
				res.send(data.statusCode);
			}
		});
}

const postQuotation = (req, res) => {
	const customerId = customer.getCustomerId(req);
	const quotationItems = req.body.quotationItems.map((quotationItem, id) => {
		return {
			...quotationItem, tempId: ++id
		}
	});

	cloneQuotationItems = quotationItems.map(quotationItem => {
		return { 
			quantity: quotationItem.quantity, 
			itemName: quotationItem.itemName, 
			hasImage: quotationItem.hasImage, 
			tempId: quotationItem.tempId };
	});

	const filterQuotationItems = quotationItems.filter(quotationItem => {
		return quotationItem.hasImage;
	});

	const { vinImage, ...filteredBody } = req.body;
	const body = { ...filteredBody, customerId, quotationItems: cloneQuotationItems }

	apiPostRequest(POST_QUOTATIONS_URL, body, req.session.customer)
		.then(data => {
			if (data.statusCode === 200) {
				const parseData = JSON.parse(data.body);
				
				parseData.items.forEach(async(item) => {
					filterQuotationItems.forEach(quotationItem => {
						if(item.tempId === quotationItem.tempId) {
							upload(quotationItem.image, item.imageName, process.env.AWS_BUCKET_QUOTATION_ITEM);
						}
					});
				});

				if(body.imageAttached) {
					upload(vinImage, parseData.vehicleImageName, process.env.AWS_BUCKET_VIN);
				}

				res.send(data.body);

			} else {
				res.sendStatus(data.statusCode);
			}

		});
}

module.exports = {
	getPendingRequests,
	getCompletedRequests,
	postQuotation
}