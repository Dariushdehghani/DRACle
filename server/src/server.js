import dotenv from "dotenv/config";
import app from "./app.js";

import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import cookie from "@fastify/cookie"
import jwt from "@fastify/jwt"
import { Server } from "socket.io"
import authRoutes from "./routes/auth.routes.js";
import { verifyAuth } from "./middleware/auth.middleware.js";
import dashRoutes from "./routes/dash.routes.js";
import createRoutes from "./routes/create.routes.js";
import classRoutes from "./routes/class.routes.js";

await app.register(cors, {
    origin: "http://localhost:5173",
    credentials: true
  })
app.register(helmet)
app.register(cookie)
app.register(jwt, {
    secret: process.env.JWT_SECRET,
    cookie: {
        cookieName: "token"
    }
})

await app.register(authRoutes, {
    prefix: "/api/auth"
})

await app.register(dashRoutes, {
    prefix: "/api/fetch/dash"
})

await app.register(classRoutes, {
    prefix: "/api/fetch/classes/academy/"
})

await app.register(createRoutes, {
    prefix: "/api/academies"
})

app.get("/", async () => {
    return{
        message: "Hello world"
    }
});

const io = new Server(app.server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

io.on("connection", socket => {
    console.log("user connected: " + socket.id)

    socket.on("disconnect", () => {
        comsole.log("User disconnected: " + socket.id)
    })
})

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