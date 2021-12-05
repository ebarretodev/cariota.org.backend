//Import types
import { Request, Response} from 'express'


//Create functions for export
module.exports = {
    info: async (req: Request, res:Response)=> {
        res.json({message:"User Info"})
    },
    editAction: async (req: Request, res:Response)=> {
        res.json({message:"User Edited"})
    },
}