/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const checkAuth  = require('../middleware/check-auth');


/*<--------------------- IMPORT CONTROLLERS --------------------->*/
const PostsController = require('../controllers/post.controllers');

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

/*<--------- PATH /:postID ---------> */ 
/* MISSION : UPDATE POST WITH ID  */
router.put('/:postID', checkAuth, PostsController.update_posts);

/*<--------- DELETE /:postID ---------> */ 
/* MISSION : DELETE POST WITH ID  */
router.delete("/:postID", checkAuth, PostsController.delete_posts);


//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 