import {
  classesFetch,
  classMembers,
  classTeachers,
  fetchRequests,
} from "../controllers/class.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { requireClassJoin } from "../middleware/class.middleware.js";
import {
  requireAcademyLevel1,
  requireAcademyLevel2,
  requireAcademyLevel3,
} from "../middleware/role.middleware.js";

export default async function classRoutes(app) {
  app.get("/:academy", { preHandler: verifyAuth }, classesFetch);
  app.get(
    "/:academy/class/:class/members",
    { preHandler: [verifyAuth, requireAcademyLevel3, requireClassJoin] },
    classMembers,
  );
  app.get(
    "/:academy/teachers",
    { preHandler: [verifyAuth, requireAcademyLevel3] },
    classTeachers,
  );
  app.get(
    "/:academy/fetchRequests",
    { preHandler: [verifyAuth, requireAcademyLevel1] },
    fetchRequests,
  );
}
