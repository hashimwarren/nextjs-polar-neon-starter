import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const contentDirectory = path.join(process.cwd(), "content");

export interface Post {
	slug: string;
	year: string;
	title: string;
	date: string;
	description?: string;
	tags?: string[];
	published?: boolean;
	content: React.ReactElement;
}

export interface Newsletter {
	slug: string;
	title: string;
	date: string;
	description?: string;
	tags?: string[];
	published?: boolean;
	isPaid?: boolean;
	content: React.ReactElement;
}

export async function getAllPosts(): Promise<Omit<Post, "content">[]> {
	const postsDirectory = path.join(contentDirectory, "posts");

	if (!fs.existsSync(postsDirectory)) {
		return [];
	}

	const fileNames = fs.readdirSync(postsDirectory);
	const posts = await Promise.all(
		fileNames
			.filter((fileName) => fileName.endsWith(".mdx"))
			.map(async (fileName) => {
				const fullPath = path.join(postsDirectory, fileName);
				const fileContents = fs.readFileSync(fullPath, "utf8");
				const { data } = matter(fileContents);

				const slug = fileName.replace(/\.mdx$/, "");
				const date = new Date(data.date);
				const year = date.getFullYear().toString();

				return {
					slug,
					year,
					title: data.title,
					date: data.date,
					description: data.description,
					tags: data.tags || [],
					published: data.published !== false,
				};
			}),
	);

	return posts
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	try {
		const fullPath = path.join(contentDirectory, "posts", `${slug}.mdx`);

		if (!fs.existsSync(fullPath)) {
			return null;
		}

		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);

		const postDate = new Date(data.date);
		const postYear = postDate.getFullYear().toString();

		const { content: mdxContent } = await compileMDX({
			source: content,
			options: { parseFrontmatter: true },
		});

		return {
			slug,
			year: postYear,
			title: data.title,
			date: data.date,
			description: data.description,
			tags: data.tags || [],
			published: data.published !== false,
			content: mdxContent,
		};
	} catch (error) {
		console.error("Error reading post:", error);
		return null;
	}
}

export async function getAllNewsletters(): Promise<
	Omit<Newsletter, "content">[]
> {
	const newslettersDirectory = path.join(contentDirectory, "newsletter");

	if (!fs.existsSync(newslettersDirectory)) {
		return [];
	}

	const fileNames = fs.readdirSync(newslettersDirectory);
	const newsletters = await Promise.all(
		fileNames
			.filter((fileName) => fileName.endsWith(".mdx"))
			.map(async (fileName) => {
				const fullPath = path.join(newslettersDirectory, fileName);
				const fileContents = fs.readFileSync(fullPath, "utf8");
				const { data } = matter(fileContents);

				const slug = fileName.replace(/\.mdx$/, "");

				return {
					slug,
					title: data.title,
					date: data.date,
					description: data.description,
					tags: data.tags || [],
					published: data.published !== false,
					isPaid: data.isPaid || false,
				};
			}),
	);

	return newsletters
		.filter((newsletter) => newsletter.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNewsletterBySlug(
	slug: string,
): Promise<Newsletter | null> {
	try {
		const fullPath = path.join(contentDirectory, "newsletter", `${slug}.mdx`);

		if (!fs.existsSync(fullPath)) {
			return null;
		}

		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);

		const { content: mdxContent } = await compileMDX({
			source: content,
			options: { parseFrontmatter: true },
		});

		return {
			slug,
			title: data.title,
			date: data.date,
			description: data.description,
			tags: data.tags || [],
			published: data.published !== false,
			isPaid: data.isPaid || false,
			content: mdxContent,
		};
	} catch (error) {
		console.error("Error reading newsletter:", error);
		return null;
	}
}
