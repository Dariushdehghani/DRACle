import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import cookie from "@fastify/cookie"
import jwt from "@fastify/jwt"
import authRoutes from "./routes/auth.routes.js";

app.register(cors, {
    origin: "http://localhost:5173",
    cridentials: true
})
app.register(helmet)
app.register(cookie)
app.register(jwt, {
    secret: process.env.JWT_SECRET
})

await app.register(authRoutes, {
    prefix: "/api/auth"
})

app.get("/", async () => {
    return{
        message: "Hello world"
    }
});

const start = async () => {
    try {
        await app.listen({
            port: process.env.PORT || 5000
        })
        console.log("Server running on port " + process.env.PORT)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()