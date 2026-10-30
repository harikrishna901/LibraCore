const {CreateProfileService,ReadProfileService,PutProfileService,PatchProfileService} = require("../Services/MemberService");
const ApiError = require("../utils/ApiError");
const CreateProfile = async (req,res)=>{
    const result = await CreateProfileService(req.user,req.body);
    if(!result){
        throw new ApiError(500,"Profile Creation Failed.");
   }
   
    return res.status(200).json({success:true,message:"Profile created Successfully",data:result});
}
const ReadProfile = async(req,res)=>{
    const result = await ReadProfileService(req.params);
    if(!result){
        throw new ApiError(500,"Profile Fetched Failed.");
   }
   
    return res.status(200).json({success:true,message:"Profile Fetched Successfully",data:result});
}
const PutProfile = async (req,res)=>{
    if(req.params.id!==req.user.userid){
        throw new ApiError(404,"You are not allowed to perform.");
    }
    const result = await PutProfileService(req.params,req.body);
    if(!result){
        throw new ApiError(500,"Profile Updation Failed.");
   }
   
    return res.status(200).json({success:true,message:"Profile updated Successfully",data:result});


}
const PatchProfile = async (req,res)=>{
    if(req.params.id!==req.user.userid){
        throw new ApiError(404,"You are not allowed to perform.");
    }
    
    const result = await PatchProfileService(req.params,req.body);
    if(!result){
        throw new ApiError(500,"Profile Updation Failed.");
   }
   
    return res.status(200).json({success:true,message:"Profile updated Successfully",data:result});


}
const DeleteProfile = async (req,res)=>{

}

module.exports = {CreateProfile,ReadProfile,PutProfile,PatchProfile,DeleteProfile};
