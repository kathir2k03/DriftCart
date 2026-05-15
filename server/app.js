const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path:"config/config.env"})

require('dotenv').config();

app.use(express.json())
app.use(cookieParser()) // cookie parsher working in middleware
app.use('/uploads',express.static(path.join(__dirname, 'uploads'))) // calling the multer middleware function
const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)
app.use('/api/v1',payment)

module.exports =  app;