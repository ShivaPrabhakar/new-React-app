const Chat = require('../models/chat_model')
const User = require('../models/user_model');

async function getOrCreateChat(user1,user2){
    try {
        let users = await User.find({_id:{$in : [user1,user2] }});
        let user;
        
        if(users[0].oneOneChats.indexOf(users[1]._id) < 0) {
            users[0].oneOneChats.push(users[1]._id);
            let u = users[0]
            let u1 = await User.findOneAndUpdate({_id:u._id},{oneOneChats:u.oneOneChats},{new:true});
            if(users[0]._id.toString() === user1) {
                user = u1;
            }
            console.log(u1);
        }
        if(users[1].oneOneChats.indexOf(users[0]._id) < 0) {
            users[1].oneOneChats.push(users[2]._id);
            let u = users[1]
            let u1 = await User.findOneAndUpdate({_id:u._id},{oneOneChats:u.oneOneChats},{new:true});
            if(users[1]._id.toString() === user1) {
                user = u1;
            }
            console.log(u1);
        } 
        return user;
    } catch (error) {
        console.error("error while fetching users in getOrCreateChat",error);
        throw error;
    } 
    

    
}

async function getChats(userId){
    try {
        const user = await User.find({_id:userId});
        console.log("user = ",user);
        return user.oneOneChats;
    } catch (error) {
        console.error("error while fetching user",error);
        throw error;
    }
}


module.exports = {getChats,getOrCreateChat};