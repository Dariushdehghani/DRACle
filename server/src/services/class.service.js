import { class_members, classes } from "../db/schema.ts";
import { db } from "../drizzle.js";
import { eq } from "drizzle-orm"

export async function getClasses(userId) {
    return await db.select({ id: classes.id, name: classes.name }).from(class_members).leftJoin(classes, eq(class_members.classId, classes.id)).where(eq(class_members.userId, userId))
}