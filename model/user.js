const mongoose = require('mongoose');

const userModel =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        enum:["admin", "user"],
        default:"user"
    }



},{timestamps:true})

module.exports = mongoose.model("User", userModel);