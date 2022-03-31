//Import types
import { Request, Response} from 'express'
import { generateToken } from '../middlewares/passport'
import { createAccount, Account } from '../middlewares/iota'

//Import models from MongoDB
const User = require('../models/User')

type OptionType = {
    email? : 'string',
    username? : 'string'
}

//Create functions for export
module.exports = {
    signup: async (req: Request, res:Response)=> {

       if (!req.body.email || !req.body.username || !req.body.passHash) {
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

                res.status(201).json({
                    message:"User Signin",
                    token: token,
                    username: newUser.username,
                    email: newUser.email,
                    address: updates.address,
                    type: newUser.typeNPC
                })
            })
    },
    signin: async (req: Request, res:Response)=> {3
        //((!A.B)+(A.!B)).C
        if (!(((!req.body.email && req.body.username) || (req.body.email && !req.body.username)) && req.body.passHash)) {
            return res.status(401).json({message: 'Check values inputed'})
        }
        const { username, email, passHash } = req.body
        let option: OptionType = {}
        if(email){
            option.email = email
        }
        if(username){
            option.username = username
        }
        console.log(option)
        const hasUser = await User.findOne(option)
        console.log(hasUser)
        if ( passHash !== hasUser.passHash ) { return res.status(401).json({message: 'Not Authorized' }) }
        res.json({
            message:"User Signin",
            token: hasUser.token,
            username: hasUser.username,
            email: hasUser.email,
            address: hasUser.address,
            type: hasUser.typeNPC
        })
    },
}