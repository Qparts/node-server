const { webpush } = require('../server');

exports.setWebpush = () => {

	webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY);
	webpush.setVapidDetails(
		process.env.WEBPUSH_EMAIL,
		process.env.WEBPUSH_PUBLIC_KEY,
		process.env.WEBPUSH_PRIVATE_KEY
	);
};
