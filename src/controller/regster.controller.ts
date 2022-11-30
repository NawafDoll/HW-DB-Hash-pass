import {User} from '@prisma/client'
import { PrismaClientExtensionError } from '@prisma/client/runtime';
import { error } from 'console';
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../config/db'
import * as argon2 from 'argon2'



export const regsterHandler = async(
    req:Request,
    res:Response,
    next:NextFunction)=>{
        try{
            const newUser = req.body as User;
            const hashedPassword = await argon2.hash(newUser.password)
            newUser.password = hashedPassword
            await prisma.user.create({
                data:newUser
            })
            return res.status(200).json({message:"Regster done"})
        }
        catch(err){
            console.log(err)
            const prismaError = err as PrismaClientExtensionError
            return res.status(400).json({
                message:prismaError.message
            })
        }
    }


    export const getAllusersHandler = async(
        req:Request,
        res:Response,
        next:NextFunction)=>{
            try{
                const users = await prisma.user.findMany();
    
                return res.status(201).json({users})
            }
            catch(err){
                console.log(err)
                const prismaError = err as PrismaClientExtensionError
                return res.status(400).json({
                    message:prismaError.message
                })
            }
        }