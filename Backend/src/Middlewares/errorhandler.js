const globalerrorhandler = (err,req,res,next)=>{
    if(err.name==="ZodError"){
        statusCode =400;
    return res.status(statusCode).json({success:false,message:"validation failed" , error:err.message||"Invalid data"});
  
    }
    statusCode = err.statusCode || 500;
    return res.status(statusCode).json({success:false,message:err.message||"internal server Error."});

}
module.exports = globalerrorhandler;