const mongoose = require('mongoose');
const authSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,

    },
    hashpassword:{
        required:true,
        type:String
    },
    refreshToken:{
        required:true,
        type:String

    }
},{timestamps:true});
const authModel = mongoose.model("authModel",authSchema,"Member");
module.exports = authModel;