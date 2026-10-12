const {CreateBookService,ReadBookService,PutBookService,
       PatchBookService,DeleteBookService} = require("../Services/BookService");
const ApiError = require("../utils/ApiError");
const CreateBook = async (req,res)=>{
    const {Title,isbn10,isbn13,description,publishedYear,language,edition,
        totalCopies,availableCopies,pageCount,format,status,authorID,publisherID,categoryID
    } = req.body;
    const result = await CreateBookService(Title,isbn10,isbn13,description,publishedYear,language,edition,
        totalCopies,availableCopies,pageCount,format,status,authorID,publisherID,categoryID);
    if(!result){
        throw new ApiError(500,"error");
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
