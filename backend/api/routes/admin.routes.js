/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const checkAuthAdmin  = require('../middleware/check-auth-admin');

/*<--------------------- IMPORT CONTROLLERS --------------------->*/
const PostsController = require('../controllers/post.controllers');

/*<--------------------- ROUTES --------------------->*/

/*<--------- GET /:postID  ---------> */    
router.get('/:postID', checkAuthAdmin,PostsController.admin_get_post_with_id);
/*<--------- PUT /checkpost ---------> */
router.put('/checkpost', checkAuthAdmin, PostsController.admin_check_post);
/*<--------- DELETE /deletepost ---------> */
router.delete('/delete', checkAuthAdmin, PostsController.admin_delete_post);






//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 
