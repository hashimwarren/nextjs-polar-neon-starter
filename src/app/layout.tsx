import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Next.js Polar Neon Starter",
	description: "A Next.js starter for blogging and paid newsletters",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<div className="relative flex min-h-screen flex-col bg-background">
					<SiteHeader />
					<main className="flex-1">{children}</main>
				</div>
			</body>
		</html>
	);
}
