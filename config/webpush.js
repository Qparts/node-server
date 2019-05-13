const { webpush } = require('../server');

exports.setWebpush = () => {

	webpush.setGCMAPIKey('AIzaSyAfGXSVcNGluSjheESGmSe-X6oHxxvumhU');
	webpush.setVapidDetails(
		'mailto:ahmed.vuw@gmail.com',
		'BHJi5MpWRcO9_TPQ7Uotn4padQLFf9X3ut6lY60NbGBWSfpw-8sb2UOscnd_tdy9v6LWEO4-HeJnRjkWHFoq1V4',
		'yCYAiR9uo-cZRd4Ic6lcJL81BN2GFNqOccgo4pAOThg'
	);
}
