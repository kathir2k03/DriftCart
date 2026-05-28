const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        require : [true, 'please enter name']
    },
    email : {
        type : String,
        required : [true, 'please enter email'],
        unique : true,
        validate : [validator.isEmail, 'Please enter valid email address']
    },
    password : {
        type : String,
        required : [true, 'Please enter Password'],
        minlength : [3, "Password Length minimum 3 character required"],
        select : false
    },
    avatar : {
        type : String,
    },
    role : {
        type : String,
        default : 'user'
    },
    resetPasswordToken : {
      type : String
    },

    resetPasswordTokenExpire : String,

    createdAt : {
        type : Date,
        default : Date.now
    }

})

// before password save change to hash value function
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// geting jwt token using userSchema.method function and jwt package
userSchema.methods.getJwtToken = function(){
    return  jwt.sign({id : this.id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME
    })
}

// checking bcrypt password and userentered password is match using bcrypt method
userSchema.methods.isValidPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetPassword = function(){
    // generate token with encoding type
    const token = crypto.randomBytes(20).toString('hex')
     this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex') // for protect hash token sha256 is protect algorithm

    // set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000 // after 30 mins the token will expire

    return token
    }

let model = mongoose.model("User", userSchema)

module.exports = model