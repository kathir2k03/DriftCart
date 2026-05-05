# Backend Notes – MERN E-commerce Project

## 1. Project Setup

Initialize project:
npm init

- Entry point: server.js
- This creates package.json

---

## 2. Install Packages

npm install express
npm install mongoose
npm install dotenv
npm install nodemon --save-dev
npm install validator 
npm install bcrypt
npm install jsonwebtoken
install cookie-parser
npm install crypto
npm install nodemailer

Notes:
- --save-dev → development only
- nodemon → auto restart server

Run server:
npm start

---

## 3. Server Setup

### app.js
- Create express app and export

const express = require('express')
const app = express()

module.exports = app

---

### Environment File

Create:
config/config.env

Add:

PORT=8000
NODE_ENV=development
DB_LOCAL_URI=mongodb://127.0.0.1:27017/ecommerce

---

### server.js

const app = require('./app')
require('dotenv').config({ path: './config/config.env' })

const connectDatabase = require('./config/database')
connectDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`)
})

---

## 4. Database Connection

Create:
config/database.js

const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI)
    .then((con) => {
        console.log(`MongoDB connected: ${con.connection.host}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = connectDatabase

Notes:
- mongoose.connect() returns promise
- use .then() and .catch()

---

## 5. MVC Structure

Create folders:
controllers/
routes/

---

### Controller

controllers/productController.js

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "test"
    })
}

---

### Routes

routes/product.js

const express = require('express')
const router = express.Router()

const { getProducts } = require('../controllers/productController')

router.route('/products').get(getProducts)

module.exports = router

---

## 6. Connect Routes

Update app.js

const products = require('./routes/product')

app.use('/api/v1', products)

---

## 7. API Testing (Postman)

URL:
http://localhost:8000/api/v1/products

Method:
GET

---

## Optional (Environment in Postman)

base_url = http://localhost:8000

Use:
{{base_url}}/api/v1/products

---

## Final Output

{
  "success": true,
  "message": "test"
}

---

## Summary

- Setup Node project
- Install dependencies
- Configure environment variables
- Connect MongoDB
- Create controller & routes
- Test API using Postman

__________________________________________________________________________________________________

create products CRUD and filter, pagination APIS
_____________________________________________________________________________________________________

Create user API

for email validation npm install validator 
for password hase use npm install bcrypt

____________________________________________________________________________________________________

JWT token

random key generator for jwt, https://randomkeygen.com/

npm install jsonwebtoken

usnig that jwt token to allow the user to view api paths 

through cookies we are storing the token 

then protect api paths using authorized valid token through middleware authenticate.js file

before auth only move to api functions

to read request cookies we need cookie packages for that npm install cookie-parser

without cookie parsher middleware we cannot access req.cookie so implement in app.js file app.use(cookieParser())

after function setuped validations done the path will work only token which user is have

____________________________________________________________________________________________________________________________________

after check valid user role to show particular api path for admin for user

___________________________________________________________________________________________________________________________________

after create logout api
__________________________________________________________________________________________________________________________________

adding created product userId for both post and get
____________________________________________________________________________________________________________________________________

Reset Password Auth works

reset password token genertor for to verify we need crypto package file so npm install crypto
_______________________________________________________________________________________________________________________________

reset password url sharing through mail for to mail we are setuping template mail for that use mailtrap for that we need to install package

npm install nodemailer after that set some email address, and details in the config.env


  http://localhost:8000/api/v1/password/reset/d0d5f9f5137ba1fa97bb54f2975b8e9bac5237ea 

 If you have not requested this email, then ignore it. this will work like this

 ____________________________________________________________________________________________________________________________________________

d0d5f9f5137ba1fa97bb54f2975b8e9bac5237ea using this token pass in reset password api and validate the new-password and re-Enter password

______________________________________________________________________________________________________________________________________________

get user Profile API
Change Password API
Update Profile API

__________________________________________________________________________________________________________________________________________________

Order apis services

order admin api services
________________________________________________________________________________________________________________________________________________

Product Review APIS 

________________________________________________________________________________________________________________________________________________


