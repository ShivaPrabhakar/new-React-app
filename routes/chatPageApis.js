const User = require("../models/user_model");
const {getChats,getOrCreateChat,rejectChatReq,acceptChatReq} = require('../services/chat');
const {getContacts} = require('../services/user');
module.exports = (app) => {


   

    app.get('/get/friends',async (req,res)=>{
        var token =  req.cookies.w_authExp;
        let contacts = await getContacts(token,0,10);
        res.send({contacts:contacts});
    })

    app.get('/get/chats',async (req,res)=>{
        let user  = req._parsedOriginalUrl.query.split('=')[1];
        let chats = await getChats(user);
    })

    app.get('/getorCreate/chat',async (req,res)=>{
        let user1  = req._parsedOriginalUrl.query.split("&")[0].split('=')[1];
        let user2 = req._parsedOriginalUrl.query.split("&")[1].split('=')[1];
        
        let chat = await getOrCreateChat(user1,user2);
    })

    app.put('/chat/reject',async (req,res)=>{
        console.log(req.query);
        let chatId = req.query.chatId;
        // console.log()
        let reject = await rejectChatReq(chatId);
        console.log(reject);

    })

    app.put('/chat/accept',async (req,res)=>{
        // console.log(req);
        console.log(req.query);
        let chatId = req._parsedUrl.query.split('=')[1];
        let accept = await acceptChatReq(chatId);
        console.log(accept);
    })

}