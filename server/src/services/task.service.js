import { class_members, tasks } from "../db/schema.ts";
import { db } from "../drizzle.js";
import { eq } from "drizzle-orm"

export function getTasks(userId) {
    return db.select({ id: tasks.id, title: tasks.title, description: tasks.description, createdAt: tasks.createdAt, creator: tasks.createdBy }).from(class_members).leftJoin(tasks, eq(class_members.classId, tasks.classId)).where(eq(class_members.userId, userId))
}