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
    console.log(status) 
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
// MISSON : POST EXPOPUSHTOKEN
exports.change_expo_pushToken = (req, res, next) => {
    const expoPushToken = req.body.token;
    const userID        = req.body.userID;
    User.findByIdAndUpdate({_id : userID},{$set : {expoPushToken : expoPushToken}})
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
// MISSON : GET NOTIFICATION
exports.get_notification = (req, res, next) => {
    // pageOptions
    console.log(req.body.userID)
    const pageOptions = {
        page : parseInt(req.query.page) || 0,
        limit : parseInt( req.query.limit) || 10
    }
    User.findById(req.body.userID)
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .select("_id notification")
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                    _id             : result._id,
                    notification    : result.notification          
            })
        })
}