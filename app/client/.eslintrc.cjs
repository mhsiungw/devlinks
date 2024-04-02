module.exports = {
	extends: 'next/core-web-vitals',
	settings: {
		'import/resolver': {
			alias: {
				extensions: ['.js', '.jsx'],
				map: [['@', './src']]
			}
		}
	}
};
