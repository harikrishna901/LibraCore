const {BookModel} = require("../Models/BookModel");
const ApiError = require("../utils/ApiError");
const CreateBookService=async (data)=>{
        const {Title,isbn10,isbn13,description,publishedYear,
            language,edition,totalCopies,availableCopies,pageCount,
            format,status,authorID,publisherID,categoryID} = data;
        try {
            existBook = await BookModel.findOne({ isbn10 });
        } catch (error) {
            console.error("ERROR DURING findOne()");
        }
        if(existBook){
            throw new ApiError(500,"Book Already Exists");
        }
        const createbook = await BookModel.create({Title,isbn10,isbn13,description,publishedYear,
                             language,edition,totalCopies,availableCopies,pageCount,format,
                            status,authorID,publisherID,categoryID});
        if(!createbook){
            throw new ApiError(500,"Book Creation Error.");
        }
        return {Title:createbook.Title,description:createbook.description};
}
const ReadBookService=()=>{

}
const PatchBookService=()=>{

}
const PutBookService=()=>{

}
const DeleteBookService=()=>{

}
module.exports={CreateBookService,
                ReadBookService,
                PatchBookService,
                PutBookService,
                DeleteBookService
}