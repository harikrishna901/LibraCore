const express = require('express');
const router = express.Router();
const autenticate = require('../Middlewares/autenticate');
const {register,login , refreshtoken , logout} = require('../Controllers/authcontroller');
router.post("/register",register);
router.post("/login",login);
module.exports=router;


