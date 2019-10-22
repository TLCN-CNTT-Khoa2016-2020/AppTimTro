/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const checkAuth  = require('../middleware/check-auth');


/*<--------------------- IMPORT CONTROLLERS --------------------->*/
const PostsController = require('../controllers/post.controllers');
const subPostRouter   = require('../routes/subposts.routes');
/*<--------------------- ROUTES --------------------->*/


/*<--------- GET / ---------> */ 
/* MISSION : GET ALL POSTS  */
router.get('/',checkAuth, PostsController.get_all_posts);

/*<--------- POST / ---------> */ 
/* MISSION : CREATE POSTS  */
router.post('/',checkAuth, PostsController.create_posts);

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