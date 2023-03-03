import jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt"
import { user } from "../models";

const secret = "TheCatSaysMoo!"

function signPayload(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign({userId}, secret, { expiresIn: '2y' }, (err, token) => {
            if(token !== undefined) {
                resolve(token)
            }

            reject(err)
        })
    })
}

let passportInstance = passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    secretOrKey: secret,
}, async (payload, cb) => {
    try {
        let u = await user.findOne({_id: payload.userId})
        console.log("The User: ", u)
        console.log("The payload: ", payload)
        if(typeof u !== "undefined" && u !== null) {
            return cb(null, u)
        } else {
            return cb(null, false, "No user found!")
        }
    } catch(e) {
        cb(e, false, "An error occured in verifying token")
    }
}))

export {
    secret,
    signPayload,
    passportInstance
}