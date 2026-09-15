const express = require("express");
const app = express();
app.get('/',(req,res)=>{
    res.end("Server running successfully..");
});
module.exports=app;