/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'dark-gray': '#333333',
				gray: '#737373',
				purple: '#633CFF',
				white: '#fff',
				border: '#D9D9D9',
			},
		},
	},
	plugins: [],
};
