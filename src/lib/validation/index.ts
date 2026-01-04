import { z } from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, {error: "Name must be at least 2 characters"}).max(100, {error:"Name must be at most 100 characters"}),
    username: z.string().min(2).max(50),
    email: z.email({error: "Invalid email address"}),
    password: z.string().min(8, {error: "Password must be at least 6 characters"}).max(100, {error: "Password must be at most 100 characters"}),
})