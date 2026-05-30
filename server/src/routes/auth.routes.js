import { register, login } from "../controllers/auth.controller.js";

export default async function authRoutes(app) {

    app.post("/register", register)
    app.post("/login", login)

}