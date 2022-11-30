import express from "express";
import { loginHandler } from "../controller/login.controller";
import { getAllusersHandler, regsterHandler } from "../controller/regster.controller";
import protect from "../middelware/protect";
import validate from "../middelware/validate";
import { loginSchema } from "../zodSchema/login.zod";
import { regsterSchema } from "../zodSchema/regster.zod";
// import db from '../config/db'

export const authRouter = express.Router()

authRouter.post('/regster',validate(regsterSchema),regsterHandler)
authRouter.post('/login',validate(loginSchema),loginHandler)
authRouter.get('/users',protect,getAllusersHandler)

export default authRouter