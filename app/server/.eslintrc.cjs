module.exports = {
	extends: ['../../.eslintrc.cjs'],
	rules: {
		'import/extensions': [
			'error',
			{
				js: 'always',
			},
		],
		'consistent-return': 'off',
	},
};
