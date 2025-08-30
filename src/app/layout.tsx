import type { Metadata } from "next";
import "./globals.css";

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
			<body className="antialiased">{children}</body>
		</html>
	);
}
