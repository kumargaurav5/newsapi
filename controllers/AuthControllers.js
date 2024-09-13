import prisma from "../DB/db.config.js";
import { loginSchema, registerSchema, mailSchema } from "../validations/authValidation.js";
import { ZodError } from "zod";
import bcrypt from "bcrypt"
import { errorFomatter } from "../utils/helper.js";
import jwt from "jsonwebtoken"
import { sendEmail } from "../config/mailer.js";
import { emailQueue, emailQueueName } from "../jobs/sendemailjob.js";

class AuthController {
    static async register(req, res) {
        const body = req.body;
        try {
            const payload = registerSchema.parse(body)
            const existingUser = await prisma.users.findUnique({
                where: {
                    email: payload.email
                }
            });

            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            const salt = bcrypt.genSaltSync(10)
            payload.password = bcrypt.hashSync(payload.password, salt)
            const user = await prisma.users.create({
                data: payload
            })

            return res.status(201).json({ payload: user })

        } catch (error) {

            if (error instanceof ZodError) {
                const errors = errorFomatter(error)
                return res.status(422).json({ message: errors })

            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }

        }


    }

    static async login(req, res) {
        const body = req.body;
        try {
            const payload = loginSchema.parse(body)
            const user = await prisma.users.findUnique({
                where: {
                    email: payload.email
                }
            })

            if (user) {
                if (!bcrypt.compareSync(payload.password, user.password)) {
                    return res.status(400).json({ message: "Invalid credentials " })
                }

                //issue a token 
                const payloadData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    profile: user.profile
                }
                const token = jwt.sign(payloadData, process.env.JWT_SCERET, {
                    expiresIn: "365d"
                })
                return res.status(200).json({ access_token: `Bearer ${token}`, message: "Loggged in" })
            }

            return res.status(404).json({ message: "user not found with this email" })


        } catch (error) {
            if (error instanceof ZodError) {
                const errors = errorFomatter(error)
                return res.status(422).json({ message: errors })

            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }
        }

    }

    static async sendTestEmail(req, res) {
        try {
            const { email } = req.query
            const verifiedemail = mailSchema.parse(email)
            console.log(verifiedemail)
            const payload = {
                toEmail: verifiedemail,
                subject: "Hey I am good",
                body: "<h1>I am Kumar Gaurav. wish you all the best . See you in future.</h1>"
            }
            // await sendEmail(payload.toEmail, payload.subject , payload.body)
            await emailQueue.add(emailQueueName, payload)
            return res.status(200).json({ message: "Job added Successfully" })

        } catch (error) {
            if (error instanceof ZodError) {
                const errors = errorFomatter(error)
                console.log(error)
                return res.status(422).json({ message: errors })

            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }
        }

    }
}

export default AuthController