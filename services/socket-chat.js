const io = require('../config/socketCreate').io;
const User = require('../models/user_model');
const Chat = require('../models/chat_model');
const Message = require('../models/message_model');



function bindSocketEvents(socket) {
    socket.on('joinRoom',roomJion);
    socket.on('inputMessage', inputEvent);
    socket.on('previousChat',previousChat);
    socket.on('clear', clearEvent);
    socket.on('disconnect', function() {
        console.log('discoennnnnnn');
        unbindSocketEvents(socket);
    })
}


function unbindSocketEvents(socket) {
    console.log('off caleddd....');
    socket.removeAllListeners('inputMessage');
    socket.removeAllListeners('previousChat');
    socket.removeAllListeners('clear');
    console.log('off caleddd....end');
}


function socketConnect(){
    console.log("connect socket");
    io.on('connect',function(socket){
        console.log("<<<<<<<< server socket connected >>>>>..");

        // User.find({_id:})
        bindSocketEvents(socket);
    });
    socket.on('error',function(err){
        console.log(err);
    })
    io.on('error',function(err){
        console.log(err);
    })
}



function inputEvent(data){
    console.log(data);
    let id = data.name.toString();
    let message = data.message;
    User.findOne({_id:id},function(err,user){
        if(err) throw err;
        name = user.name;
      if(name == '' || message == ''){
            sendStatus('Please enter a name and message');
        } else {
            let chat = {
                sender:name,
                message:message,
            };
            Chat.insert(chat,function(err,data){
                if(err) throw err;
                socket.emit('output', [data]);
                sendStatus({
                    message: 'Message sent',
                    clear: true
                });
            });
        }
    });
}


function previousChat(data){
    Chat.find({},function(err,chatdata){
        if(err) throw err;
        socket.emit('previousChat', chatdata);
        sendStatus({
            message: 'Previous Message sent',
            clear: true
        });
    })
}

function clearEvent(){
    console.log("clear Event ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
    Chat.deleteMany({}, function(err){
        if(err) throw err;
        console.log("delete .,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,")
        socket.emit('cleared');
    });
}


async function roomJion(data){
    let id = data.id;
    let room = data.room;
    let chat = {
        users:[id],
        requested_by: id,
    }
    let data = await Chat.insert(chat)
    if(data._id){
        let user = await User.findOne({_id:id});
        if(user._id === id){
            let chats = user.chats;
            chats.push(data._id);
            let newUser = await User.findOneAndUpdate({_id:user._id},{chats:chats},{new:true});
            if(newUser.chats.length === chats.length)
                console.log("added to chats");
            else
                throw newUser;
        }
    }
    else{
        throw data;
    }



}