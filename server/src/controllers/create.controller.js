import { and } from "drizzle-orm";
import {
  academies,
  class_members,
  classes,
  membership,
  users,
} from "../db/schema.ts";
import { db } from "../drizzle.js";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

export const createClass = async (req, reply) => {
  const className = req.params.classId;
  const userId = req.user.id;
  const academyId = req.params.academyId;
  const teacherName = req.params.teacher;

  try {
    const role = (
      await db
        .select({ role: membership.role })
        .from(membership)
        .where(
          and(
            eq(membership.academyId, academyId),
            eq(membership.userId, userId),
          ),
        )
    )[0].role;
    const teacher = (
      await db.select().from(users).where(eq(users.username, teacherName))
    )[0];
    if (
      (role === "owner" || role === "admin" || role === "assistant") &&
      teacherName
    ) {
      const existing_class = (
        await db
          .select()
          .from(classes)
          .where(
            and(eq(classes.academyId, academyId), eq(classes.name, className)),
          )
      )[0];
      if (!existing_class) {
        const id = createId();
        await db.insert(classes).values({
          id: id,
          name: className,
          academyId: academyId,
          teacherId: teacher.id,
        });
        await db
          .insert(class_members)
          .values(
            { userId: userId, classId: id, role: "owner" },
            { userId: teacher.id, classId: id, role: "teacher" },
          );
        return reply.status(200).send({
          message: "successfull",
        });
      } else {
        return reply.status(200).send({
          message: "exists",
        });
      }
    } else {
      return reply.status(200).send({
        message: "permission",
      });
    }
  } catch (err) {
    return reply.status(400).send({
      message: "server_err",
    });
  }
};

export const addUser = async (req) => {
  const academyId = req.params.academyId;
  const classId = req.params.classId;
  const userId = req.params.userId;
  const reqSender = req.user.id;
  const role = req.params.role;

  const sender_role = (
    await db
      .select({ role: class_members.role })
      .from(class_members)
      .where(
        and(
          eq(class_members.userId, reqSender),
          eq(class_members.classId, classId),
        ),
      )
  )[0].role;
  if (
    sender_role === "admin" ||
    sender_role === "teacher" ||
    sender_role === "assistant" ||
    sender_role === "owner"
  ) {
    const user = (
      await db
        .select()
        .from(users)
        .leftJoin(
          membership,
          and(
            eq(membership.userId, users.id),
            eq(membership.academyId, academyId),
          ),
        )
        .where(eq(users.id, userId))
    )[0];
    if (user) {
      await db
        .insert(class_members)
        .values({ userId: userId, classId: classId, role: role });
      return {
        message: "successful",
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      };
    } else {
      return {
        message: "user_not_found",
      };
    }
  } else {
    return {
      message: "permission",
    };
  }
};
