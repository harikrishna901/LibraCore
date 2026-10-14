const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        maxlength:10000,
        trim:true
    },
    isbn10:{
        type:String,
        required:true,
        trim:true
    },
    isbn13:{
        type:String,
        required:true,
        trim:true
    },
    description:{
         type:String,
        required:true,
        maxlength:20000,
        trim:true
    },
    publishedYear:{
        type:Number,
        required:true,
        min:1000,
        max:new Date().getFullYear()

    },
    language:{
        type:String,
        default:"English",
        trim:true

    },
    edition:{
        type:String,
        required:true,

    },
    totalCopies:{
        type:Number,
        required:true,
        min:1
    },
    availableCopies:{
        type:Number,
        required:true


    },
    pageCount:{
        type:Number,
        required:true
    },
    format:{
        type:String,
        required:true
    },
    status:{ 
        type:String,
        enum:["active","withdrawn"],
        default:"active",
        trim:true

    },
    authorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Authors",
        required:true

    },
    publisherID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Publishers",
        required:true

    },
    categoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories",
        required:true

    }

},{timestamps:true});
const BookModel = mongoose.model("BookModel",BookSchema,"Books");
module.exports = {BookModel};