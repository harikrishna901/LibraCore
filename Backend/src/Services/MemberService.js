const {AddressModel , MemberModel} = require("../Models/MemberModel");
const ApiError = require("../utils/ApiError");
const CreateProfileService = async(id,data)=>{
    console.log("entered profileservice");
    try{
    const {PhoneNo,DateOfBirth,
           Gender,address
           }=data;
    const {userid}=id;
    const ExistMember = await MemberModel.findById(userid);
    if(!ExistMember){
        throw new ApiError(404,"Member not found.");
    }
    const ExitAddress = await AddressModel.findOne({MemberID:ExistMember._id});
    if(ExitAddress){
        throw new ApiError(400 ,"Address already registered.");
    }
    const CreateAddress = await AddressModel.create({MemberID:ExistMember._id,address:address});
    const UpdateMember = await MemberModel.updateOne({_id:ExistMember._id},
                                                     {$set:{
                                                     "PhoneNo":PhoneNo,
                                                     "DateOFBirth":DateOfBirth,
                                                     "Gender":Gender,
                                                     "AddressID":CreateAddress._id}});
    return {Name:ExistMember.toObject().name,Email:ExistMember.toObject().email};
    }catch(error){
        throw new ApiError(error.statusCode,error.message);
    }

}
module.exports = {CreateProfileService};