const io = require('socket.io')();
const {authenticate,postAuthenticate,disconnect} = require('../middleware/socket-auth');
const { model } = require('../models/user_model');

require('socketio-auth')(io, {
    authenticate: authenticate,
    postAuthenticate: postAuthenticate,
    disconnect: disconnect,
    timeout: 1000
});

module.exports.io = io;