/*<--------------------- CALL THE PACKAGE --------------------->*/
const express    = require('express');
const router     = express.Router();
const checkAuth  = require('../middleware/check-auth');

/*<--------------------- IMPORT CONTROLLERS --------------------->*/
const AppointmentController = require('../controllers/appoinment.controller');

/*<--------------------- ROUTES --------------------->*/

/*<--------- POST / ---------> */
/* MISSION : CREATE APPOINTMENT  */
router.post('/', checkAuth, AppointmentController.create_appointment);
/*<--------- GET / ---------> */
/* MISSION : GET ROOMMASTER APPOINTMENT  */
router.post('/getappointment', checkAuth, AppointmentController.get_appointment);
/*<--------- GET / ---------> */
/* MISSION : GET PEOPLE BOOKING APPOINTMENT  */
router.get('/getpeoplebookingappointment', checkAuth, AppointmentController.get_peopleBooking_appointment);




//<---------------------  EXPORT ROUTES --------------------->
module.exports = router; 