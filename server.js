// Imports
const http = require('http')
const express = require('express')
const service = express()
const bodyParser = require('body-parser')
const moongoose = require('./services/database/mongoose')
const ContinentController = require('./controllers/continent-controller')
const server = http.createServer(service)
// Middlewares
service.use(bodyParser.urlencoded({extended: true}))
service.use(bodyParser.json())
// Routes
service.use('/continents', new ContinentController().routes())
// Server
server.listen(3000, () => {
    console.log('Servidor activo', server.address())
})