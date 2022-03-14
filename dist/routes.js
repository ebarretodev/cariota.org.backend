"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import Lybraries
var express_1 = require("express");
//Import Middlewares
var AuthController = require('./controllers/AuthController');
var UserController = require('./controllers/UserController');
var NpcController = require('./controllers/NpcController');
var CategoriesController = require('./controllers/CategoriesController');
var IotaController = require('./controllers/IotaController');
var passport_1 = require("./middlewares/passport");
//Routes definition
var router = (0, express_1.Router)();
//Welcome message
router.get('/', function (req, res) {
    res.status(200).json({ message: 'Welcome to API.v1 to CarWallet Simulator. Consult https://github.com/ebarretodev/cariota.org.backend' });
});
router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);
router.get('/user/me', passport_1.privateRoute, UserController.info);
router.put('/user/me', passport_1.privateRoute, UserController.editAction);
router.delete('/user/me', passport_1.privateRoute, UserController.deleteMe);
router.get('/npc/list', passport_1.privateRoute, NpcController.list);
router.get('/npc/listCategories', passport_1.privateRoute, NpcController.listCategories);
router.post('/npc/category', passport_1.privateRoute, CategoriesController.addCategory);
router.post('/npc/addService', passport_1.privateRoute, NpcController.addService);
router.get('/npc/listServices', passport_1.privateRoute, NpcController.listServices);
router.post('/npc/useService', passport_1.privateRoute, NpcController.useService); //not done
router.get('/iota/buy', passport_1.privateRoute, IotaController.buy);
router.get('/iota/balance', passport_1.privateRoute, IotaController.balance);
router.get('/iota/detailed', passport_1.privateRoute, IotaController.detailedBalance);
router.post('/iota/sendValue', passport_1.privateRoute, IotaController.sendValue);
router.post('/iota/sendMessage', passport_1.privateRoute, IotaController.sendMessage); //
module.exports = router;
