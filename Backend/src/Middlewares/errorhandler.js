const globalerrorhandler = (err,req,res,next)=>{
    statusCode = err.statusCode || 500;
    res.status(statusCode).json({success:false,message:err.message});

}

module.exports = globalerrorhandler;