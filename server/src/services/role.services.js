import { and, eq } from "drizzle-orm"
import { membership } from "../db/schema.ts"
import { db } from "../drizzle.js"

export function requireAcademyRole(roles) {
  return async (req, reply) => {
    const userId = req.user.id 
    const academy = req.params.academy
    const memberships = await db.select({ role: membership.role }).from(membership).where(and(eq(membership.userId, userId), eq(membership.academyId, academy)))
    if (!memberships.length || !roles.includes(memberships[0].role)) {
      return reply.code(403).send({
        message: "permission",
      });
    }
  }
}