/*<--------------------- CALL THE PACKAGE --------------------->*/
const mongoose   = require('mongoose');
const mapHelper  = require('../helpers/map.helper');

/*<--------------------- IMPORT MODELS --------------------->*/
const Post = require('../models/posts.model');
const User = require('../models/users.model');

/*<--------------------- CONTROLERS --------------------->*/


// MISSON : RETURN LOCATIONS IS IN THE CIRCLE (CENTERPOINT AND RADIUS)
exports.getLocationWithRadius = (req, res, next) => {
    const centerPoint = req.body.centerPoint;
    const radius      = req.body.radius;
    Post.find()
        .select("_id room_price coordinates")
        .exec()
        .then(result => {
            // arr contains point is in the circle
            const arrData = result.filter(post => {
                let isInCircle = mapHelper.isInTheCircle(post.coordinates,centerPoint,radius);
                if(isInCircle){
                    return post;
                }
            });

            res.status(200).json({
                count : arrData.length,
                result : arrData
            })
        })
        .catch(error => {
            res.status(500).json({
                error : error
            })
        })
}
