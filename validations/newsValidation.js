import { z } from "zod"


export const newSchema= z.object({
    title: z.string({ message: "Title is required" }).min(5, { message: "Title must be at least 5 characters long" }).max(190, { message: "Title must be at max 190 characters long" }), 
    content: z.string({ message: "Content is required" }).min(10, { message: "Content must be at least 10 characters long" }).max(30000, { message: "Content must be at max 30000 characters long" })
})