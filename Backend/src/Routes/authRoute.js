const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/authenticate');
const {register,login , refreshtoken , logout,dashboard} = require('../Controllers/authcontroller');
router.post("/register",register);
router.post("/login",login);
router.get("/dashboard",authenticate,dashboard);
module.exports=router;


