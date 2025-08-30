import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: text("email").notNull().unique(),
	name: text("name"),
	role: text("role").notNull().default("subscriber"), // admin, subscriber, paidSubscriber
	polarCustomerId: text("polar_customer_id"),
	subscriptionStatus: text("subscription_status"), // active, cancelled, past_due
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export const drafts = pgTable("drafts", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	type: text("type").notNull(), // post, newsletter
	slug: text("slug"),
	tags: text("tags"), // JSON string
	isPaid: boolean("is_paid").default(false),
	authorId: uuid("author_id")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: text("email").notNull().unique(),
	subscribed: boolean("subscribed").default(true),
	subscribedAt: timestamp("subscribed_at").defaultNow(),
	unsubscribedAt: timestamp("unsubscribed_at"),
});
