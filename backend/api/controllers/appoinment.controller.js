/*<--------------------- CALL THE PACKAGE --------------------->*/
const mongoose   = require('mongoose');



/*<--------------------- IMPORT MODELS --------------------->*/
const Appointment = require('../models/appointment.model');

// hihihihihi hahahahaha
/*<--------------------- CONTROLERS --------------------->*/

// MISSiON : CREATE APPOINTMENT
exports.create_appointment = (req, res, next) => {
    //console.log(req.body.appointmentDate)
    // create new appointment
    const appointment = new Appointment({
        _id                 : new mongoose.Types.ObjectId(),
        appointmentDate      : req.body.appointmentDate, 
        roomMaster          : req.body.roomMaster,
        peopleBooking       : {
            _id         : req.body.peopleBooking._id,
            fullname    : req.body.peopleBooking.fullname,
            SDT         : req.body.peopleBooking.SDT
        },
        postID          : req.body.postID
    });
    console.log(appointment)
    appointment.save()
               .then(result => {
                   res.status(201).json({
                       message : "Appointment created !",
                       result : result
                   });
               })
               .catch(err => {
                   res.status(500).json({
                       error : err
                   });
               })
};

//MISSION : get appointment with userID
exports.get_appointment = (req, res, next) => {
        Appointment.find( { $or :[{"roomMaster": req.body.userID},{"peopleBooking._id" : req.body.userID}]})         
                .exec()
                .then(result => {   
                    res.status(200).json({
                        count : result.length,
                        result : result.map(item => {
                            return {
                                "_id"               : item._id,
                                "peopleBooking"     : item.peopleBooking,
                                "roomMaster"        : item.roomMaster,
                                "appointmentDate"   : item.appointmentDate,
                                "postID"            : item.postID

                            }
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error : err
                    })
                })
}
//MISSION : peopleBooking see their appointment
exports.get_peopleBooking_appointment = (req, res, next) => {
    Appointment.find({"peopleBooking._id" : req.body.peopleBooking})
                .exec()
                .then(result => {
                    res.status(200).json({
                        count : result.length,
                        result : result.map(item => {
                            return {
                                "_id"               : item._id,
                                "peopleBooking"     : item.peopleBooking,
                                "roomMaster"        : item.roomMaster,
                                "appointmentDate"   : item.appointmentDate,
                                "postID"            : item.postID

                            }
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error : err
                    })
                })
}