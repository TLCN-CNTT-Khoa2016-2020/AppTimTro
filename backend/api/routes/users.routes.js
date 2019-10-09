//<--------------------- CALL THE PACKAGE --------------------->
const express  =  require('express');
const router   =  express.Router();
const mongoose =  require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

//<--------------------- IMPORT MODELS --------------------->
const User     =  require('../models/users.model');

//<--------------------- ROUTES --------------------->
//<--------- POST /signup --------->
router.post('/signup', (req, res, next) => {
    //hash the password from POST request
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
        if(err){
            return res.status(500).json({
                error : err
            });
        } else {
            // create new user
            const user = new User({ 
                _id :  new mongoose.Types.ObjectId(),
                username : req.body.username,
                password : hash
            });
            //save user to database
            user.save()
                .then(result => {
                    res.status(201).json({
                        message : "User created"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });

        }
    });
    
});







//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 