//Loading environment varibles
require('dotenv').config()

//Importing library
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
import passport from 'passport'
import { Request, Response, ErrorRequestHandler } from 'express'

//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.Promise = global.Promise

mongoose.connection.on('error', (error: any)=>{
    console.log("Error: ", error.message);
})


//Importing internal files
const routes = require('./routes')

//Server setup
const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(passport.initialize())
server.use('/', routes)

//Running server
server.listen(process.env.PORT, ()=>{
    console.log(`--Running on: ${process.env.BASE}`)
})