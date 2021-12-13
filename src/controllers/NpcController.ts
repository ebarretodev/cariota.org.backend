//Import types
import { Request, Response} from 'express'


//Create functions for export
module.exports = {
    list: async (req: Request, res:Response)=> {
        res.json({message:"NPCs list"})
    },
    listCategories: async (req: Request, res:Response)=> {
        res.json({message:"NPCs categories"})
    },
    listServices: async (req: Request, res:Response)=> {
        res.json({message:"NPCs categories"})
    },
    useService: async (req: Request, res:Response)=> {
        res.json({message:"NPCs categories"})
    },
}