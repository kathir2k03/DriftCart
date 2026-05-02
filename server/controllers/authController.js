const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const sendToken = require('../utils/jwt')
const crypto = require('crypto')

// Regester API - /api/v1/register
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            avatar
        });
        // getting that token in that token function and storing in token variable and sharing to registred user
        // const token = user.getJwtToken()

        // res.status(201).json({
        //     success: true,
        //     user,
        //     token
        // });

        // implementing that shorthand reusable method
        sendToken(user, 201, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// login api - /api/v1/login
exports.loginUser = async (req, res, next) => {

    // getting email and password
    const {email, password} = req.body

    if(!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Please enter email and password"
    });
    }

    //finding email and password
    const user = await User.findOne({ email }).select('+password')
   
    if(!user) {
    return res.status(401).json({
        success: false,
        message: "Invalid email or Password"
    });
    }

    const isMatch = await user.isValidPassword(password); // passing isValidPassword function paramater as password

    if(!isMatch){
    return res.status(401).json({
        success: false,
        message: "Invalid email or Password"
    });        
    }
    // sharing that token in login user
    sendToken(user, 201, res)
}

exports.logoutUser = (req, res, next) =>{
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly : true
    }).status(200)
    .json({
        success : true,
        message : "Logged Out"
    })
}

exports.forgotPassword = async (req, res, next) =>{
  const user = await User.findOne({email : req.body.email})

  if(!user) {
    return next(res.status(401).json({
        success : false,
        message : "User is not found"
    }))
  }
  const resetToken = user.getResetPassword() // which created in userModel
  await user.save({validateBeforeSave : false}) // validate before save 

  // Create reset URL

  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}` 
  // protocol is http://127.0.0.1/api/v1/password/reset/{resetToken}

  const message = `Your Password reset URL is as follows \n\n
  ${resetURL} \n\n If you have not requested this email, then ignore it.`

  try{
  // creating uitlity email function to avoid recode email function
 await sendEmail({
    email : user.email,
    subject : "E-commerce Password Recovery",
    message
  }) 

  res.status(200)
  .json({
    success : true,
    message : `Email sent to ${user.email}`
  })
  
  }
  catch(error){
       user.resetPasswordToken = undefined;
       user.resetPasswordTokenExpire = undefined;
       await user.save({validateBeforeSave : false})
       return next(res.status(500).json({
        success : false,
        message : "Email could not be sent"
       }))
  }
}

//reset password api

exports.resetPassword = async (req, res, next) =>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire : {
            $gt : Date.now()  //checking that expire token is grater that current date to db expire date
        }
    })

    if(!user){
        return next(res.status(401).json({
            success : false,
            message :  "Password reset token is invalid or expire"
        }))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(res.status(401).json({
            success : false,
            message :  "Password does not matched"
        }))        
    }

    user.password = req.body.password

    //after validation undefined the keys in db
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
    await user.save({validateBeforeSave : false})

        // implementing that shorthand reusable method
        sendToken(user, 201, res)    
}