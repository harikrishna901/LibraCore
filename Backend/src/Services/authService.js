const authModel = require("../Models/authModel")                                                                                                                             
const authService = async (name,email)=>{
    const auth = await authModel.create({name,email});
}
const userService =async (id)=>{
    const auth = await authModel.findById(id);
    return auth;
}

module.exports={authService,userService};