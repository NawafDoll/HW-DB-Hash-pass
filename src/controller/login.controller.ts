import {User} from '@prisma/client'
import { PrismaClientExtensionError } from '@prisma/client/runtime';
import { error } from 'console';
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../config/db'
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'

export const loginHandler = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const {username,password} = req.body as User
        const user =  await prisma.user.findFirst({
            where:{username}
        })
        if(!user){
           return res.status(400).json({message:"username is wrong"})
        }

        const isValidPass =  await argon2.verify(password , user.password)

        if(!isValidPass){
            return res.status(400).json({message:"password is wrong"})
        }

        const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET as string)

        return res.status(200).json({message:`Welcome ${username}`,token})
        }
        catch(err){
            console.log(err)
            return res.status(400).json("Server Error")
        }
    }