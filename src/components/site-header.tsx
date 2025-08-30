import Link from "next/link";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 max-w-screen-2xl items-center">
				<div className="mr-4 hidden md:flex">
					<Link className="mr-6 flex items-center space-x-2" href="/">
						<span className="hidden font-bold sm:inline-block">
							Next.js Polar Neon Starter
						</span>
					</Link>
					<nav className="flex items-center gap-6 text-sm">
						<Link
							className="transition-colors hover:text-foreground/80 text-foreground/60"
							href="/"
						>
							Home
						</Link>
						<Link
							className="transition-colors hover:text-foreground/80 text-foreground/60"
							href="/blog"
						>
							Blog
						</Link>
						<Link
							className="transition-colors hover:text-foreground/80 text-foreground/60"
							href="/newsletter"
						>
							Newsletter
						</Link>
					</nav>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<div className="w-full flex-1 md:w-auto md:flex-none">
						{/* Mobile menu button would go here */}
					</div>
				</div>
			</div>
		</header>
	);
}
