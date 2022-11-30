import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

const protect = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const header = req.headers.authorization;
        if(!header){
            return res.status(401).json({message:"you are not authrized in this route"})
        }
        const token=header.split(" ")[1]

        const user = jwt.verify(token,process.env.JWT_SECERT as string)
         console.log(user);
         next()
    } catch(error){
        console.log(error)
        return res.status(401).json({message:"you are not authrized in this route"})
    }
}

export default protect