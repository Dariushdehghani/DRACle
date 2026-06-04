import { register, login, me, checkAccount } from "../controllers/auth.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

export default async function authRoutes(app) {

    app.post("/register", register)
    app.post("/login", login)
    app.get(
        "/me",
        { preHandler: verifyAuth },
        me
    )
    app.post("/check-account", checkAccount)

}