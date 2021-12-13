//Import types
import { Request, Response} from 'express'


//Create functions for export
module.exports = {
    buy: async (req: Request, res:Response)=> {
        res.json({message:"Iota sended to address"})
    },
}