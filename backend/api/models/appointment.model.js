//<--------------------- CALL THE PACKAGE --------------------->
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//<--------------------- CREATE USER SCHEMA --------------------->

const appointmentSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    appointmentDate : { type : Date , required : true},
    roomMaster      : { 
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    peopleBooking   : {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "User"
        },
        fullname : { type : String, require : true},
        SDT : { type : Number, require : true}
        
    },
    postID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Post"
    }
});
//<--------------------- EXPORT USER SCHEMA --------------------->
module.exports = mongoose.model('Appointment', appointmentSchema);