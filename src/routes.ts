//Import Lybraries
import { Router, Request, Response } from "express"

//Import Middlewares


//Routes definition
const router = Router()
router.get('/', (req: Request, res: Response)=>{
    res.status(200)
    res.json({message: 'Welcome to API.v1 to CarWallet Simulator.'})
})

module.exports = router