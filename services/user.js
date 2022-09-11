const User = require('../models/user_model');
const { ResumeToken } = require('mongodb');
function loginVerification(username,password,callback){

    User.getUserByUsername(username,function(err,user){

        console.log("in finding user");

        if(err) { console.log(err); throw err};

        if(user.length === 0){
            console.log("no user");
            callback(null,{Login: false, message:'No such user found',status:404});   

        }
        console.log("after finding the user");
        if(user.length>0){
            var user1 = user[0];
            console.log(user1);
            User.comparePassword(password,user1,function(err,data){

                console.log("after comparing the password");
            //  console.log(data);
                let cdData = {Login:true,data}
                callback(err,cdData);                        

            });
        }
        

    });

}



function formValidation(req ,callback){
    console.log("in validation");
    req.checkBody('name', 'Name is required').notEmpty();

    req.checkBody('email', 'Email is required').notEmpty();

    req.checkBody('email', 'Email is not valid').isEmail();

    User.findOne({email:req.body.email}, function(err, user){

        if(err) { 
            throw err
        };

        if(user){

         //req.flash('failure','Email already exists');

         console.log("email exits");

         // return ;

        }

    });

    req.checkBody('username', 'Username is required').notEmpty();

    User.findOne({username:req.body.username}, function(err, user){

        if(err) throw err;

        if(user){

          //req.flash('failure','Username already exists');

          console.log("username exits");

        //   return ;

        }

    });

    req.checkBody('password', 'Password is required').notEmpty();

    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);



    req.getValidationResult().then(function(result){

        callback(result);

    });



}

const userSearch = async (searchText) => {
    let nameSearch = await User.userSearchByName(searchText);
    let usernameSearch  = await User.userSearchByUserName(searchText);
    let userEmailSearch = await User.userSearchByEmail(searchText);
    console.log(nameSearch.length);
    console.log(userEmailSearch.length);
    console.log(usernameSearch.length);
    let usernamearray = [];
    let resultMap = new Map();

    nameSearch.forEach((user)=>{
        if(!resultMap.has(user.username))
            resultMap.set(user.username , {_id: user._id, image:user.image,username:user.username,name:user.name});
    })
    
    usernameSearch.forEach((user)=>{
        if(!resultMap.has(user.username))
            resultMap.set(user.username , {_id: user._id, image:user.image,username:user.username,name:user.name});
    })
    userEmailSearch.forEach((user) =>{
        console.log(user.username.includes(usernamearray));
        if(!resultMap.has(user.username))
            resultMap.set(user.username , {_id: user._id, image:user.image,username:user.username,name:user.name});
    })
    let resultArray = [];
    for(let value of resultMap.values()){
        console.log(value);
        resultArray.push(value);
    }
    resultMap.clear();
    return resultArray;
}


async function getContacts(token,pno,psize){
    console.log("token :",token);
    let users = await User.getFriends(token,pno,psize);
    let contactObj = [];
    for(let i=0;i<users.length;i++){
        let img =  users[i].Image;
        let name = users[i].name;
        let obj = {
            image : img,
            name : name
        };
        contactObj.push(obj);
    }
    return contactObj;
}

function addAsFriend (args, callback) {
    const friendId = args.friendId;
    const token = args.token;

   
    User.findByToken({token},function(err,data){

        User.getUserById(friendId, async (e, f) => {
            if(e || !f) {
                console.error("error while finding friend",e, f);
                callback(e, null);
            } else {
                let friends = data.friends;
                if(friends && Array.isArray(friends) ) {
                    friends.push(f._id);
                } else {
                    friends = [f._id];
                }
                try {
                    const upU = await User.findOneAndUpdate({_id: data._id, deleted: false},{$set:{friends: friends}}).exec();
                    console.log("user added");
                    callback(null, upU);
                } catch (error) {
                    console.error("error while adding user",error);
                    callback(error, null);
                }
            }
        }); 

    });
            
        
}

module.exports = {loginVerification,formValidation,userSearch,getContacts, addAsFriend};
