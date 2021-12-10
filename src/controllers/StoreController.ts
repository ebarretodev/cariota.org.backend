//Import types
import { Request, Response} from 'express'

//Create functions for export
module.exports = {
    list: async (req: Request, res:Response)=> {

        res.json({message:"Lista de lojas"})
    },

}