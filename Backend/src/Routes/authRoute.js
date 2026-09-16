const express = require('express');
const router = express.Router();
const autenticate = require('../Middlewares/autenticate');
const {register,login , refreshtoken , logout} = require('../Controllers/authcontroller');
router.get("/register",(req,res)=>{res.end("ended..")});
module.exports=router;


