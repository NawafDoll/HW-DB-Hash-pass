import express  from "express";
import authRouter from './router/regster.router'
import { connectDB } from "./config/db";

const app = express()
const port = 3034

app.use(express.json())

connectDB();

app.use('/api/v1/user',authRouter)


app.listen(port,()=>{
    console.log(`Server running in port ${port}`);
});