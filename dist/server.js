"use strict";
//Loading environment varibles
require('dotenv').config();
//Importing library
var express = require('express');
var cors = require('cors');
//Importing internal files
var routes = require('./routes');
//Server setup
var server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api/v1/', routes);
//Running server
server.listen(5000, function () {
    console.log("--Running on: http://localhost:".concat(process.env.PORT));
});
