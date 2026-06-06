import bcrypt from "bcrypt";
import { db } from "../drizzle.js"; 
import { id } from "zod/v4/locales";
import { academies, academy_requests, invite_codes, membership, users } from "../db/schema.ts"
import { eq, or, count } from "drizzle-orm";
import { verify } from "node:crypto";
import { createId } from "@paralleldrive/cuid2"
import app from "../app.js";

export const register = async (req, reply) => {
    try {
        console.log(req.body)
        const { username, email, password, academyAction, role, academy } = req.body;

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

        if (academyAction === "create") {
            const existingAcademy = await db.select({ count: count() }).from(academies).where(eq(academies.name, academy))
            if (existingAcademy[0]["count"] > 0) {
                return reply
                .status(200)
                .send({
                    message: "Academy already exists"
                })
            }
            const aid = createId()
            await db.insert(academies).values({id: aid, name: academy, ownerId: id})
            await db.insert(membership).values({academyId: aid, userId:id, role: "owner"})
        } else if (academyAction === "join") {
            const invite = await db.select().from(invite_codes).where(eq(invite_codes.code, academy))
            if (invite) {
                await db.insert(academy_requests).values({academyId: academy, userId: id, requestedRole: role, status: "pending", message: ""})
            }
        } else {
            reply
            .status(404)
            .send({message: "Invalid request"})
        }
        
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

export async function me(request) {
    try {

        const user = (await db.select().from(users).where(eq(users.id, request.user.id)))[0]
        const memberships = (await db.select().from(membership).leftJoin(academies, eq(membership.academyId, academies.id)).where(eq(membership.userId, user.id)))

        if (!memberships.length) {
            return Error("User memberships doesn't exist")
        }

        return {
            username: user.username,
            email: user.email,
            memberships
        }

    } catch (err) {
        console.log(err)
    }
}

export const checkAccount = async (req, reply) => {
    try {
        const { username, email } = req.body;
        let availability = {
            username: true,
            email: true
        }

        const existingUsername = await db.select({ count: count() }).from(users).where(eq(users.username, username))

        if (existingUsername[0]["count"] > 0) {
            availability.username = false
        }

        const existingEmail = await db.select({ count: count() }).from(users).where(eq(users.email, email))

        if (existingEmail[0]["count"] > 0) {
            availability.email = false
        }
        if (!(availability.username && availability.email)) {
            return reply
            .status(200)
            .send({
                message: "User already exists",
                availability
            });
        } else {
            return reply
            .status(200)
            .send({
                message: "available"
            })
        }

    } catch (err) {
        console.log(err)
        return reply
        .status(500)
        .send({ message: "server error" })
    }
}