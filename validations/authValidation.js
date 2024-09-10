import { z } from "zod"

export const registerSchema = z.object({
    name: z.string({ message: "name is required" }).min(2, { message: "Name must be at least 2 characters long" })
        .max(150, { message: "Name must be at most 150 characters long" }),
    email: z.string({ message: "email  is required" }).email({ message: "Invalid email address" }),
    password: z.string({ message: "password is required" }).min(6, { message: "Password must be at least 6 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" })
});


export const loginSchema = z.object({
    email: z.string({ message: "email  is required" }).email({ message: "Invalid email address" }),
    password: z.string({ message: "password is required" })
});
