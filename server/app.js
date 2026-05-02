const express = require('express')
const app = express()

require('dotenv').config();

<<<<<<< Updated upstream
app.use(express.json())
=======
app.use(express.json()) 
app.use(cookieParser()) // cookie parsher working in middleware

>>>>>>> Stashed changes
const products = require('./routes/product')
const auth = require('./routes/auth')

app.use('/api/v1',products)
app.use('/api/v1',auth)

module.exports =  app;