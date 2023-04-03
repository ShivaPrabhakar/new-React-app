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
        try {
            let chats = await getChats(user);
            if(Array.isArray(chats) && chats.length > 0){
                res.status(200).send({chats});
            } else {
                res.status(200).send({success:false, err: chats});
            }
        } catch (error) {
            res.status(200).send({success:false, error});
        }
        
    })

    app.get('/getorCreate/chat',async (req,res)=>{
        let user1  = req.query._user;
        let user2 = req.query._contact;
        try {
            let user = await getOrCreateChat(user1,user2);
            if(user!=null && user.oneOneChats.indexOf(user1) > -1){
                res.send({success: true, msg: "chat found or added successfully", user});
            }
            else{
                res.send({success: false, err: "Chats not found"});
            }
        } catch (error) {
            res.send({success: false, error});
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