const {CreateBookService,ReadBookService,PutBookService,
       PatchBookService,DeleteBookService} = require("../Services/BookService");
const ApiError = require("../utils/ApiError");
const CreateBook = async (req,res)=>{
    const result = await CreateBookService(req.body);
    if(!result){
        throw new ApiError(500,"Creation Book Failed.");
    }
    return res.status(200).json({success:true,message:"Book created Successfully.",data:result});

}
const ReadBook = ()=>{

}
const PutBook = ()=>{

}
const PatchBook = ()=>{

}
const DeleteBook = ()=>{

}
module.exports = {CreateBook,
                  ReadBook,
                  PutBook,
                  PatchBook,
                  DeleteBook
};
