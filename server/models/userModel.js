const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
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
        maxlength : [6, "Password cannot exceed 6 chracters"],
        minlength : [3, "Password Length minimum 3 chracters required"]
    },
    avatar : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'user'
    },
    resetPassword : {
      type : String
    },

    resetPasswordTokenExpire : String,

    createdAt : {
        type : Date,
        default : Date.now
    }

})

userSchema.pre('save', async function (next){
    this.password = await bcrypt.hash(this.password, 10)
})

let model = mongoose.model("User", userSchema)

module.exports = model