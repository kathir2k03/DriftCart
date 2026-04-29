const express = require('express')
const app = express()

require('dotenv').config();

app.use(express.json())
const products = require('./routes/product')
const auth = require('./routes/auth')

app.use('/api/v1',products)
app.use('/api/v1',auth)

module.exports =  app;