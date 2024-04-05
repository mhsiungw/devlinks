/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				'dark-gray': '#333333',
				grey: '#737373',
				'light-grey': '#FAFAFA',
				purple: '#633CFF',
				'light-purple': '#EFEBFF',
				white: '#fff',
				border: '#D9D9D9'
			}
		}
	},
	plugins: []
};
