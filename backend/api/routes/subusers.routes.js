/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const checkAuth  = require('../middleware/check-auth');

/*<--------------------- IMPORT CONTROLLERS --------------------->*/
const UsersController = require('../controllers/user.controller');

/*<--------------------- ROUTES --------------------->*/

/*<--------- GET /timtrosetting/:userID ---------> */ 
router.get('/timtrosetting/:userID', checkAuth, UsersController.get_setting_timtro);
router.put('/updatetimtrosetting/:userID',checkAuth,UsersController.update_setting_timtro);
router.put('/changetimtrostatus/:userID', checkAuth, UsersController.change_timtro_status);
router.put('/updateexpopushtoken', checkAuth, UsersController.change_expo_pushToken);

//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 