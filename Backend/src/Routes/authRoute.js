const express = require('express');
const router = express.Router();
const {registerSchema,loginSchema} = require('../Validators/authSchema');
const {PERMISSIONS} = require('../consonants/permissions');
const {validate} = require('../Middlewares/validate');
const {authenticate} = require('../Middlewares/authenticate');
const {authorize} = require('../Middlewares/authorize');
const {register,login , refreshtoken , logout,readbook} = require('../Controllers/authcontroller');
router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);
router.get("/refresh",refreshtoken);
router.get("/readbook",authenticate,authorize("get:/id_book"),readbook);

module.exports=router;


