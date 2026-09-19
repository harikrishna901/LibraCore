const globalerrorhandler = (err,req,res,next)=>{
    statusCode = err.statusCode || 500;
    res.status(statusCode).json({success:false,message:err.message||"internal server Error."});

}
module.exports = globalerrorhandler;