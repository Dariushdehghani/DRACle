import bcrypt from "bcrypt";
import { db } from "../drizzle.js"; 
import { id } from "zod/v4/locales";
import { users } from "../db/schema.ts"
import { eq, or, count } from "drizzle-orm";
import { verify } from "node:crypto";
import { createId } from "@paralleldrive/cuid2"
import app from "../app.js";

export const register = async (req, reply) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await db.select({ count: count() }).from(users).where(or(eq(users.username, username), eq(users.email, email)))

        if (existingUser[0]["count"] > 0) {
            return reply
            .status(400)
            .send({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const id = createId()
        
        const user = await db.insert(users).values({id: id, username, email, password: hashedPassword})

        const token = app.jwt.sign({
            id: user.id
        })

        reply.setCookie("token", token, {
            path: "/",
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        })

        return reply.send({
            message: "Registered successfully",
            user: {
                id,
                username,
                email
            }
        });
    } catch (err) {
        console.log(err)

        return reply
        .status(500)
        .send({
            message: "Server error"
        })
    }
}

export const login = async (req, reply) => {
    try {
        const {
            email,
            password
        } = req.body

        const Tuser = (await db.select().from(users).where(or(eq(users.email, email), eq(users.username, email))))[0]

        console.log("the user to bcrypt:" + JSON.stringify(Tuser))

        if (!Tuser) {
            return reply
            .status(404)
            .send({
                message: "User not found"
            })
        }

        const validPass = await bcrypt.compare(
            password,
            Tuser.password
        )

        if (!validPass) {
            return reply
            .status(401)
            .send({
                message: "Invalid password"
            })
        }

        const token = await reply.jwtSign({
            id: Tuser.id
        })

        reply.setCookie(
            "token", token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/"
            }
        )

        return reply.send({
            message: "Login successful",
            user: {
                id: Tuser.id,
                username: Tuser.username,
                email: Tuser.email
            }
        })
    } catch (err) {
        console.log(err)
        return reply
        .status(500)
        .send({
            message: "Server error"
        })
    }
}

export async function me(request, reply) {
    const Tuser = (await db.select().from(users).where(eq(request.user.id, users.id)))[0]

    return {
        id: Tuser.id,
        username: Tuser.username,
        email: Tuser.email
    }
}