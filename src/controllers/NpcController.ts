//Import types
import { Request, Response} from 'express'
const User = require('../models/User')
const Categories = require('../models/Categories')
const Services = require('../models/Services')



//Create functions for export
module.exports = {
    list: async (req: Request, res:Response)=> {
        let {sort = 'asc', offset= 0, limit=8, q } = req.query

        let filters = { typeNPC: true }

        if(q) {
            filters.username = {'$regex':q, '$options':'i' }
        }

        const listTotal = await User.find(filters)
        let total = listTotal.length

        const listNPC = await User.find(filters)
            .sort({username: (sort=='desc'?-1:1)})
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec()

        let list = []
        for(let i in listNPC){
            list.push({
                name: listNPC[i].username,
                email: listNPC[i].email,
            })
        }


        res.status(200).json({message:"NPCs list", total, list})
    },
    listCategories: async (req: Request, res:Response)=> {
        let listAll = await Categories.find()

        let list = []

        for(let i in listAll){
            list.push({
                name: listAll[i].name,
                slug: listAll[i].slug,
            })
        }

        res.json({message:"Categories list", list})
    },
    listServices: async (req: Request, res:Response)=> {
        let {sort = 'asc', offset= 0, limit=8, q, c} = req.query

        let filters = {}

        if(q){ filters.name = {'$regex':q, '$options': 'i' } }

        if(c){
            let cat = await Categories.findOne({ name : c})
            console.log(cat)

            filters.category = cat._id.toString()
        }

        let services = await Services.find(filters)
            .sort({name: (sort=='desc'?-1:1)})
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec()

        res.json({message:"NPC's services", services})
    },
    addService: async (req: Request, res:Response)=> {
        let { name, type, value, time, category } = req.body

        const cat = await Categories.findOne({name: category})

        const newService = new Services({
            idNPC: req.user._id.toString(),
            name,
            category: cat._id.toString(),
            type,
            value,
            time
        })
        newService.save()

        res.json({message:"NPC's services added"})
    },
    useService: async (req: Request, res:Response)=> {
        
        res.json({message:"NPC use service"})
    },
}