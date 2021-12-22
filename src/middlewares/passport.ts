import {Request, Response, NextFunction} from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
const User = require('../models/User')
import dotenv from 'dotenv'
dotenv.config()

import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'

const notAuthorizedJson = { status: 401, message: 'Not authorized.'}

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done)=>{
    const user = await User.findById(payload.id)
    return user ? done(null, user) : done(notAuthorizedJson, false)
}))

export const generateToken = (data: object) =>{
    return jwt.sign(data, process.env.JWT_SECRET as string)
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('jwt', (err, user)=>{
        req.user = user;
        return user ? next() : next(notAuthorizedJson)
    })
    authFunction(req, res, next)
}

export default passport