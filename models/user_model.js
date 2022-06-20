var mongoose = require('mongoose');
var schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/key');
var modelutil = require('./model_util');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var oneToOneChatDoc = {
  // _id: false,
  _id: {
      type: schema.Types.ObjectId,
      ref: 'User',
      set: modelutil.ignoreEmpty
  },
 
}

var friends = {
  // _id: false,
  _id: {
      type: schema.Types.ObjectId,
      ref: 'User',
      set: modelutil.ignoreEmpty
  },
  
}


var UserSchema = new schema({
    name : {
        type: String,
        required: true,
      //  index : true
    },

    username : {
        type: String,
        unique: true,
        required: true,
      //  index : true
    },

    password:{
        type: String, 
        required:true  
    },

    email:{
        type: String,
        unique: true,
        required: true,
      //  index : true
    },

    googleId:{
        type: String,
    },

    isAdmin:{
        type: Boolean,
        default:false,
       // index: true 
    },

    createdAt:{
        type: Date,
        default : Date.now,
        trim: true
    },

    token:{
        type: String,
    },

    modifiedAt : {
        type:Date,
        default: Date.now,
        trim: true
    },

    deleted : {
        type : Boolean,
        default : false,
    },

    profilepic:{
        type: String
    },
    isAgent:{
        type:Boolean,
        default : false,
    },
    friends: {
      type: [schema.Types.ObjectId],
      ref: 'User'
    },
    Image:{
      type: String,
      default : '',
    },
    oneOneChats: {
      type: [schema.Types.ObjectId],
      ref: 'User'
  },
});
UserSchema.set('toObject', { virtuals: true });
// UserSchema.index({
//     deleted:1,
//     usernmae:1
// },{
//     unique: true,
//     partialFilterExpression: {
//         username: {
//             $exists: true
//         },
//         deleted: false,
//     }
// });
UserSchema.static({
    comparePassword : function(plainPassword, user, callback){  
        bcrypt.compare(plainPassword, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
              var id = user._id;
              var token = jwt.sign({_id:id},config.db.secret,{expiresIn : 6000000 });
              User.findOneAndUpdate({ _id: user._id }, { token: token },{new : true},function(err,data){
                callback(err,data);
              });
            }else{
              callback(err,"error");
            }
        });
    },
    
    getUserById : function(id,callback){
      User.findById(id,callback);
    },
    
    
    getUserByUsername : function(username,callback){
      User.find({username: username},callback);
    },
    
    createUser : function(newUser,callback){
      let nUser = new this(newUser.user);
      
        bcrypt.hash(nUser.password, 10, function(err, hash){
        if(err){
            console.log(err);
        }
        bcrypt.compare(nUser.password,hash,function(err, isMatch){
          if(err) throw err;
        })
        nUser.password = hash;
        nUser.save(callback);
      }) 
      
    },
    
    findByToken : function (tokenData, callback) {
      var Superuser = User;
      let token = tokenData.token;
      let gId = tokenData.googleId;
      jwt.verify(token,config.db.secret,function(err, decode){
        if(err) throw err;
        User.findOne({"_id":decode}, function(err, Superuser){
              if(err) {
                console.log(err);
                return callback(err);
              }
              callback(null, Superuser);
          })
      })
    },
  getFriends : async(token,pno,psize) => {
      let user = await User.findOne({ token: token });
      let friends = [];
      if( user.friends) {
        friends = user.friends;
      }

      console.log(user);
      let users = await User.find({"_id":{$in : friends}}).sort().skip(psize*pno).limit(psize);
      return users;
  },
  userSearchByName : async (searchText) => {

    return await User.find({name:{$regex : searchText , $options : 'i'}})
     .sort({name : -1})
     .limit(7)
  },
  userSearchByUserName :  async (searchText) => {
    return await User.find({username:{$regex : searchText , $options : 'i'}})
     .sort({name : -1})
     .limit(7)
  },
  userSearchByEmail : async (searchText) => {
    return await User.find({email:{$regex : searchText , $options : 'i'}})
     .sort({name : -1})
     .limit(7)
  },

});

const User = mongoose.model('User',UserSchema);
module.exports = User;