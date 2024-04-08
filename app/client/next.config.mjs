/** @type {import('next').NextConfig} */
const nextConfig = {
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
	}
};

export default nextConfig;
