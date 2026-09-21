const authModel = require("../Models/authModel");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");  
const jsontoken = require("jsonwebtoken");                                                                                                                           
const registerService = async (name,email,password,confirmpassword)=>{
    const exituser = await authModel.findOne({email});
    if(exituser){
        throw new ApiError(500,"user Already Exits.");
    }
    if(confirmpassword!==password){
        throw new ApiError(400,"password didn't match.");
    }
    const hashpassword = await bcrypt.hash(password,10);
    const newuser = await authModel.create({name,email,hashpassword});

    return {name:newuser.name,email:newuser.email};
}
const loginService = async (email,password)=>{
    try{
    const exituser = await authModel.findOne({email});
    if(!exituser){
        throw new ApiError(404,"Account Not Found..");
    }
    const hashpassword = await bcrypt.compare(password,exituser.hashpassword);
    if(!hashpassword){
        throw new ApiError(400,"password didn't match..");

    }
    const accesstoken = jsontoken.sign({userid:exituser._id},
                                     process.env.JWT_ACCESS_SECRET_KEY,
                                    {expiresIn:process.env.JWT_ACCESS_EXPIRES_IN});
                
    const refreshtoken = jsontoken.sign({userid:exituser._id},
                                        process.env.JWT_REFRESH_SECRET_KEY,
                                        {expiresIn:process.env.JWT_REFRESH_EXPIRES_IN});
    await authModel.updateOne({email},{$set:{refreshToken:refreshtoken}});

     return {
            name:exituser.name,email:exituser.email,
            accesstoken:accesstoken,refreshtoken:refreshtoken};
    }catch(error){
        throw new ApiError(500,error.message);
    }
}
const refreshService =async (refreshToken)=>{
    try{
    const verify = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET_KEY);
    const user = await authModel.findById(verify._id);

    if(!verify){
        throw new ApiError(400,"refresh token verification failed..");
    }
     if(user.refreshToken!==refreshToken){
        throw new ApiError(400,"refresh token invalid.");
    }
    const newaccesstoken = jwt.sign({userid:user._id},process.env.JWT_ACCESS_SECRET_KEY,{expiresIn:JWT_ACCESS_EXPIRES_IN});
    return newaccesstoken;
    }catch(error){
        throw new ApiError(400,error.message);

    }


}


module.exports={registerService,loginService};