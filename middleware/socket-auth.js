const User = require('../models/user_model');


function authenticate(socket, data, callback) {
    var username = data.username;
    var password = data.password;
    
    User.findOne({username:username}, function(err, user) {
      if (err || !user) return callback(new Error("User not found"));
      return callback(null, user.password == password);
    });
}
    
function postAuthenticate(socket, data) {
    var username = data.username;
   
    User.findOne({username:username}, function(err, user) {
        
      socket.client.user = user;
    });
}

function disconnect(socket) {
    console.log(socket.id + ' disconnected');
}


module.exports = {authenticate,postAuthenticate,disconnect}