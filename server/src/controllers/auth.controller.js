import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { id } from "zod/v4/locales";

export const register = async () => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                OR: {
                    username: username,
                    email: email
                }
            }
        });

        if (existingUser) {
            return reply
            .status(400)
            .send({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });

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
            message: "Registered successfully"
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

export const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return reply
            .status(404)
            .send({
                message: "User not found"
            })
        }

        const validPass = await bcrypt.compare(
            password,
            user.password
        )

        if (!validPass) {
            return reply
            .status(401)
            .send({
                message: "Invalid password"
            })
        }

        const token = await reply.jwtSign({
            id: user.id,
            email: user.email
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
                id: user.id,
                username: user.username,
                email: user.email
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