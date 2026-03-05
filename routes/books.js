const express = require('express');
const {books} = require('../data/books.json');

const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        success :true,
        data : books
    })
})

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const foundbook = books.find((each) => each.id === Number(id))
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
})

router.post('/',(req,res)=>{
    const {id, name, author, quantity} = req.body;
    if (!id || !name || !author || !quantity){
        return res.status(400).json({
            success:false,
            message : "please provide all the required fields"
        })
    }

    const bookExist = books.find((each) => each.id === Number(id));
    if (bookExist){
        return res.status(400).json({
            success:false,
            message : `book already exist with id ${id}`
        })
    }

    books.push({id, name, author, quantity});
    res.status(201).json({
        success : true,
        message : "book created successfully"
    })
})

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    if (!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success:false,
            message : "please provide all the required fields"
        })
    }
    const bookExist = books.find((each) => each.id === Number(id));
    if (!bookExist){
        return res.status(404).json({
            success:false,
            message : `book cannot found by id : ${id}`
        })
    }
    const updatebook = books.map((each)=>{
        if(each.id === Number(id)){
            return {...each, ...data}

        }
        return each;
    })
    res.status(200).json({
        success : true,
        data : updatebook,
        message : "book updated successfully"
    })
})

router.delete('/:id',(req,res)=>{
        const {id} = req.params;
    const bookExist = books.find((each) => each.id === Number(id));
    if (!bookExist){
        return res.status(404).json({
            success:false,
            message : `book cannot found by id : ${id}`
        })
    }

    const updatebook = books.filter((each)=> each.id !== Number(id));
    res.status(200).json({
        success : true,
        data : updatebook,
        message : "book deleted successfully"
    })
})

router.get('/issued/for-user',(req,res)=>{

    const userissuedBooks = books.filter((each)=> each.userissuedBooks);

    const issuedBook = [];

    userissuedBooks.forEach((each)=>{
        const book = books.find((book) => book.id === each.issuedBook);

        if(book){
            book.issuedby = each.name;
            issuedBook.push(book);
        }
    })

    if(issuedBook.length === 0){
        return res.status(404).json({
            success:false,
            message : `no book found`
        })
    }

    res.status(200).json({
        success : true,
        data : issuedBook,
        message : "book found successfully"
    })
})

module.exports = router;