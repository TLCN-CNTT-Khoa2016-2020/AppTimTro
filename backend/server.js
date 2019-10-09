const http      = require('http');
const app       = require('./app');
const port      = process.env.PORT || 8080; //create PORT for our app
const server    = http.createServer(app);// create server
//START SERVER
server.listen(port) ;