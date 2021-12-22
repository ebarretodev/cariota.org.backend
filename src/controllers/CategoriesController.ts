//Import types
import { Request, Response} from 'express'
const Categories = require('../models/Categories')

module.exports = {
    addCategory: async (req: Request, res: Response) => {
        const { name, slug} = req.body
        if(!name || !slug ){ return res.status(400).json({error: "Check values."}) }

        const hasCat = await Categories.findOne({name})
        if(hasCat){ return res.status(400).json({error: "Category already exists."}) }

        const newCat = new Categories({
            name,
            slug
        })

        newCat.save()


        return res.status(200).json({message: 'Created category'})
    }
}