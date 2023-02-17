import { NextFunction, Request, RequestHandler, Response } from "express";
import { HydratedDocument } from "mongoose";
import { user, IUser } from "../models";

export const postSignUp: RequestHandler =  async function(req: Request, res: Response, next: NextFunction) {
    let email = req.body.email
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let password = req.body.password

    try {
        let existingUser = await user.findOne({email: email})

        if(existingUser) {
            res.status(401).json({msg: "user already exists, please log in"})
        } else {
            let newUser: HydratedDocument<IUser> = new user({
                email,
                firstName,
                lastName,
                password
            });

            let savedUser = await newUser.save()
            res.status(201).json({msg: `Check your email, ${savedUser.firstName}`, user: newUser})
        }
    } catch(e: any) {
        console.log(e)
        next(e)
    }
}

export const postLogIn: RequestHandler = async function(req: Request, res: Response, next: NextFunction) {
    let email = req.body.email
    let password = req.body.password

    try {

        let existingUser = await user.findOne({email: email})

        if(existingUser) {

            if(existingUser.password == password) {
                res.status(201).json({msg: `Welcome ${existingUser.firstName}`})
            } else {
                res.status(401).json({msg: "password not correct!"})
            }
        
        } else {
            res.status(404).json({msg: "user not found, please register first"})
        }

    } catch(e: any) {
        console.log(e)
        next(e)
    }
}