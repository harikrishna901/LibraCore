const mongoose = require('mongoose');
const authSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
   email: {
   type: String,
   required: true,
   trim: true,
   lowercase: true,
   match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
},
    role:{
        type:String,
        required:true,
        enum:["member","librarian","admin"],
        lowercase:true
    },
    hashpassword:{
        required:true,
        type:String
    },
    refreshToken:{
        required:true,
        type:String,
        default:"refreshtoken",

    }
},{timestamps:true});
const authModel = mongoose.model("authModel",authSchema,"Member");
module.exports = authModel;