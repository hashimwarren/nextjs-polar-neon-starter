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
		<div className="container max-w-6xl mx-auto px-4 py-8">
			{/* Hero Section */}
			<section className="text-center py-16 mb-16">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-6">
						Next.js Polar Neon Starter
					</h1>
					<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
						A modern blogging platform with paid newsletters, built with Next.js 15,
						Tailwind CSS, and powered by Neon Database
					</p>

					{/* Newsletter Signup */}
					<Card className="max-w-lg mx-auto shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
						<CardHeader className="pb-4">
							<CardTitle className="text-2xl">Join Our Newsletter</CardTitle>
							<CardDescription className="text-base">
								Get the latest posts and insights delivered to your inbox
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="flex flex-col sm:flex-row gap-3">
								<Input
									type="email"
									placeholder="Enter your email address"
									className="flex-1 h-11"
								/>
								<Button type="submit" size="lg" className="h-11 px-8">
									Subscribe
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Blog Posts Section */}
			<section>
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-3xl font-bold">Latest Posts</h2>
					<Link
						href="/blog"
						className="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						View all posts →
					</Link>
				</div>

				{posts.length === 0 ? (
					<Card className="p-8 text-center">
						<p className="text-muted-foreground text-lg">
							No posts found. Add some MDX files to the content/posts directory!
						</p>
					</Card>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{posts.slice(0, 6).map((post) => (
							<Card key={post.slug} className="group hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-card to-muted/10">
								<CardContent className="p-6">
									<Link href={`/blog/${post.slug}`} className="block">
										<h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
											{post.title}
										</h3>
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
			</section>
		</div>
	);
}
