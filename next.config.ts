import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	// Security headers
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/blog/:year/:slug",
				destination: "/blog/:slug",
				permanent: true,
			},
		];
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm, remarkFrontmatter],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
