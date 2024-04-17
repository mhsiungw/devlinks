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
				protocol: 'http',
				hostname: 'server',
				port: '3000'
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
