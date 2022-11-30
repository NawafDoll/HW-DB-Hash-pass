import {User} from '@prisma/client'
import { PrismaClientExtensionError } from '@prisma/client/runtime';
import { error } from 'console';
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../config/db'


export const loginHandler = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const {username,password} = req.body as User
        const isValidUsername =  await prisma.user.findFirst({
            where:{username}
        })
        if(!isValidUsername){
           return res.status(400).json({message:"username is wrong"})
        }
        const isValidPass = await prisma.user.findFirst({
            where:{password}
        })
        if(!isValidPass){
            return res.status(400).json({message:"password is wrong"})
        }
        return res.status(200).json({message:`Welcome ${username}`})
        }
        catch(err){

        }
    }