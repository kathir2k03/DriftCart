const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const sendToken = require('../utils/jwt')
const crypto = require('crypto')

// Regester API - /api/v1/register
exports.registerUser = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        const avatar = req.file
            ? `${process.env.BACKEND_URL}/uploads/users/${req.file.filename}`
            : `${process.env.BACKEND_URL}/uploads/users/default_avatar.webp`

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
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password"
        });
    }

    //finding email and password
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or Password"
        });
    }

    const isMatch = await user.isValidPassword(password); // passing isValidPassword function paramater as password

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or Password"
        });
    }
    // sharing that token in login user
    sendToken(user, 201, res)
}

// logout api - /api/v1/logout

exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200)
        .json({
            success: true,
            message: "Logged Out"
        })
}

// Forgot Password api - /api/v1/password/forgot

exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(res.status(401).json({
            success: false,
            message: "Email is not found"
        }))
    }
    const resetToken = user.getResetPassword() // which created in userModel
    await user.save({ validateBeforeSave: false }) // validate before save 

    // Create reset URL

    const resetURL = `${process.env.FRONTEND_URL}/forgot-password/${resetToken}`
    // protocol is http://127.0.0.1/api/v1/password/reset/{resetToken}

    const message = `Your Password reset URL is as follows \n\n
  ${resetURL} \n\n If you have not requested this email, then ignore it.`

    try {
        // creating uitlity email function to avoid recode email function
        await sendEmail({
            email: user.email,
            subject: "E-commerce Password Recovery",
            message
        })

        res.status(200)
            .json({
                success: true,
                message: `Email sent to ${user.email}`
            })

    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(res.status(500).json({
            success: false,
            message: "Email could not be sent"
        }))
    }
}

//reset password api - /api/v1/reset/:token

exports.resetPassword = async (req, res, next) => {
    if (!req.body.password || !req.body.confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password are required"
        })
    }
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt: Date.now()  //checking that expire token is grater that current date to db expire date
        }
    })

    if (!user) {
        return next(res.status(401).json({
            success: false,
            message: "Password reset token is invalid or expire"
        }))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(res.status(401).json({
            success: false,
            message: "Password does not matched"
        }))
    }

    user.password = req.body.password

    //after validation undefined the keys in db
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
    await user.save({ validateBeforeSave: false })

    // implementing that shorthand reusable method
    sendToken(user, 201, res)
}

// Get User Profile - api/v1/myprofile

exports.getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
}

// change password - api/v1/password/change

exports.changePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    // check old password
    if (!await user.isValidPassword(req.body.oldPassword)) {
        return next(res.status(401).json({
            success: false,
            message: "Old Password is incorrect"
        }))
    }

    // assigining new password
    user.password = req.body.password
    await user.save()
    res.status(200).json({
        success: true
    })
}

// Update Profile - api/v1/myprofile/update

exports.updateProfile = async (req, res, next) => {
    let newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    let avatar
    if (req.file) {
        avatar = `${process.env.BACKEND_URL}/uploads/users/${req.file.filename}`
        newUserData = { ...newUserData, avatar}
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "User Profile Update Successfully",
        user
    })
}

// Admin : Get All users - api/v1/admin/users
exports.getAllUsers = async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
}

// Admin : Get Specific User api/v1/admin/user/:id
exports.getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(res.status(404).json({
            success: false,
            message: "User Not Found"
        }))
    }

    res.status(200).json({
        success: true,
        user
    })
}

// Admin : Update User api/v1/admin/user/:id
exports.updateUser = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        returnDocument: 'after', // replaces new: true
        runValidators: true
    })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "User Profile Update Successfully",
        user
    })
}

// Admin : Delete User api/v1/admin/user/:id
exports.deleteUser = async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404).json({
            success: false,
            message: "Delete Id not Match"
        })
    }

    await user.deleteOne()
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
}