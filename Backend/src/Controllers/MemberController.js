const {CreateProfileService} = require("../Services/MemberService");
const ApiError = require("../utils/ApiError");
const CreateProfile = async (req,res)=>{
    console.log("entered profile controller.");
    const result = await CreateProfileService(req.body);
    if(!result){
        throw new ApiError(500,"Profile Creation Failed.");
   }
    return res.status(200).json({success:true,message:"Profile created Successfully",data:result});
}
const ReadProfile = async(req,res)=>{

}
const PutProfile = async (req,res)=>{

}
const PatchProfile = async (req,res)=>{

}
const DeleteProfile = async (req,res)=>{

}

module.exports = {CreateProfile,ReadProfile,PutProfile,PatchProfile,DeleteProfile};
