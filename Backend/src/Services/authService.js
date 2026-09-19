const authModel = require("../Models/authModel");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");                                                                                                                             
const registerService = async (name,email,password,confirmpassword)=>{
    const exituser = await authModel.findOne({email});
    if(exituser){
        throw new ApiError(501,"user Already Exits.");
    }
    if(confirmpassword!==password){
        throw new ApiError(501,"password didn't match.");
    }
    const hashpassword = await bcrypt.hash(password,10);
    const newuser = await authModel.create({name,email,hashpassword});

    return {name:newuser.name,email:newuser.email};
}
const loginService = async (email,password)=>{
    const exituser = await authModel.findOne({email});
    if(!exituser){
        throw new ApiError(501,"Account Not Found..");
    }
    const hashpassword = await bcrypt.compare(password,exituser.hashpassword);
    if(!hashpassword){
        throw new ApiError(501,"password didn't match..");

    }
    return {name:exituser.name,email:exituser.email};
}


module.exports={registerService,loginService};