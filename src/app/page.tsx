import { format } from "date-fns";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default async function Home() {
	const posts = await getAllPosts();

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<header className="mb-12 text-center">
				<h1 className="text-4xl font-bold mb-4">Next.js Polar Neon Starter</h1>
				<p className="text-lg text-muted-foreground mb-8">
					A modern blogging platform with paid newsletters
				</p>

				{/* Newsletter Signup */}
				<div className="bg-card border rounded-lg p-6 max-w-md mx-auto">
					<h2 className="text-xl font-semibold mb-2">
						Subscribe to our newsletter
					</h2>
					<p className="text-muted-foreground mb-4">
						Get the latest posts delivered right to your inbox
					</p>
					<form className="flex gap-2">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 px-3 py-2 border border-input bg-background rounded-md"
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
						>
							Subscribe
						</button>
					</form>
				</div>
			</header>

			<main>
				<h2 className="text-2xl font-bold mb-8">Latest Posts</h2>

				{posts.length === 0 ? (
					<p className="text-muted-foreground">
						No posts found. Add some MDX files to the content/posts directory!
					</p>
				) : (
					<div className="space-y-8">
						{posts.map((post) => (
							<article key={post.slug} className="border-b border-border pb-8">
								<Link
									href={`/blog/${post.year}/${post.slug}`}
									className="group"
								>
									<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
										{post.title}
									</h3>
								</Link>
								<div className="text-sm text-muted-foreground mb-3">
									{format(new Date(post.date), "MMMM dd, yyyy")}
								</div>
								{post.description && (
									<p className="text-muted-foreground mb-3">
										{post.description}
									</p>
								)}
								{post.tags && post.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</article>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
