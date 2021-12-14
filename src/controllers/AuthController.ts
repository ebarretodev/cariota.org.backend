//Import types
import { Request, Response} from 'express'
import { generateToken } from '../config/passport'

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

        const token = generateToken({
            username: req.body.username,
            email: req.body.email,
        })

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            passHash: req.body.passHash,
            tokenAPI: token
        })

        await newUser.save()

        res.status(201).json({message: 'User created successful', token})

    },
    signin: async (req: Request, res:Response)=> {3
        if ( (!req.body.email && !req.body.username ) || !req.body.passHash ) {
            return res.status(401).json({message: 'Check values inputed'})
        }
        const { username, email, passHash } = req.body
        const option = email ? email : username
        const hasUser = await User.findOne({ option })
        if ( passHash !== hasUser.passHash ) { return res.status(401).json({message: 'Not Authorized' }) }
        const token = generateToken({
            username: hasUser.username,
            email: hasUser.email,
        })
        res.json({message:"User Signin", token})
    },
}