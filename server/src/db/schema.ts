import { pgTable, varchar, timestamp, text, integer, uniqueIndex } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("user", {
	id: text().primaryKey().notNull(),
	username: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("user_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
	uniqueIndex("user_username_key").using("btree", table.username.asc().nullsLast().op("text_ops")),
]);

export const academies = pgTable("academies", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	ownerId: text().notNull(),
	createdAt: timestamp().defaultNow()
})

export const invite_codes = pgTable("invite_codes", {
	code: text().notNull(),
	academyId: text().notNull(),
	expireAt: timestamp()
})

export const membership = pgTable("membership", {
	academyId: text().notNull(),
	userId: text().notNull(),
	role: text().notNull().default("student")
})

export const class_members = pgTable("class_members", {
	userId: text().notNull(),
	classId: text().notNull(),
	role: text().notNull(),
	joinedAt: timestamp().defaultNow()
})

export const classes = pgTable("classes", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	academyId: text().notNull(),
	teacherId: text().notNull(),
	createdAt: timestamp().defaultNow()
},
(table) => [
	uniqueIndex("academy_class_name_unique").on(table.academyId, table.name)
])

export const tasks = pgTable("tasks", {
	id: text().primaryKey().notNull(),
	createdBy: text().notNull(),
	classId: text().notNull(),
	doneByIds: text(),
	title: text().notNull(),
	description: text().notNull(),
	createdAt: timestamp().defaultNow(),
	expireAt: timestamp()
})

export const academy_requests = pgTable("academy_requests", {
	academyId: text().notNull(),
	userId: text().notNull(),
	requestedRole: text().notNull().default("student"),
	status: text().notNull(),
	message: text().notNull(),
	updatedAt: timestamp().defaultNow()
})