const Chat = require('../models/chat_model')
const User = require('../models/user_model');

async function getOrCreateChat(user1,user2){
    
        const chats = await Chat.find({ users: { $all: [user1,user2] } });
        if (chats === null || chats.length == 0) {
            // creating new chat id

            const newChat = Chat({
                users: [user1, user2],
                requested_by: user1
            });

            await newChat.save();
        let user = await User.find({_id:{$in : [user1,user2] }});
        console.log("user == ",user);
            user[0].chats.push(newChat._id);
            user[1].chats.push(newChat._id);
        for(let u in user){
            let u1 = await User.findOneAndUpdate({_id:u.Id},{chats:u.chats},{new:true});
            console.log(u1);
        }
            console.log(newChat);
            return  newChat
            
        } else {
            console.log(chats[0]);
            return  chats[0];
        }
    
}

async function getChats(userId){
    const user = await User.find({_id:userId});
    console.log("user = ",user);

    const chats = await Chat.find({_id:{$in:user.chats}});
    console.log("chats = ",chats);
    let user_ids = new Array();

    for (var c in chats) {
        user_ids.push(chats[c].users[0]);
        user_ids.push(chats[c].users[1]);
    }
    const avatars = await User.find({_id:{$in:user_ids}},{_id:1,image:1,name:1});
    console.log("avatars = ",avatars," ")

}

async function acceptChatReq(chatId){
    const chat = await Chat.findById(chatId);
    chat.accepted = true;
    return await chat.save();
}

async function rejectChatReq(chatId){
    const chat = await Chat.findById(chatId);
    chat.rejected = true;
    return await chat.save();
}

module.exports = {getChats,getOrCreateChat,acceptChatReq,rejectChatReq};