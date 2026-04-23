import {
  pgTable,
  uuid,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("member"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  confirmed: boolean("confirmed").default(false),
  confirmToken: uuid("confirm_token").defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
});

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postSlug: varchar("post_slug", { length: 200 }).notNull(),
    authorName: varchar("author_name", { length: 100 }).notNull(),
    authorEmail: varchar("author_email", { length: 200 }).notNull(),
    body: text("body").notNull(),
    approved: boolean("approved").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_comments_slug").on(
      table.postSlug,
      table.approved,
      table.createdAt
    ),
  ]
);

export const sentNewsletters = pgTable("sent_newsletters", {
  id: uuid("id").primaryKey().defaultRandom(),
  postSlug: varchar("post_slug", { length: 200 }).notNull().unique(),
  sentAt: timestamp("sent_at", { withTimezone: true }).defaultNow(),
  recipientCount: integer("recipient_count"),
});
