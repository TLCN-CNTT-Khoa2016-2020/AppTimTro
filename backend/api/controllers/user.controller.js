/*<--------------------- CALL THE PACKAGE --------------------->*/
const mongoose   = require('mongoose');



/*<--------------------- IMPORT MODELS --------------------->*/
const Post = require('../models/posts.model');
const User = require('../models/users.model');

/*<--------------------- CONTROLERS --------------------->*/

//MISSION : GET TIMTROSTATUS
exports.get_setting_timtro = (req, res, next) => {
    User.findById(req.params.userID)
        .exec()
        .then(result => {
            res.status(200).json({
                result : {
                    "userID" : result._id,
                    "timtroSetting" : result.timtroSettings
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
}

// MISSON : UPDATE TIM TRO STATUS
exports.update_setting_timtro = (req, res, next) => {
    // create new setting 
    const timtroSettings = {
        area : req.body.area,
        rangePrice : req.body.rangePrice
    }
    User.findByIdAndUpdate({_id : req.params.userID},{$set :{timtroSettings : timtroSettings }},{new: true})
        .exec()
        .then(result => {
            //if result === null => no post
            if(result === null){
                res.status(500).json({
                    message : "Can't find users"
                })
            }
            res.status(200).json({
                message : "Update Successful !",
                result : result
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
    console.log(timtroSettings); 
}

// MISSON : CHANGE TIMTRO STATUS
exports.change_timtro_status = (req, res, next) => {
    const status  = req.body.status;
    User.findByIdAndUpdate({_id : req.params.userID},{$set : {timtroStatus : status}})
        .exec()
        .then( result => {
            //if result === null => no post
            if(result === null){
                res.status(500).json({
                    message : "Can't find users" 
                })
            }
            res.status(200).json({
                message : "Update Successful !",
                result : result
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
}