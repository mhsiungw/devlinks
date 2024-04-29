/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's3.ap-southeast-2.amazonaws.com'
			}
		]
	},
	experimental: {
		serverActions: {
			allowedOrigins: ['minstack.lol', 'devlinks.minstack.lol']
		}
	}
};

export default nextConfig;
