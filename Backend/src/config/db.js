const mongoose = require('mongoose');
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{dbName:process.env.DB_NAME});
        console.log("database connected successfully..");
    }catch(error){
        console.error("connection failed..",error.message);
        process.exit(1);
    }
}
module.exports = connectDB;