/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const checkAuth  = require('../middleware/check-auth');

/*<--------------------- IMPORT CONTROLLERS --------------------->*/
const PostsController = require('../controllers/post.controllers');

/*<--------------------- ROUTES --------------------->*/

/*<--------- GET /approvedpost/:userID?page=xxx&limit=xxx ---------> */ 
/* MISSION : GET POST IS APPROVED  */
router.get('/approvedpost/:userID', checkAuth, PostsController.get_posts_isApproved);

/*<--------- GET /unapprovedpost/:userID?page=xxx&limit=xxx ---------> */ 
/* MISSION : GET POST IS UNAPPROVED  */
router.get('/unapprovedpost/:userID', checkAuth, PostsController.get_posts_isUnApproved);




//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 