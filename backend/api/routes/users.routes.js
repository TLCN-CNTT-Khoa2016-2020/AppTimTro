/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const bcrypt     = require('bcrypt-nodejs');
const jwt        = require('jsonwebtoken');
const checkAuth  = require('../middleware/check-auth');

/*<--------------------- IMPORT MODELS --------------------->*/
const User = require('../models/users.model');

/*<--------------------- ROUTES --------------------->*/

/*<--------- GET / ---------> */ 
/* MISSION : GET ALL USER  */
router.get('/',checkAuth, (req, res, next)=> {  
    User.find()
        .select(" _id fullname username")
        .exec()
        .then( result =>{
            res.status(200).json({
                count : result.length,
                result : result.map(item => {
                    return {
                        "_id"      : item.id,
                        "fullname" : item.fullname,
                        "username" : item.username
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        });
});

/*<--------- POST /signup ---------> */ 
/* MISSION : CREATE NEW USER */ 
router.post('/signup', (req, res, next) => {
    //check username to avoid duplication
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) { // if(user) it will return [] => always right
                return res.status(409).json({
                    message: "Username exists"
                });
            } else {
                //hash the password from POST request
                bcrypt.hash(req.body.password, null, null, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        // create new user
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash,
                            fullname : req.body.fullname
                        });
                        //save user to database
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });

                    }
                });
            }
        })
});

/*<--------- POST /login ---------> */ 
/* MISSION : USER LOGIN  */
router.post('/login', (req,res,next) => {
    //find user to check username exists?
    User.findOne({username : req.body.username})
        .exec()
        .then(user => {
            console.log(user)
            if(!user){
                return res.status(401).json({
                    message : "Login Failed",
                })
            }
            //compare password
            console.log(req.body.password, user.password)
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                // if compare fail
                if(err){
                    return res.status(401).json({
                        message : "Login Failed",
                        error : err
                    })
                };
                if(result){
                    //json web token, create token
                    const token = jwt.sign(
                        {
                            username : user.username,
                            userId   : user._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn : "1h"
                        }  
                    );
                    return res.status(200).json({
                        message : "Login success !",
                        token   : token 
                    });
                };
                res.status(401).json({
                    message : "Login Failed"
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
});


/*<--------- DELETE /:userId --------->*/
/* MISSION : DELETE USER WITH ID */
router.delete('/:userId',checkAuth, (req, res, next) => {
    User.remove({_id : req.params.userId})
        .exec()
        .then(result => {
            console.log(result.length)
            if(!result.length){
                res.status(404).json({
                    message : "No valid entry found for provided ID"
                });
            }
            res.status(200).json({
                message : "User deleted !"
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        });
});







//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 