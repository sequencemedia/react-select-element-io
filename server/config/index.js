/* eslint-disable */

module.exports = function () {
	switch (process.env.NODE_ENV) {
		case 'production':
			return {
				'server': {
					'connection': {
						'port': process.env.PORT
					}
				}
			}
		default:
			return {
				'server': {
					'connection': {
						'port': 5000
					}
				}
			}
	}
}