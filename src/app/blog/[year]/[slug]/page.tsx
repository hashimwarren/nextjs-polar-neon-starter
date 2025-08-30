import { format } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

interface PageProps {
	params: Promise<{
		year: string;
		slug: string;
	}>;
}

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		year: post.year,
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { year, slug } = await params;
	const post = await getPostBySlug(year, slug);

	if (!post) {
		return {};
	}

	return {
		title: post.title,
		description: post.description,
	};
}

export default async function BlogPost({ params }: PageProps) {
	const { year, slug } = await params;
	const post = await getPostBySlug(year, slug);

	if (!post) {
		notFound();
	}

	return (
		<article className="max-w-4xl mx-auto px-4 py-8">
			<header className="mb-8">
				<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
				<div className="text-muted-foreground mb-4">
					{format(new Date(post.date), "MMMM dd, yyyy")}
				</div>
				{post.description && (
					<p className="text-lg text-muted-foreground">{post.description}</p>
				)}
			</header>
			<div className="prose prose-lg max-w-none">{post.content}</div>
		</article>
	);
}
