import { z } from "zod";

export const regsterSchema = z.object({
    body:z.object({
        username:z.string({required_error:"userName is required"})
        .min(3,'username is more than 3'),

        password:z.string({required_error:'password is required'})
        .min(6,'password must be more than 6'),

        email:z.string({required_error:"email is required"})
    })
})