const express = require('express');

// const books = await bookModel.find();
const {books} = require('../data/books.json');
const {user} = require('../data/user.json');

const { userModel, bookModel } = require("../model/mix.js");
const { getAllBooks ,getBookById , getAllissuedBooks , createBook , updateBookbyId , deleteBookbyId} = require('../controller/book-controller');
const router = express.Router();


// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success :true,
//         data : books
//     })
// })

router.get('/', getAllBooks);

router.get('/:id',getBookById);

router.post('/',createBook);

router.put('/:id',updateBookbyId)

router.delete('/:id',deleteBookbyId);

router.get('/issued/for-users', getAllissuedBooks);
module.exports = router;