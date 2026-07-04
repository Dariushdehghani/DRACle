import {
  acceptRequest,
  classesFetch,
  classMembers,
  classTeachers,
  fetchRequests,
  declineRequest,
} from "../controllers/class.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { requireClassJoin } from "../middleware/class.middleware.js";
import {
  requireAcademyLevel1,
  requireAcademyLevel2,
  requireAcademyLevel3,
} from "../middleware/role.middleware.js";

export default async function classRoutes(app) {
  // /api/fetch/classes/academy/

  //get all the classes for a special academy and user
  app.get("/:academy", { preHandler: verifyAuth }, classesFetch);

  //get the members list of a class
  app.get(
    "/:academy/class/:class/members",
    { preHandler: [verifyAuth, requireAcademyLevel3, requireClassJoin] },
    classMembers,
  );

  // get the teachers that are joined in an academy
  app.get(
    "/:academy/teachers",
    { preHandler: [verifyAuth, requireAcademyLevel3] },
    classTeachers,
  );

  // get the new join requests for an academy
  app.get(
    "/:academy/fetchRequests",
    { preHandler: [verifyAuth, requireAcademyLevel1] },
    fetchRequests,
  );

  // accept the join request from a user and join them
  app.post(
    "/:academy/requests/accept",
    { preHandler: [verifyAuth, requireAcademyLevel1] },
    acceptRequest,
  );

  app.post(
    "/:academy/requests/decline",
    { preHandler: [verifyAuth, requireAcademyLevel1] },
    declineRequest,
  );
}
