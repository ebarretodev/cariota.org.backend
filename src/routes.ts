//Import Lybraries
import { Router, Request, Response } from "express"

//Import Middlewares
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const NpcController = require('./controllers/NpcController')
const CategoriesController = require('./controllers/CategoriesController')
const IotaController = require('./controllers/IotaController')
import { privateRoute } from "./middlewares/passport"
//Routes definition
const router = Router()

//Welcome message
router.get('/', (req: Request, res: Response)=>{
    res.status(200).json({message: 'Welcome to API.v1 to CarWallet Simulator. Consult https://github.com/ebarretodev/cariota.org.backend'})
})

router.post('/signin', AuthController.signin)
router.post('/signup', AuthController.signup)

router.get('/user/me', privateRoute, UserController.info)
router.put('/user/me', privateRoute, UserController.editAction)
router.delete('/user/me', privateRoute, UserController.deleteMe)

router.get('/npc/list', privateRoute, NpcController.list)
router.get('/npc/listCategories', privateRoute, NpcController.listCategories)
router.post('/npc/category', privateRoute, CategoriesController.addCategory)
router.post('/npc/addService', privateRoute, NpcController.addService)
router.get('/npc/listServices', privateRoute, NpcController.listServices)
router.post('/npc/useService', privateRoute, NpcController.useService)//not done

router.get('/iota/buy', privateRoute, IotaController.buy)
router.get('/iota/balance', privateRoute, IotaController.balance)
router.get('/iota/detailed', privateRoute, IotaController.detailedBalance)
router.post('/iota/sendValue', privateRoute, IotaController.sendValue)
router.post('/iota/sendMessage', privateRoute, IotaController.sendMessage)//

module.exports = router