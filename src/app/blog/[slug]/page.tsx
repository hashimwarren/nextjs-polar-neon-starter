import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.description,
    };
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container max-w-4xl mx-auto px-4 py-8">
                {/* Breadcrumb Navigation */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <li>
                            <Link href="/" className="hover:text-foreground transition-colors">
                                Home
                            </Link>
                        </li>
                        <li className="text-border">/</li>
                        <li>
                            <Link href="/blog" className="hover:text-foreground transition-colors">
                                Blog
                            </Link>
                        </li>
                        <li className="text-border">/</li>
                        <li className="text-foreground font-medium truncate">{post.title}</li>
                    </ol>
                </nav>

                <article className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                    {/* Article Header */}
                    <header className="px-8 py-12 text-center border-b border-border bg-gradient-to-br from-card to-muted/20">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-card-foreground">
                            {post.title}
                        </h1>
                        {post.description && (
                            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
                                {post.description}
                            </p>
                        )}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-sm">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Article Content */}
                    <div className="px-8 py-12">
                        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none
                            prose-headings:text-card-foreground prose-headings:font-bold prose-headings:scroll-mt-8
                            prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:first:mt-0
                            prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:first:mt-0
                            prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8
                            prose-p:text-card-foreground prose-p:leading-relaxed prose-p:mb-6
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                            prose-strong:text-card-foreground prose-strong:font-semibold
                            prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                            prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
                            prose-ul:space-y-2 prose-ol:space-y-2
                            prose-li:text-card-foreground prose-li:leading-relaxed
                            prose-hr:border-border prose-hr:my-8
                        ">
                            {post.content}
                        </div>
                    </div>
                </article>

                {/* Navigation Footer */}
                <footer className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <Link href="/">
                            <Button variant="outline" size="sm" className="gap-2">
                                ← Back to Home
                            </Button>
                        </Link>
                        <Link href="/blog">
                            <Button variant="outline" size="sm" className="gap-2">
                                View All Posts →
                            </Button>
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
