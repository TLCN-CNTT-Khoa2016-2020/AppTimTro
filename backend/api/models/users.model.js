//<--------------------- CALL THE PACKAGE --------------------->
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//<--------------------- CREATE USER SCHEMA --------------------->

const userSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username : { type : String, required : true, index: {unique : true}},
    password : { type : String, required : true, select : false}
});




//<--------------------- EXPORT USER SCHEMA --------------------->
module.exports = mongoose.model('User', userSchema);