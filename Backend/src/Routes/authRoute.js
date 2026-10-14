const express = require('express');
const router = express.Router();
const {registerSchema,loginSchema} = require('../Validators/authSchema');
const {PERMISSIONS} = require('../consonants/permissions');
const {validate} = require('../Middlewares/validate');
const {authenticate} = require('../Middlewares/authenticate');
const {authorize} = require('../Middlewares/authorize');
const {register,login , refreshtoken , logout} = require('../Controllers/authcontroller');
const {CreateBook,ReadBook,PutBook,PatchBook,DeleteBook} = require('../Controllers/BookController');
//Auth//
router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);
router.get("/refresh",refreshtoken);
//Books//
router.post("/createBook",authenticate,authorize("post:/create_book"),CreateBook);
router.get("/ReadBook",authenticate,authorize("get:/id_book"),ReadBook);
router.put("/PutBook",authenticate,authorize("put:/update_book"),PutBook);
router.patch("/PatchBook",authenticate,authorize("patch:/update_book"),PatchBook);
router.delete("/DeleteBook",authenticate,authorize("delete:/delete_book"),DeleteBook);

module.exports=router;


