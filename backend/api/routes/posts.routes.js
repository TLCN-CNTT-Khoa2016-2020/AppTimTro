/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const checkAuth  = require('../middleware/check-auth');
const multer     = require('multer');
const storage    = multer.memoryStorage({
    destination : function (req, file ,cb){
        cb(null,'./uploads/');
    },
    filename : function (req, file, cb){
        cb(null,  Date.now()  + file.originalname);
    }
});
//const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) =>{
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'  ){
        cb(null, true);
    } else {
        cb(null, false);
    }
    
    
}
const upload = multer({
        storage: storage ,
        limits : {
            fileSize : 1024 * 1024 *5
        },
        fileFilter : fileFilter
}).array('room_image',5)


/*<--------------------- IMPORT CONTROLLERS --------------------->*/
const PostsController = require('../controllers/post.controllers');
const subPostRouter   = require('../routes/subposts.routes');
/*<--------------------- IMPORT MIDDLEWARE --------------------->*/
const resizeImage = require('../middleware/resizeImage')
/*<--------------------- ROUTES --------------------->*/


/*<--------- GET / ---------> */ 
/* MISSION : GET ALL POSTS  */
router.get('/',checkAuth, PostsController.get_all_posts);

/*<--------- POST / ---------> */ 
/* MISSION : CREATE POSTS  */
router.post('/',checkAuth,upload,resizeImage, PostsController.create_posts);

/*<--------- GET /:postID ---------> */ 
/* MISSION : GET POST WITH ID  */
router.get('/:postID', checkAuth, PostsController.get_posts_withID);

/*<--------- PUT /:postID ---------> */ 
/* MISSION : UPDATE POST WITH ID  */
router.put('/:postID', checkAuth, PostsController.update_posts);

/*<--------- DELETE /:postID ---------> */ 
/* MISSION : DELETE POST WITH ID  */
router.delete("/", checkAuth, PostsController.delete_posts);

/*<--------- GET /approvedpost ---------> */ 
/* MISSION : GET POST IS APPROVED  */
//router.get('/approvedpost/', checkAuth, PostsController.get_posts_isApproved);
router.use('/',subPostRouter);


//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 