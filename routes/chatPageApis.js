const User = require("../models/user_model");
const url = require('url');
const querystring = require('querystring');
const {getChats,getOrCreateChat,rejectChatReq,acceptChatReq} = require('../services/chat');
const {getContacts, addAsFriend} = require('../services/user');
module.exports = (app) => {


   

    app.get('/get/friends',async (req,res)=>{
        var token =  req.cookies.w_authExp;
        console.log("token :",req.cookies);
        let contacts = await getContacts(token,0,10);
        res.send({contacts:contacts});
    })

    app.get('/get/chats',async (req,res)=>{
        let user  = req._parsedOriginalUrl.query.split('=')[1];
        let chats = await getChats(user);
        if(chats.length>0){
            res.status(200).send({chats});
        }
    })

    app.get('/getorCreate/chat',async (req,res)=>{
        let user1  = req.query.user1;
        let user2 = req.query.user2;
         
        let chat = await getOrCreateChat(user1,user2);
        if(chat!=null){
            res.send({chatId:chat.id});
        }
        else{
            res.send("Chat not found");
        }
    })

    app.put('/chat/reject',async (req,res)=>{
        console.log(req.query);
        let chatId = req.query.chatId;
        // console.log()
        let reject = await rejectChatReq(chatId);
        if(reject.accepted){
            res.send({reject:true});
        }
        else{
            res.send({reject:false});
        }

    })

    app.put('/chat/accept',async (req,res)=>{
        console.log(req.query);
        let chatId = req._parsedUrl.query.split('=')[1];
        let accept = await acceptChatReq(chatId);

        if(accept.accepted){
            res.send({accept:true});
        }
        else{
            res.send({accept:false});
        }
    })

    app.post('/add/friend', async (req, res) => {
        let user = req.body._user;
        let friendId = req.body._user;
        let cookies = req.headers.cookie.split(';');
        let token = "x";
        for(let c of cookies) {
            if(c.includes('w_authExp') > 0) {

                token = c.split('=')[1].split(";")[0];
                console.log("c :",c);
            }
        }

        console.log("cookies :",token);
        try {
            const s = await addAsFriend.$promisify({friendId: user, token})
            if(s){
                res.send({success:true});
            } else{
                res.send({success:false});
            }
        } catch (error) {
            res.send({success: false});
        }
        
        
    })

}