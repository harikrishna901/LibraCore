const express = require('express');
const router = express.Router();
const autenticate = require('../Middlewares/autenticate');
const {register,login , refreshtoken , logout, getbyid} = require('../Controllers/authcontroller');
router.post("/register",register);
router.get("/:id",getbyid);
module.exports=router;


