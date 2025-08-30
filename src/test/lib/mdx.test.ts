import { describe, expect, it, vi } from "vitest";
import { getAllPosts } from "@/lib/mdx";

// Mock the mdx functions for testing
vi.mock("@/lib/mdx", () => ({
	getAllPosts: vi.fn().mockResolvedValue([
		{
			slug: "test-post",
			year: "2024",
			title: "Test Post",
			date: "2024-08-30",
			description: "A test post",
			tags: ["test"],
			published: true,
		},
	]),
}));

describe("MDX utilities", () => {
	it("should fetch posts correctly", async () => {
		const posts = await getAllPosts();
		expect(posts).toHaveLength(1);
		expect(posts[0].title).toBe("Test Post");
	});
});
