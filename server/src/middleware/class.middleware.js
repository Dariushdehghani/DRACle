import { class_members } from "../db/schema.ts";

export async function requireClassJoin(req, reply) {
  const userId = req.user.id;
  const classId = req.params.class;
  const academyId = req.params.academy;

  const permission = await db
    .select()
    .from(class_members)
    .where(
      and(eq(class_members.userId, userId), eq(class_members.classId, classId)),
    );
  if (!permission[0]) {
    return reply.code(403).send({
      message: "permission"
    })
  }
}
