"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Loading environment varibles
require('dotenv').config();
//Importing library
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var passport_1 = __importDefault(require("passport"));
//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', function (error) {
    console.log("Error: ", error.message);
});
//Importing internal files
var routes = require('./routes');
//Server setup
var server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(passport_1.default.initialize());
server.use('/', routes);
//Case not found
server.use(function (req, res) {
    res.status(404);
    res.json({ error: 'Not found endpoint' });
});
//Case occurs error on request
var errorHandler = function (err, req, res, next) {
    res.status(err.status ? err.status : 400);
    res.json({ error: err.message ? err.message : 'Error occurs.' });
};
server.use(errorHandler);
//Running server
server.listen(process.env.PORT, function () {
    console.log("--Running on: ".concat(process.env.BASE));
});
