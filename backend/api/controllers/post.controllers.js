/*<--------------------- CALL THE PACKAGE --------------------->*/
const mongoose   = require('mongoose');
const checkArea  = require('../middleware/checkArea');




/*<--------------------- IMPORT MODELS --------------------->*/
const Post = require('../models/posts.model');
const User = require('../models/users.model');

/*<--------------------- CONTROLERS --------------------->*/

//MISSION : GET ALL POSTS
exports.get_all_posts =  (req, res, next) => {
    Post.find()
        .populate("userId")
        //.select("_id title address day_submit kind_of_room room_price room_area room_deposi electric_price water_price parking_price wifi_price gender description utilities userId")
        .exec()
        .then(result => {
            res.status(200).json({ 
                count : result.length,
                result : result.map(item => {
                    return {
                        "_id"           : item.id,
                        "title"         : item.title,
                        "address"       : item.address,
                        "day_submit"    : item.day_submit,
                        "kind_of_room"  : item.kind_of_room,
                        "room_price"    : item.room_price,
                        "room_area"     : item.room_area,
                        "room_deposi"   : item.room_deposi,
                        "electric_price": item.electric_price,
                        "water_price"   : item.water_price,
                        "parking_price" : item.parking_price, 
                        "wifi_price"    : item.wifi_price,
                        "gender"        : item.gender,
                        "description"   : item.description,
                        "utilities"     : item.utilities,
                        "room_image"    : item.room_image,
                        "is_approved"   : item.is_approved,
                        "user" : {
                            "_id"       : item.userId.id,
                            "fullname"  :item.userId.fullname
                        }
                    }
                })
            })
        })
    
};

// MISSION : CREATE NEW POST
exports.create_posts = (req, res, next) => {

    // console.log(req.files);
    // console.log(req.body.images)
    //create new Post
    const post = new Post({
        _id : new mongoose.Types.ObjectId(),
        title  :  req.body.title,
        address : req.body.address,
        day_submit :  req.body.day_submit,
        kind_of_room : req.body.kind_of_room,
        room_price  : req.body.room_price,
        room_area : req.body.room_area,
        room_deposi : req.body.room_deposi,
        electric_price : req.body.electric_price,
        water_price : req.body.water_price,
        parking_price : req.body.parking_price,
        wifi_price : req.body.wifi_price,
        gender : req.body.gender,
        description :  req.body.description,
        utilities : {
            wc_rieng : req.body.utilities.wc_rieng,
            an_ninh : req.body.utilities.an_ninh,
            chu_rieng : req.body.utilities.chu_rieng,
            tu_do : req.body.utilities.tu_do,
            cua_so : req.body.utilities.cua_so,
            chode_xe : req.body.utilities.chode_xe,
            wifi : req.body.utilities.wifi,
            may_lanh : req.body.utilities.may_lanh,
            tu_lanh : req.body.utilities.tu_lanh,
            may_giat : req.body.utilities.may_giat,
            nha_bep : req.body.utilities.nha_bep,
            thu_cung : req.body.utilities.thu_cung
        },
        room_image :  req.body.images.map((item) => {
            return `uploads/${item}`;
        }),
        coordinates : {
            latitude : req.body.coordinates.latitude,
            longitude : req.body.coordinates.longitude
        },
        userId : req.body.userId
    });
    //console.log(post )
    //save post to database
    post.save()
        .then(result => { 
            // save postsID to userShema
            User.findByIdAndUpdate({_id : req.body.userId},{$push: {posts : post._id}})
                .exec()
                .then(result =>{
                    res.status(201).json({
                        message : "Posts created !",
                    })
                    checkArea(post._id,post.coordinates,post.room_price);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })

            
        })
        .catch(err => {
            res.status(500).json({
                error : err,
                mess: "loi"
            })
        })
};

//MISSION : GET POST WITH ID
exports.get_posts_withID = (req, res, next) => {
    Post.findById(req.params.postID)
        .populate("userId")
        .exec()
        .then(result => {
            res.status(200).json({
                result : 
                        {
                            "_id"           : result.id,
                            "title"         : result.title,
                            "address"       : result.address,
                            "day_submit"    : result.day_submit,
                            "kind_of_room"  : result.kind_of_room,
                            "room_price"    : result.room_price,
                            "room_area"     : result.room_area,
                            "room_deposi"   : result.room_deposi,
                            "electric_price": result.electric_price,
                            "water_price"   : result.water_price,
                            "parking_price" : result.parking_price,
                            "wifi_price"    : result.wifi_price,
                            "gender"        : result.gender,
                            "description"   : result.description,
                            "utilities"     : result.utilities,
                            "room_image"    : result.room_image,
                            "user" : {
                                "_id"       : result.userId.id,
                                "fullname"  :result.userId.fullname
                            }
                        }
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err,
                message : "ID không tồn tại" 
            })
        })
}


