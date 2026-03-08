const express = require("express");
// const {users} = require("./data/users.json")
const dotenv = require("dotenv")

dotenv.config();



// import database connection file
const DbConnection = require('./databaseConnection')

// importing the routers
const usersRouter = require("./routes/user");
const booksRouter = require("./routes/books");   


const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res)=> {
    res.status(200).json({
        message: "Home Page :-)"
    })
})

app.use("/user", usersRouter);
app.use("/books", booksRouter);




// app.all('*',(req, res)=> {
//     res.status(500).json({
//         message: "Not Built Yet"
//     })
// })

app.listen(PORT, ()=>{
    console.log(`Server is up and runing on http://localhost:${PORT}`)
})