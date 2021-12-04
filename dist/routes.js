"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import Lybraries
var express_1 = require("express");
//Import Middlewares
//Routes definition
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.status(200);
    res.json({ message: 'Welcome to API.v1 to CarWallet Simulator.' });
});
module.exports = router;
