const express = require('express')
const app = express()

require('dotenv').config();

const products = require('./routes/product')

app.use('/api/v1',products)

module.exports =  app;