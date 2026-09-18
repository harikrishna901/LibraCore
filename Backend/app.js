
const express = require("express");
const globalerrorhandler = require('./src/Middlewares/errorhandler');
const authRoute = require('./src/Routes/authRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',authRoute);
app.use(globalerrorhandler);
module.exports=app;