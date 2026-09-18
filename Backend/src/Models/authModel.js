const mongoose = require('mongoose');
const authSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    confirmpassword:{
        type:String
    },
});
const authModel = mongoose.model("authModel",authSchema,"Members");
module.exports = authModel;