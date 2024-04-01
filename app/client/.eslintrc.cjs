module.exports = {
	extends: 'next/core-web-vitals',
	rules: {
		'arrow-parens': [
			'error',
			'as-needed',
		],
	},
	settings: {
		'import/resolver': {
			alias: {
				extensions: ['.js', '.jsx'],
				map: [
					['@', './src'],
				],
			},
		},
	},
};
