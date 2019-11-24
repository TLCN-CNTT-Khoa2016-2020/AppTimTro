/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const checkAuth  = require('../middleware/check-auth');

/*<--------------------- IMPORT CONTROLLERS --------------------->*/
const mapController = require('../controllers/map.controller');


/*<--------------------- ROUTES --------------------->*/


/*<--------- POST / ---------> */ 
/* MISSION : RETURN ALL LOCATIONS IS IN THE CIRCLE  */
router.post('/getlocationwithradius', checkAuth, mapController.getLocationWithRadius);






//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 