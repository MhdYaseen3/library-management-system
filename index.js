const express = require('express');
// const {user} = require('./data/user.json');

// const {books} = require('./data/books.json');

const userRouter = require("./routes/user");
const booksRouter = require("./routes/books");

const app = express();

const PORT = 8081;

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "welcome to library management system"
    })
})


app.use("/user",userRouter);
app.use("/books",booksRouter);




app.listen (PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`)
})