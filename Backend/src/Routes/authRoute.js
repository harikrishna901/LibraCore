const express = require('express');
const router = express.Router();
const {PERMISSIONS} = require('../consonants/permissions');
const authenticate = require('../Middlewares/authenticate');
const {authorize} = require('../Middlewares/authorize');
const {register,login , refreshtoken , logout,readbook} = require('../Controllers/authcontroller');
router.post("/register",register);
router.post("/login",login);
router.get("/refresh",refreshtoken);
router.get("/readbook",authenticate,authorize("get:/id_book"),readbook);

module.exports=router;


