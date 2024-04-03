module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: 'airbnb-base',
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		indent: ['error', 'tab'],
		'arrow-parens': ['error', 'as-needed'],
		'no-tabs': 'off',
		'no-use-before-define': ['error', { functions: false }],
		'comma-dangle': ['error', 'never'],
		'object-curly-newline': 'off'
	}
};
