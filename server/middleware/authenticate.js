const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// in cookie we stored so the token is valid or not for that we using this function
exports.isAuthenticatedUser = async (req, res, next) => {
    console.log("Cookies:", req.cookies);
    console.log("Token:", req.cookies.token);
    // request storing toekn using destructuring method for that must run cookie parsher
    const {token} = req.cookies
    // console.log("token", token) // to checking the token is there
    
    // if not token menas seting login and come
    if(!token){
    return res.status( 401). json({
            success : false,
            message : "Login First to handle this resource"
        })
    }
   
    // decode the jwt token and this token is valid
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    // console.log(decode, "decode") // this will return id of that user { id: '69f32e436540785040598024', iat: 1777552497, exp: 1778157297 } decode
    req.user = await User.findById(decode.id) // to find the id is valid in the on that database user and sending to req.user
   // this req user is we can user for create product send this id to body 
    next() // to run next middleware
}

exports.authorizeRoles = (...roles) =>{
   return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(res.status(401). json({
            success : false,
            message : `Role ${req.user.role} is not allowed`
        }))
        }
         next()
    }
}