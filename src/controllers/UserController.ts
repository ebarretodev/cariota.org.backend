//Import types
import { Request, Response} from 'express'
const User = require('../models/User')



//Create functions for export
module.exports = {
    info: async (req: Request, res:Response)=> {
        //@ts-ignore
        const { username, email, address, typeNPC } = req.user
        const me = {
            username,
            email,
            address,
            typeNPC,
        }
        res.status(200).json({me})
    },
    editAction: async (req: Request, res:Response)=> {
        let updates = {}

        if(req.body.typeNPC !== undefined){
            //@ts-ignore
            updates.typeNPC = req.body.typeNPC
        }

        if(req.body.email){
            const hasUser = await User.findOne({email: req.body.email})
            if(hasUser){return res.status(400).json({error:'E-mail already in use.'})}
            //@ts-ignore
            updates.email = req.body.email
        }
//@ts-ignore
        await User.findOneAndUpdate({ _id: req.user._id.toString() }, {$set: updates})

        res.status(200).json({message:"User Edited"})
    },
    deleteMe: async (req: Request, res:Response)=> {
        //@ts-ignore
        await User.findOneAndDelete({ _id: req.user._id.toString() })
        res.status(200).json({message:"User Deleted"})
    },
}