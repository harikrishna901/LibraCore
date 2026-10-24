const express = require('express');
const router = express.Router();
//Schemas//
const {registerSchema,loginSchema} = require('../Validators/authSchema');
const {createBookSchema} = require("../Validators/BookSchema");
const {profileCreateSchema} = require("../Validators/MemberSchema");
const {PERMISSIONS} = require('../consonants/permissions');
//Authentication//
const {validate} = require('../Middlewares/validate');
const {authenticate} = require('../Middlewares/authenticate');
const {authorize} = require('../Middlewares/authorize');
const {register,login , refreshtoken , logout} = require('../Controllers/authcontroller');
//profile,Books//
const {CreateProfile,ReadProfile,PutProfile,PatchProfile,DeleteProfile} = require("../Controllers/MemberController");
const {CreateBook,ReadBook,PutBook,PatchBook,DeleteBook} = require('../Controllers/BookController');
//Auth//
router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);
router.get("/refresh",refreshtoken);
//Books//
router.post("/createBook",authenticate,authorize("post:/create_book"),validate(createBookSchema),CreateBook);
router.get("/ReadBook",authenticate,authorize("get:/id_book"),ReadBook);
router.put("/PutBook",authenticate,authorize("put:/update_book"),PutBook);
router.patch("/PatchBook",authenticate,authorize("patch:/update_book"),PatchBook);
router.delete("/DeleteBook",authenticate,authorize("delete:/delete_book"),DeleteBook);
//Members//
router.post("/createprofile",authenticate,authorize("post:/create_profile"),validate(profileCreateSchema),CreateProfile);
router.get("/readprofile",authenticate,authorize(),ReadProfile);
router.put("/putprofile",authenticate,authorize(),PutProfile);
router.patch("/patchprofile",authenticate,authorize(),PatchProfile);

module.exports=router;


