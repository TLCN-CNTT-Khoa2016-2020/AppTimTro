//<--------------------- CALL THE PACKAGE --------------------->
const express = require('express'); // call express
const app = express(); //define our app using express
const bodyParser = require('body-parser');
const morgan = require('morgan');//loging
const mongoose = require('mongoose');
const cors = require('cors');
//env config
require('dotenv').config();
//connect to database
// mongoose.connect('mongodb://thanghiep001:'
//                 + process.env.MONGO_ATLAS_PW
//                 +'@cluster0-shard-00-00-vpujr.mongodb.net:27017,cluster0-shard-00-01-vpujr.mongodb.net:27017,cluster0-shard-00-02-vpujr.mongodb.net:27017/AppTimTro?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://thanghiep001:' + process.env.MONGO_ATLAS_PW + '@cluster0-vpujr.mongodb.net/AppTimTro?retryWrites=true&w=majority')
mongoose.set('useCreateIndex', true);

//<--------------------- APP CONFIG --------------------->

app.use('/uploads', express.static('uploads'))
//use body-parser to grab information from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//config our app  to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With, content-type, Authorization');
    next();
});
app.use(cors({
    'allowedHeaders': ['Content-Type'],
    'origin': '*',
    'preflightContinue': true
}))
//log all requests to the console
app.use(morgan('dev'));

//<--------------------- ROUTES FOR API --------------------->
//IMPORT ROUTERS
const usersRouters = require('./api/routes/users.routes');
const postsRouters = require('./api/routes/posts.routes');
const approvedPostRouter = require('./api/routes/subposts.routes');
const appointmentRouter = require('./api/routes/appointment.routes');
const adminRouter = require('./api/routes/admin.routes');

//ROUTES
app.use('/users', usersRouters);
app.use('/posts', postsRouters);
app.use('/approvedpost', approvedPostRouter);
app.use('/appointment', appointmentRouter);
app.use('/admin', adminRouter);


//handling error

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error,
            me: "chonay"
        }
    })
})

//<--------------------- EXPORT APP --------------------->
module.exports = app;