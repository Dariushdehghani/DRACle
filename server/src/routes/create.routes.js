import { addUser, createClass } from "../controllers/create.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

export default async function createRoutes(app) {

    app.post("/:academyId/:classId/teacher/:teacher/create", { preHandler: verifyAuth }, createClass)
    app.get("/:academyId/:classId/add-user/:role/:userId/", { preHandler: verifyAuth }, addUser)

}