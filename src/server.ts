//Loading environment varibles
require('dotenv').config()

//Importing library
const express = require('express')
const cors = require('cors')

//Importing internal files
const routes = require('./routes')

//Server setup
const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/', routes)

//Running server
server.listen(process.env.PORT, ()=>{
    console.log(`--Running on: ${process.env.BASE}:${process.env.PORT}`)
})