import { z } from "zod";

export const loginSchema = z.object({
    body:z.object({
        username:z.string({required_error:"userName is required"}),
        password:z.string({required_error:"password is required"})
    })
})

