//<--------------------- CALL THE PACKAGE --------------------->
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//<--------------------- CREATE USER SCHEMA --------------------->

const userSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username : { 
        type : String, 
        required : true, 
        index: {unique : true},
        //match : /^[a-z][^\W_]{7,14}$/
        /*
            [a-z]    the first letter
            [^\W_]   equivalent to [a-zA-Z0-9] 
        */
    },
    password : { 
        type : String, 
        required : true, 
        //select : false,
        //match : /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/
        /*
        (?=[^a-z]*[a-z]) check if there is at least 1 lower case letter 
        (?=\D*\d)   check if there is at least 1 digit
        [^:&.~\s]  a character class that exclude all the characters you don't want
         */
    },
    fullname : { type : String, required : true }
});




//<--------------------- EXPORT USER SCHEMA --------------------->
module.exports = mongoose.model('User', userSchema);