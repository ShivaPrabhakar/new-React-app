const { app } = require( '../index');
const http = require('http');
const server = http.createServer(app);
const io = require('../config/socketCreate').io;
io.listen(server);




server.listen(3031);

