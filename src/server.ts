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
    useUnifiedTopology: true,
})

mongoose.Promise = global.Promise

mongoose.connection.on('error', (error: any)=>{
    console.log("Error: ", error.message);
})

mongoose.connection.on('connected', ()=>{
    console.log("Connected with success")
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

//Case not found
server.use((req: Request, res: Response) => {
    res.status(404)
    res.json({ error: 'Not found endpoint' })
})

//Case occurs error on request
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status ? err.status : 400)
    res.json({error: err.message ? err.message : 'Error occurs.'})
}
server.use(errorHandler);

//Running server
server.listen(process.env.PORT, ()=>{
    console.log(`--Running on: ${process.env.BASE}`)
})