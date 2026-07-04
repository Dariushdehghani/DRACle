import { and, eq } from "drizzle-orm";
import {
  academy_requests,
  class_members,
  classes,
  membership,
  users,
} from "../db/schema.ts";
import { db } from "../drizzle.js";

export const classesFetch = async (req) => {
  const userId = req.user.id;
  try {
    const Tclasses = await db
      .select({
        className: classes.name,
        classId: classes.id,
        teacherId: classes.teacherId,
        role: class_members.role,
      })
      .from(class_members)
      .leftJoin(classes, eq(class_members.classId, classes.id))
      .where(eq(class_members.userId, userId));
    if (Tclasses) {
      return Tclasses;
    } else {
      return {
        message: "not_found",
      };
    }
  } catch (err) {
    return {
      message: "server_error: " + err,
    };
  }
};

export const classMembers = async (req) => {
  const classId = req.params.class;
  const academyId = req.params.academy;
};

export const classTeachers = async (req) => {
  try {
    const academy = req.params.academy;
    const teachers = await db
      .select({ username: users.username, id: users.id })
      .from(membership)
      .leftJoin(users, eq(membership.userId, users.id))
      .where(
        and(eq(membership.academyId, academy), eq(membership.role, "teacher")),
      );
    return teachers;
  } catch (err) {
    return {
      message: "err: " + err,
    };
  }
};

export const fetchRequests = async (req) => {
  const academy = req.params.academy;
  try {
    const requests = await db
      .select({
        userId: users.id,
        username: users.username,
        updatededAt: academy_requests.updatedAt,
        role: academy_requests.requestedRole,
        message: academy_requests.message,
        status: academy_requests.status
      })
      .from(academy_requests)
      .leftJoin(users, eq(academy_requests.userId, users.id))
      .where(eq(academy_requests.academyId, academy));

    return requests
  } catch {
    return {
      message: "server err",
    };
  }
};

export const acceptRequest = async (req, reply) => {
  const academy = req.params.academy
  const { userId } = req.body
  try {
    const request = (
      await db
        .select()
        .from(academy_requests)
        .where(
          and(
            eq(academy_requests.userId, userId),
            eq(academy_requests.academyId, academy)
          )
        )
        .limit(1)
    )[0];

    if (!request) {
      return reply
        .status(200)
        .send({
          message: "req_not_found"
        })
    }

    const user = (
      await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1)
    )[0];

    if (!user) {
      return reply
        .status(200)
        .send({
          message: "user_not_found"
        })
    }

    const exists = (
      await db
        .select()
        .from(membership)
        .where(
          and(
            eq(membership.userId, userId),
            eq(membership.academyId, academy)
          )
        )
        .limit(1)
    )[0];

    if (exists) {
      return reply
        .status(200)
        .send({
          message: "exists"
        })
    }

    await db.transaction(async (tx) => {
      await tx.insert(membership).values({
        academyId: academy,
        userId,
        role: request.requestedRole
      })

      await tx.delete(academy_requests).where(
        and(
          eq(academy_requests.userId, userId),
          eq(academy_requests.academyId, academy)
        )
      )
    })

    return reply
      .status(200)
      .send({
        message: "done"
      })
  } catch (err) {
    reply
      .status(400)
      .send({
        message: "server_err" + err
      })
  }
}

export const declineRequest = async (req, reply) => {
  const academy = req.paras.academy
  const { userId } = req.body
  try {
    await db
      .update(academy_requests)
      .set({ status: "not_approved" })
      .where(and(
        eq(academy_requests.userId, userId),
        eq(academy_requests.academyId, academy)
      ))
    return reply
      .status(200)
      .send({
        message: "done"
      })
  } catch {
    return reply
      .status(400)
      .send({
        message: "server_err"
      })
  }
}