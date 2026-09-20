const {registerService,loginService} = require('../Services/authService');
const ApiError = require("../utils/ApiError");
const jsontoken= require("jsonwebtoken");
const register = async (req,res)=>{
    const {name,email,password,confirmpassword} = req.body;
    const user = await registerService(name,email,password,confirmpassword);
    if(!user){
        throw new ApiError(502,"Creation Failed..");
    }
    return res.json({sucess:true,message:"User created successfully.",data:user});
    
}
const login=async (req,res)=>{
    try{
    const {password,email} = req.body;
    const loginuser = await loginService(email,password);
    if(!loginuser){
        throw new ApiError(502,"Login Failed..")
    }
    const accesstoken = jsontoken.sign({userid:loginuser._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_IN});

    res.status(200).json({success:true,message:"Login Successful..",accesstoken:accesstoken,data:loginuser});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }

}
const dashboard=async (req,res)=>{
        res.status(200).json({success:true,message:"welcome to dashboard.."});
}
const refreshtoken = (req,res)=>{

}
const logout = (req,res)=>{

}
module.exports = {register,login , refreshtoken,logout,dashboard};