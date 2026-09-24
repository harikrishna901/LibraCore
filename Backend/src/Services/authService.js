const authModel = require("../Models/authModel");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");  
const jsontoken = require("jsonwebtoken");                                                                                                                           
const registerService = async (name,email,role,password,confirmpassword)=>{
    const exituser = await authModel.findOne({email});
    if(exituser){
        throw new ApiError(500,"user Already Exits.");
    }
    if(confirmpassword!==password){
        throw new ApiError(400,"password didn't match.");
    }
    const hashpassword = await bcrypt.hash(password,10);
    const newuser = await authModel.create({name,email,role,hashpassword});

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
    const accesstoken = jsontoken.sign({userid:exituser._id,role:exituser.role},
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
    const Verify =  jsontoken.verify(refreshToken,process.env.JWT_REFRESH_SECRET_KEY);
    const user = await authModel.findById(Verify.userid);
     if(user.refreshToken!==refreshToken){
        throw new ApiError(400,"refresh token invalid.");
    }
    const newaccesstoken = jsontoken.sign({userid:user._id,role:user.role},process.env.JWT_ACCESS_SECRET_KEY,{expiresIn:process.env.JWT_ACCESS_EXPIRES_IN});
    return {accesstoken:newaccesstoken,message:"new access token created."};
    }catch(error){
        throw new ApiError(400,error.message);

    }


}


module.exports={registerService,loginService,refreshService};