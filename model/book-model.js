const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    // id : {type : Number, required : true},
    name : {type : String, required : true},
    author : {type : String, required : true},
    genre : {type : String, required : true},
    price : {type : Number, required : true},
    publisher : {type : String, required : true},
    // quantity : {type : Number, required : true},
    // userissuedBooks : {type : Boolean, required : true},
    // issuedBook : {type : Number, required : true}
},{timestamps : true});

module.exports = mongoose.model("books", bookSchema);