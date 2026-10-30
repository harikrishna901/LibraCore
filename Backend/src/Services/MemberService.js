const {AddressModel , MemberModel} = require("../Models/MemberModel");
const ApiError = require("../utils/ApiError");
const CreateProfileService = async(id,data)=>{
    try{
    const {PhoneNo,DateOfBirth,
           Gender,address
           }=data;
    const {userid}=id;
    const ExistMember = await MemberModel.findById(userid);
    if(!ExistMember){
        throw new ApiError(404,"User not found.");
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
const ReadProfileService = async(paramid)=>{
    const {id}=paramid;
    try{
        const existid = await MemberModel.findById(id);
        if(!existid){
            throw new ApiError(404,"User Not found");
        }
        const address = await AddressModel.findById(existid.AddressID);
        return {Name:existid.toObject().name,Email:existid.toObject().email,
                Gender:existid.toObject().Gender,PhoneNo:existid.toObject().PhoneNo,
                Address:address.toObject().address
        }
    }
    catch(error){
        throw new ApiError(error.statusCode,error.message);
    }

}
const PutProfileService = async(paramid,data)=>{
    const {PhoneNo,DateOfBirth,
           Gender,address}   = data
    const {id}=paramid;
    try{
        const existId = await MemberModel.findById(id);
        if(!existId){
             throw new ApiError(404,"User Not found");

        }
        const updateprofile = await MemberModel.updateOne({_id:id},{$set:{PhoneNo:PhoneNo,DateOfBirth:DateOfBirth,Gender:Gender}});

        if(!updateprofile){
            throw new ApiError(500,"Updataion failed");
        }
        const updateaddress = AddressModel.updateOne({_id:existId.AddressID},{$set:{address:address}},{
            new: true,
            runValidators: true
        });
         if(!updateaddress){
            throw new ApiError(500,"Updataion failed");
        }
        return {Name:existId.toObject().name,Email:existId.toObject().email}
    }catch(error){
        throw new ApiError(error.statusCode,error.message);
}

}

const PatchProfileService = async (paramid, data) => {
    const { id } = paramid;

    try {
        const { address, ...memberData } = data;
        const existId = await MemberModel.findById(id);

        if (!existId) {
            throw new ApiError(404, "Member not found");
        }

        let updatedMember = existId;
        let updatedAddress = null;

       
        if (Object.keys(memberData).length > 0) {
            updatedMember = await MemberModel.findByIdAndUpdate(
                id,
                { $set: memberData },
                { new: true, runValidators: true }
            );
        }

     
        if (address && Object.keys(address).length > 0) {

            if (!existId.AddressID) {
                throw new ApiError(404, "Address ID not found");
            }

            updatedAddress =await AddressModel.findByIdAndUpdate(
    existId.AddressID,
    {
        $set: {
            ...Object.fromEntries(
                Object.entries(address).map(
                    ([key, value]) => [`address.${key}`, value]
                )
            )
        }
    },
    { new: true, runValidators: true }
);

            if (!updatedAddress) {
                throw new ApiError(404, "Address not found");
            }
        }

      
        if (!updatedAddress && existId.AddressID) {
            updatedAddress = await AddressModel.findById(
                existId.AddressID
            );
        }

        return {
            PhoneNo: updatedMember.PhoneNo,
            DateOfBirth: updatedMember.DateOfBirth,
            Gender: updatedMember.Gender,
            Address: updatedAddress
        };

    } catch (error) {

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(500, error.message);
    }
};

module.exports = {CreateProfileService,ReadProfileService,PutProfileService,PatchProfileService};