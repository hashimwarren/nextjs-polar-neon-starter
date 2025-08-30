import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
				<Card className="max-w-md mx-auto">
					<CardHeader>
						<CardTitle className="text-xl">
							Subscribe to our newsletter
						</CardTitle>
						<CardDescription>
							Get the latest posts delivered right to your inbox
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="flex gap-2">
							<Input
								type="email"
								placeholder="Enter your email"
								className="flex-1"
							/>
							<Button type="submit">Subscribe</Button>
						</form>
					</CardContent>
				</Card>
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
								<Link href={`/blog/${post.slug}`} className="group">
									<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
										{post.title}
									</h3>
								</Link>
								{/* Date removed */}
								{post.description && (
									<p className="text-muted-foreground mb-3">
										{post.description}
									</p>
								)}
								{post.tags && post.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<Badge key={tag} variant="secondary">
												{tag}
											</Badge>
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
