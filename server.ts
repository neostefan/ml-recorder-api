import express, { Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import authRouter from "./routes/auth-routes";
import appRouter from "./routes/app-routes";
import fileHandler from "./util/file-handler";
import Checker from "./util/env-checker";

const log_stream = fs.createWriteStream(path.join(__dirname, "access.log"))

const server = express();
dotenv.config()

server.use(helmet())
server.use(morgan('combined', {stream: log_stream}))
server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(fileHandler.single('sample'))

server.use("/auth", authRouter)
server.use(appRouter)

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({err})    
    next()
})

const db = (process.env.NODE_ENV == "production") ? Checker(process.env.MONGO_DB_PROD_URI) : Checker(process.env.MONGO_DB_DEV_URI)


server.listen(Checker(process.env.PORT), () => {
    connect(db).then(() => {
        
    }).catch(e => {
        console.log(e);
        process.exit(1);
    })
})