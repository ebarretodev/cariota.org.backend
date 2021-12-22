//Import types
import { Request, Response} from 'express'
import { generateToken } from '../middlewares/passport'
import { createAccount, Account } from '../middlewares/iota'

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

        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            passHash: req.body.passHash,
            typeNPC: req.body.typeNPC
        })

        newUser.save()

        const token = generateToken({
            id: newUser.id,
            username: req.body.username,
        })

        createAccount()
            .then(async (newData) => {
                let data: Account = newData
                let updates = {
                    token: token,
                    seed: data.seed,
                    address: data.address,
                    mnemonic: data.mnemonic,
                }
                await User.findOneAndUpdate({_id: newUser._id.toString()}, {$set: updates})

                res.status(201).json({message: 'User created successful', token})
            })
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
            id: hasUser.id,
            username: hasUser.username,
        })
        res.json({message:"User Signin", token})
    },
}