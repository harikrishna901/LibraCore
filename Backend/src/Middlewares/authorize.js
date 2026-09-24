const ApiError = require("../utils/ApiError")
const {ROLE_PERMISSIONS} = require("../consonants/rolepermissions");

const authorize =(permissions)=>{
    return(req,res,next)=>{
        if(!req.user){
            throw new ApiError(401,"Authentication Required..");
        }
        const hasrole = ROLE_PERMISSIONS[req.user.role];
        if(!hasrole){
            throw new ApiError(403,"Role not Found..");
        }
        const haspermission =hasrole.includes(permissions);
        console.log(haspermission);
        if(!haspermission){
            throw new ApiError(403,"forbidden permission not allowed..");
        }
        next();
    }

}
module.exports = {authorize};