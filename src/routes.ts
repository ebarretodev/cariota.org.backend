//Import Lybraries
import { Router, Request, Response } from "express"

//Import Middlewares
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const NpcController = require('./controllers/NpcController')
const IotaController = require('./controllers/IotaController')
import { privateRoute } from "./config/passport"

//Routes definition
const router = Router()

//Welcome message
router.get('/', (req: Request, res: Response)=>{
    res.status(200)
    res.json({message: 'Welcome to API.v1 to CarWallet Simulator.'})
})

router.post('/user/signin', AuthController.signin)
router.post('/user/signup', AuthController.signup)

router.get('/user/me', UserController.info)
router.put('/user/me', UserController.editAction)
router.delete('/user/me', UserController.deleteMe)

router.get('/npc/list', NpcController.list)
router.get('/npc/listCategories', NpcController.listCategories)
router.get('/npc/:id/listServices', NpcController.listServices)
router.post('/npc/:id/:service', NpcController.useService)

router.post('/iota/buy', IotaController.buy)


module.exports = router