//Import types
import { Request, Response} from 'express'

//Import models from MongoDB
const User = require('../models/User')

//Create functions for export
module.exports = {
    signup: async (req: Request, res:Response)=> {
        if(!req.body.username || !req.body.email || !req.body.passHash){
            return res.status(400).json({error:"Check inputed values."})
        }
        const user = await User.findOne({ email: req.body.email })
        if(user){ return res.status(400).json({error:"User already exist."})}
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            passHash: req.body.passHash,
            tokenAPI: '1234'
        })
        await newUser.save()
        res.status(201).json({message: 'User created successful', token: newUser.tokenAPI})

    },
    signin: async (req: Request, res:Response)=> {
        res.json({message:"User Signin"})
    },
}