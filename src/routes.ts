//Import Lybraries
import { Router, Request, Response } from "express"

//Import Middlewares
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')

//Routes definition
const router = Router()
router.get('/', (req: Request, res: Response)=>{
    res.status(200)
    res.json({message: 'Welcome to API.v1 to CarWallet Simulator.'})
})

router.get('/user/me', UserController.info)
router.put('/user/me', UserController.editAction)
router.post('/user/signin', AuthController.signin)
router.post('/user/signup', AuthController.signup)


module.exports = router