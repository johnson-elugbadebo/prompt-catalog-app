/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['mongoose'],
	},
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	webpack(config) {
		config.experiments = { ...config.experiments, topLevelAwait: true };
		return config;
	},
	reactStrictMode: true,
	devIndicators: {
		buildActivityPosition: 'bottom-right',
	},
	eslint: {
		dirs: ['app', 'components', 'models'],
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
