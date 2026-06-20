import { dash } from "../controllers/dash.controllers.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

export default async function dashRoutes(app) {

    app.get(
        "/",
        { preHandler: verifyAuth },
        dash
    )

}