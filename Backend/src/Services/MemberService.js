const {AddressModel , MemberModel} = require("../Models/MemberModel");
const ApiError = require("../utils/ApiError");
const CreateProfileService = async(data)=>{
    console.log("entered profileservice");
    try{
    const {UserName,email,PhoneNo,DateOfBirth,
           Gender,address
           }=data;
    const ExistMember = await MemberModel.findOne({email});
    if(!ExistMember){
        throw new ApiError(404,"Member not found.");
    }
    const ExitAddress = await AddressModel.findOne({MemberID:ExistMember._id});
    if(ExitAddress){
        throw new ApiError(400 ,"Profile Already Exist.");
    }
    const CreateAddress = await AddressModel.create({MemberID:ExistMember._id,address:address});
    const UpdateMember = await MemberModel.updateOne({_id:ExistMember._id},
                                                     {$set:{"UserName":UserName,
                                                     "PhoneNo":PhoneNo,
                                                     "DateOFBirth":DateOfBirth,
                                                     "Gender":Gender,
                                                     "AddressID":CreateAddress._id}});
    return {UserName:ExistMember.UserName};
    }catch(error){
        throw new ApiError(error.statusCode,error.message);
    }

}
module.exports = {CreateProfileService};