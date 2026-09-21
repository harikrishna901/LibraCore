 const jsontoken = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const authenticate = (req,res,next)=>{
        try{
            const Header = req.headers.authorization;
            if(!Header){
                throw new ApiError(400,"invalid header..")

            }
            const authheader = Header.split(" ");
            if(authheader.length!==2 && authheader[0]!=="Bearer"){
                throw new ApiError(400,"Invalid auth header..");
            }
            const token = authheader[1];
            const result = jsontoken.verify(token,process.env.JWT_SECRET_KEY);
            req.user = result;
            next();
        }catch(error){
            throw new ApiError(500,error.message);
        }
    }

 module.exports=authenticate;