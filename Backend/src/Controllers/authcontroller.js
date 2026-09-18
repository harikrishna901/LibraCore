const {authService,userService} = require('../Services/authService');
const register = async (req,res)=>{
    const {name,email,password , confirmpassword} = req.body;
    const user = await authService({name,email});
    if(!user){
        return res.status(500).json({success:false});
    }
    return res.json({sucess:true,message:"User created successfully.",data:user});
    
}
const getbyid = async (req,res)=>{
    const id = req.params.id;
    const user = await userService(id);
    if(!user){
        return res.status(500).json({success:false,message:"didn't fetch"});
    }
    return res.status(201).json({sucess:true,message:"User fetched successfully.",data:user});
    
}
const login=(req,res)=>{

}
const refreshtoken = (req,res)=>{

}
const logout = (req,res)=>{

}
module.exports = {register,login , refreshtoken,logout,getbyid};