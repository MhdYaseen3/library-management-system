const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // id : {type : Number, required : true},
    name : {type : String, required : true},
    email : {type : String, required : true},
    issuedBook : {type : mongoose.Schema.Types.ObjectId, ref : "books", required : true},
    issuedDate : {type : Date, required : true},
    returnDate : {type : Date, required : true},
    subscriptionType : {type : String, required : true},
    subscriptionDate : {type : Date, required : true}
},{timestamps : true});

module.exports = mongoose.model("users", userSchema);