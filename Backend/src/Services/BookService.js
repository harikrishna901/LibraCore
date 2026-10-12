const {BookModel} = require("../Models/BookModel");
const ApiError = require("../utils/ApiError");
const CreateBookService=async (Title,isbn10,isbn13,description,publishedYear,
                             language,edition,totalCopies,availableCopies,pageCount,format,
                            status,authorID,publisherID,categoryID)=>{
          try {
            existBook = await BookModel.findOne({ isbn10 });
        } catch (error) {
            console.error("ERROR DURING findOne()");
        }
        if(existBook){
            throw new ApiError(500,"Book Already Exists");
        }
        try{
        const createbook = await BookModel.create({Title,isbn10,isbn13,description,publishedYear,
                             language,edition,totalCopies,availableCopies,pageCount,format,
                            status,authorID,publisherID,categoryID});
        console.log(createbook);
        if(!createbook){
            throw new ApiError(500,"Creation Error.");
        }
        return {Title:createbook.Title,description:createbook.description,isbn10:createbook.isbn10,
            isbn13:createbook.isbn13,status:createbook.status,authorID:createbook.authorID,
            availableCopies:createbook.availableCopies,pageCount:createbook.pageCount,format:createbook.format,
            publisherID:createbook.publisherID,categoryID:createbook.categoryID};
        }catch(error){
            console.error("error in book creation");

        }
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