/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || "https://your-site.com",
	generateRobotsTxt: true,
	sitemapSize: 7000,
	changefreq: "daily",
	priority: 0.7,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
	},
	transform: async (config, path) => {
		// Custom priority for different page types
		if (path.includes("/blog/")) {
			return {
				loc: path,
				changefreq: "weekly",
				priority: 0.9,
				lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
			};
		}

		if (path.includes("/newsletter")) {
			return {
				loc: path,
				changefreq: "weekly",
				priority: 0.8,
				lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
			};
		}

		// Default
		return {
			loc: path,
			changefreq: config.changefreq,
			priority: config.priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
		};
	},
};
