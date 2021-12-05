//Import types
import { Request, Response} from 'express'


//Create functions for export
module.exports = {
    signin: async (req: Request, res:Response)=> {
        res.json({message:"User Signin"})
    },
    signup: async (req: Request, res:Response)=> {
        res.json({message:"User Signup"})
    },
}