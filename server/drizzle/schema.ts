import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const academies = pgTable("academies", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
	ownerId: text().notNull(),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	username: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("user_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
	uniqueIndex("user_username_key").using("btree", table.username.asc().nullsLast().op("text_ops")),
]);

export const classMembers = pgTable("class_members", {
	userId: text().notNull(),
	classId: text().notNull(),
	joinedAt: timestamp({ mode: 'string' }).defaultNow(),
});

export const classes = pgTable("classes", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
});

export const membership = pgTable("membership", {
	academyId: text().notNull(),
	userId: text().notNull(),
	role: text().default('student').notNull(),
});

export const tasks = pgTable("tasks", {
	id: text().primaryKey().notNull(),
	classId: text().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
});

export const academyRequests = pgTable("academy_requests", {
	academyId: text().notNull(),
	userId: text().notNull(),
	requestedRole: text().default('student').notNull(),
	status: text().notNull(),
	message: text().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow(),
});

export const inviteCodes = pgTable("invite_codes", {
	code: text().notNull(),
	academyId: text().notNull(),
	expireAt: timestamp({ mode: 'string' }),
});
