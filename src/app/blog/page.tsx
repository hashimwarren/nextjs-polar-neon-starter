import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function BlogPage() {
	const posts = await getAllPosts();

	return (
		<div className="container max-w-6xl mx-auto px-4 py-8">
			{/* Page Header */}
			<div className="text-center mb-12">
				<h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Discover insights, tutorials, and thoughts on modern web development
				</p>
			</div>

			{/* Posts Grid */}
			{posts.length === 0 ? (
				<Card className="p-8 text-center">
					<p className="text-muted-foreground text-lg">
						No posts found. Add some MDX files to the content/posts directory!
					</p>
				</Card>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<Card key={post.slug} className="group hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-card to-muted/10">
							<CardContent className="p-6">
								<Link href={`/blog/${post.slug}`} className="block">
									<h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
										{post.title}
									</h2>
								</Link>
								{post.description && (
									<p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
										{post.description}
									</p>
								)}
								{post.tags && post.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{post.tags.slice(0, 3).map((tag) => (
											<Badge key={tag} variant="secondary" className="text-xs">
												{tag}
											</Badge>
										))}
										{post.tags.length > 3 && (
											<Badge variant="outline" className="text-xs">
												+{post.tags.length - 3} more
											</Badge>
										)}
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
