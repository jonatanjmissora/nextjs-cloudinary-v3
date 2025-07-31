import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https", // Specify the protocol (e.g., 'http', 'https')
				hostname: "res.cloudinary.com", // The exact hostname of the image source
				// port: '', // Optional: If a specific port is required
				// pathname: '/path/to/images/**', // Optional: Specify a path prefix
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "5mb",
		},
	},
}

export default nextConfig