//MISSION : UPDATE POST WITH ID
exports.update_posts = (req, res, next) => {
    // create new clone from req
        const post = {
            title  :  req.body.title,
            address : req.body.address,
            kind_of_room : req.body.kind_of_room,
            room_price  : req.body.room_price,
            room_area : req.body.room_area,
            room_deposi : req.body.room_deposi,
            electric_price : req.body.electric_price,
            water_price : req.body.water_price,
            parking_price : req.body.parking_price,
            wifi_price : req.body.wifi_price,
            gender : req.body.gender,
            description :  req.body.description,
            utilities : {
                wc_rieng : req.body.utilities.wc_rieng,
                an_ninh : req.body.utilities.an_ninh,
                chu_rieng : req.body.utilities.chu_rieng,
                tu_do : req.body.utilities.tu_do,
                cua_so : req.body.utilities.cua_so,
                chode_xe : req.body.utilities.chode_xe,
                wifi : req.body.utilities.wifi,
                may_lanh : req.body.utilities.may_lanh,
                tu_lanh : req.body.utilities.tu_lanh,
                may_giat : req.body.utilities.may_giat,
                nha_bep : req.body.utilities.nha_bep,
                thu_cung : req.body.utilities.thu_cung
            }
        }
            //userId : req.body.userId
    // find post and update with id
    Post.findOneAndUpdate({_id : req.params.postID},{$set : post})
        .exec()
        .then(result => {

            //if result === null => no post
            if(result === null){
                res.status(500).json({
                    message : "Can't find posts"
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
};
// MISSION : DELETE POST WITH ID
exports.delete_posts = (req, res, next) => {
    // find and detele post with ID
    Post.findByIdAndRemove({_id : req.body.postID})
        .exec()
        .then(result => {

            // remove id in usersSchema
            User.findByIdAndUpdate({_id : req.body.userID},{$pull : {posts : {$in : req.body.postID}}})
                .exec()
                .then(result =>{
                    res.status(200).json({
                        messsage : "Delete Successfull !"
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error : err
                    })
                })    
        })
        .catch(err => {
            req.status(500).json({
                error : err
            })
        })
};

// MISSION : GET POSTS IS APPROVED = TRUE
exports.get_posts_isApproved = (req, res, next) => {
    // pageOptions
    const pageOptions = {
        page : parseInt(req.query.page) || 0,
        limit : parseInt( req.query.limit) || 10
    }
    Post.find(
            {   
                userId : req.params.userID,
                is_approved : true
            }
        )
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .select("_id title room_price address room_image")
        .exec()
        .then(result =>{
            res.status(200).json({
                count : result.length,
                result : result.map(item => {
                    return {
                        "_id"       : item.id,
                        "title"     : item.title,
                        "room_price": item.room_price,
                        "address"   : item.address,
                        "room_image": item.room_image[0]
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
};
// MISSION : GET POSTS IS APPROVED = TRUE
exports.get_posts_isUnApproved = (req, res, next) => {
    // pageOptions
    const pageOptions = {
        page : parseInt(req.query.page) || 0,
        limit : parseInt( req.query.limit) || 10
    }
    Post.find(
            {   
                userId : req.params.userID,
                is_approved : false
            }
        )
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .select("_id title room_price address room_image")
        .exec()
        .then(result =>{
            res.status(200).json({
                count : result.length,
                result : result.map(item => {
                    return {
                        "_id"       : item.id,
                        "title"     : item.title,
                        "room_price": item.room_price,
                        "address"   : item.address,
                        "room_image": item.room_image[0]
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
};


//<-----------ADMIN------------->
// MISSON : SHOWPOST WITH ID
exports.admin_get_post_with_id = (req, res, next) => {
    Post.findById(req.params.postID)
        .populate("userId")
        .exec()
        .then(result => {
            res.status(200).json({
                result : 
                        {
                            "_id"           : result.id,
                            "title"         : result.title,
                            "address"       : result.address,
                            "day_submit"    : result.day_submit,
                            "kind_of_room"  : result.kind_of_room,
                            "room_price"    : result.room_price,
                            "room_area"     : result.room_area,
                            "room_deposi"   : result.room_deposi,
                            "electric_price": result.electric_price,
                            "water_price"   : result.water_price,
                            "parking_price" : result.parking_price,
                            "wifi_price"    : result.wifi_price,
                            "gender"        : result.gender,
                            "description"   : result.description,
                            "utilities"     : result.utilities,
                            "is_approved"   : result.is_approved,
                            "user" : {
                                "_id"       : result.userId.id,
                                "fullname"  :result.userId.fullname
                            }
                        }
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err,
                message : "ID không tồn tại" 
            })
        })
}   
//MISSION : CHECK POST
exports.admin_check_post = (req, res, next) => {
    Post.findByIdAndUpdate({_id : req.params.postID},{$set : {is_approved : true}})
        .exec()
        .then(result => {

            //if result === null => no post
            if(result === null){
                res.status(500).json({
                    message : "Can't find posts"
                })
            }
            res.status(200).json({
                message : "Update Successful !"
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
}
// MISSON : DELETE POST
exports.admin_delete_post = (req, res, next) => {
    // find and detele post with ID
    Post.findByIdAndRemove({_id : req.body.postID})
        .exec()
        .then(result => {

            // remove id in usersSchema
            User.findByIdAndUpdate({_id : req.body.userID},{$pull : {posts : {$in : req.body.postID}}})
                .exec()
                .then(result =>{
                    res.status(200).json({
                        messsage : "Delete Successfull !"
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error : err
                    })
                })    
        })
        .catch(err => {
            req.status(500).json({
                error : err
            })
        })
}

//MISSON :  GET 20 POST FOR MAINSCREEN
exports.get_post_for_mainscreen = (req, res, next) => {
    // pageOptions
    const pageOptions = {
        page : parseInt(req.query.page) || 0,
        limit : parseInt( req.query.limit) || 10
    }
    Post.find()
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .select("_id title room_price room_image")
    .exec()
    .then(result =>{
        res.status(200).json({
            count : result.length,
            result : result.map(item => {
                return {
                    "_id"       : item.id,
                    "title"     : item.title,
                    "room_price": item.room_price,
                    "room_image": item.room_image[0]
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
