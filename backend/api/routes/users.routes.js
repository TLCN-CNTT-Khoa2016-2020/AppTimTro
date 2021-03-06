/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const bcrypt     = require('bcrypt-nodejs');
const jwt        = require('jsonwebtoken');
const checkAuth  = require('../middleware/check-auth');

/*<--------------------- IMPORT MODELS --------------------->*/
const User = require('../models/users.model');
const subRoutes =  require('../routes/subusers.routes');

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
                                    message : "User created",
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
/*<--------- POST /signupwithgoogle ---------> */ 
/* MISSION : CREATE NEW USER WITH GOOGLE */ 
router.post('/signupwithgoogle', (req, res, next) => {
    // check googleID
    User.findOne({"google.googleID" : req.body.googleID})
        .exec()
        .then(user => {
            if (user) { // if(user) it will return [] => always right
                return res.status(409).json({
                    message: "Username exists"
                });
            } else {
                // create new user
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    fullname : req.body.fullname,
                    avatarUrl : req.body.avatarUrl,
                    google : {
                        googleID : req.body.googleID
                    }
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

        })
        .catch()
});
/*<--------- POST /signinwithgoogle ---------> */ 
/* MISSION : SIGN IN WITH GOOGLE */ 
router.post('/signinwithgoogle', (req, res, next) => {
    User.findOne({"google.googleID" : req.body.googleID})
        .exec()
        .then(user => {
            //console.log(user)
            if(!user){
                return res.status(401).json({
                    message : "Login Failed",
                })
            } else {
                // save accessToken to database
                User.findOneAndUpdate(
                        {"google.googleID" : req.body.googleID},
                        {$set : {"google.accessToken": req.body.accessToken}}
                    )
                    .exec()
                    .then(result => {
                        //if result === null => cant find
                        if(result === null){
                            res.status(500).json({
                                message : "Can't find users"
                            })
                        }
                        console.log(result)
                        //json web token, create token
                        const token = jwt.sign(
                            {
                                userId   : user._id,
                                fullname : user.fullname
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn : process.env.JWT_KEY_TIME_LIFE
                            }  
                        );
                        return res.status(200).json({
                            message : "Login success !",
                            userID  : user._id,
                            token   : token 
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            error : error
                        })
                    })
                
            }
        }).catch(error => {
            res.status(500).json({
                error : error
            })
        })
})

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
            if(user.role !== "Admin")
            {
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
                                expiresIn : process.env.JWT_KEY_TIME_LIFE
                            }  
                        );
                        return res.status(200).json({
                            message : "Login success !",
                            userID  : user._id,
                            token   : token 
                        });
                    };
                    res.status(401).json({
                        message : "Login Failed"
                    })
                });
            } else {
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
                            process.env.ADMIN_JWT_KEY,
                            {
                                expiresIn : "1h"
                            }  
                        );
                        return res.status(200).json({
                            message : "Login success !",
                            userID  : user._id,
                            token   : token 
                        });
                    };
                    res.status(401).json({
                        message : "Login Failed"
                    })
                });
            }
            
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
});

/* MISSION : ADMIN LOGIN  */
router.post('/adminLogin', (req,res,next) => {
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
                        process.env.ADMIN_JWT_KEY,
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

/*<--------- GET /:userId --------->*/
/* MISSION : GET USER WITH ID */

router.get('/:userID', checkAuth, (req, res, next) => {
    User.findById(req.params.userID)
        .exec()
        .then(result => {
            res.status(200).json({
                result :  
                {
                    "userID"    : result._id,
                    "fullname"  : result.fullname,
                    "SDT"       : result.SDT,
                    "timtroStatus" : result.timtroStatus,
                    "avatarUrl"     : result.avatarUrl
                }
            })
            
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
})

/*<--------- GET /:userId --------->*/
/* MISSION : GET USER WITH ID */




router.use('/', subRoutes);

//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 