const {registerService,loginService} = require('../Services/authService');
const ApiError = require("../utils/ApiError");
const register = async (req,res)=>{
    const {name,email,password,confirmpassword} = req.body;
    const user = await registerService(name,email,password,confirmpassword);
    if(!user){
        throw new ApiError(501,"Creation Failed..");
    }
    return res.json({sucess:true,message:"User created successfully.",data:user});
    
}
const login=async (req,res)=>{
    const {password,email} = req.body;
    const loginuser = await loginService(email,password);
    if(!loginuser){
        throw new ApiError(501,"Login Failed..")
    }
    res.status(200).json({success:true,message:"Login Successful..",data:loginuser});
}
const refreshtoken = (req,res)=>{

}
const logout = (req,res)=>{

}
module.exports = {register,login , refreshtoken,logout};