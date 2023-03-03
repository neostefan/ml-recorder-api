import bcrypt from "bcrypt";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { HydratedDocument } from "mongoose";
import { user, IUser } from "../models";
import { signPayload } from "../util";

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
            let hashedPassword = await bcrypt.hash(password, 10)
            let newUser: HydratedDocument<IUser> = new user({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword
            });

            let savedUser = await newUser.save()
            res.status(201).json({msg: `please sign in, ${savedUser.firstName}`, user: newUser})
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

        if(existingUser !== null) {
            let passwordIsValid = await bcrypt.compare(password, existingUser.password)

            if(passwordIsValid) {
                let token = await signPayload(existingUser._id.toString())
                res.status(201).json({msg: `Welcome ${existingUser.firstName}`, token: token})
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