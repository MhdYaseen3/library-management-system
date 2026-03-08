const {bookModel, userModel} = require("../model/mix.js");
const {IssuedBookDto} = require("../DTO/Book-dto");

// const getAllBooks =  (req, res) => {
    
// }

// const getBookById =  (req, res) => {
    
// }

// module.exports = {getAllBooks, getBookById};


// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success :true,
//         data : books
//     })
// })


exports.getAllBooks = async (req, res) => {
    const books = await bookModel.find();

    if(!books){
        return res.status(404).json({
            success:false,
            message : `no book found`
        })
    
    }

    res.status(200).json({
        success : true,
        data : books,
        message : "all books found"
    })
}

// router.get('/:id',(req,res)=>{
//     const {id} = req.params;
//     const foundbook = books.find((each) => each.id === Number(id))
//     if(!foundbook){
//         return res.status(404).json({
//             success:false,
//             message : `book not found or id ${id}`
//         })
//     }
//     res.status(200).json({
//         success : true,
//         data : foundbook
//     })
// })

exports.getBookById =  async(req, res) => {
    
    const {id} = req.params;
    const foundbook = await bookModel.findById(id);
    if(!foundbook){
        return res.status(404).json({
            success:false,
            message : `book not found or id ${id}`
        })
    }
    res.status(200).json({
        success : true,
        data : foundbook
    })

}

// router.get('/issued/for-users', (req, res) => {
//     // const issuedBooks = books.filter((each) => each.issued === true);

//     const usersWithIssuedBooks = users.filter((each)=>{
//         if(each.issuedBook) {
//             return each;
//         }
//     })

//     const issuedBooks = [];
  
//     usersWithIssuedBooks.forEach((each)=>{
//         const book = books.find((book)=> book.id ===each.issuedBook);

//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedBooks.push(book)
//     })

//     if(!issuedBooks === 0){
//         return res.status(404).json({
//             success: false,
//             message: "No Books issued yet"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     });
// });

exports.getAllissuedBooks = async (req, res) => {

    const users =await userModel.find({
        issuedBook: {$exists:true},

    }).populate ("issuedBook")

    const issuedBooks = users.map((each)=>{
        return new IssuedBookDto(each);

    }
    )

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "No Books issued yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
};


// router.post('/',(req,res)=>{
//     const {id, name, author, quantity} = req.body;
//     if (!id || !name || !author || !quantity){
//         return res.status(400).json({
//             success:false,
//             message : "please provide all the required fields"
//         })
//     }

//     const bookExist = books.find((each) => each.id === Number(id));
//     if (bookExist){
//         return res.status(400).json({
//             success:false,
//             message : `book already exist with id ${id}`
//         })
//     }

//     books.push({id, name, author, quantity});
//     res.status(201).json({
//         success : true,
//         message : "book created successfully"
//     })
// })


exports.createBook = async(req, res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new book"
        })
    }

    await bookModel.create(data);
    // res.status(201).json({
    //     success: true,
    //     message: "Book added successfully",
    //     data: data
    // })

    const allBooks = await bookModel.find();
    res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: allBooks
    }); 
}



// router.put('/:id',(req,res)=>{
//     const {id} = req.params;
//     const {data} = req.body;

//     if (!data || Object.keys(data).length === 0){
//         return res.status(400).json({
//             success:false,
//             message : "please provide all the required fields"
//         })
//     }
//     const bookExist = books.find((each) => each.id === Number(id));
//     if (!bookExist){
//         return res.status(404).json({
//             success:false,
//             message : `book cannot found by id : ${id}`
//         })
//     }
//     const updatebook = books.map((each)=>{
//         if(each.id === Number(id)){
//             return {...each, ...data}

//         }
//         return each;
//     })
//     res.status(200).json({
//         success : true,
//         data : updatebook,
//         message : "book updated successfully"
//     })
// })

exports.updateBookbyId = async(req,res)=>{  
    const {id} = req.params;
    const {data} = req.body;

    const updatebook = await bookModel.findByIdAndUpdate(id, data, {new : true});
    if (!updatebook){
        return res.status(404).json({
            success:false,
            message : `book cannot found by id : ${id}`
        })
    }

}

// router.delete('/:id',(req,res)=>{
//         const {id} = req.params;
//     const bookExist = books.find((each) => each.id === Number(id));
//     if (!bookExist){
//         return res.status(404).json({
//             success:false,
//             message : `book cannot found by id : ${id}`
//         })
//     }

//     const updatebook = books.filter((each)=> each.id !== Number(id));
//     res.status(200).json({
//         success : true,
//         data : updatebook,
//         message : "book deleted successfully"
//     })
// })

exports.deleteBookbyId = async(req,res)=>{ 

    const {id} = req.params;
    const bookExist = await bookModel.findById(id);
    if (!bookExist){
        return res.status(404).json({
            success:false,
            message : `book cannot found by id : ${id}`
        })
    }

    await bookModel.findByIdAndDelete(id);
    res.status(200).json({
        success : true,
        message : "book deleted successfully"
    })
 }
