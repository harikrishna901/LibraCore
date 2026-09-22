const {registerService,loginService,refreshService} = require('../Services/authService');
const ApiError = require("../utils/ApiError");
const register = async (req,res)=>{
    const {name,email,password,confirmpassword} = req.body;
    const user = await registerService(name,email,password,confirmpassword);
    if(!user){
        throw new ApiError(502,"Creation Failed..");
    }
    return res.json({sucess:true,message:"User created successfully.",data:user});
    
}
const login=async (req,res)=>{
    const {password,email} = req.body;
    const loginuser = await loginService(email,password);
    if(!loginuser){
        throw new ApiError(502,"Login Failed..")
    }
    res.cookie("refreshToken",loginuser.refreshtoken,{httpOnly:true,secure:true,sameSite:'lax'});
    res.status(200).json({success:true,message:"login Successful",email:loginuser.email,accesstoken:loginuser.accesstoken});

}
const dashboard=async (req,res)=>{
        res.status(200).json({success:true,message:"welcome to dashboard.."});
}
const refreshtoken = async (req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    const result = await refreshService(refreshToken);
    if(!result){
        throw new ApiError(500,"Failed.");
    }
    res.status(200).json({success:true,accesstoken:result.accesstoken});

}
const logout = (req,res)=>{

}
module.exports = {register,login , refreshtoken,logout,dashboard};