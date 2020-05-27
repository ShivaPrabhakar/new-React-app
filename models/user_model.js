var mongoose = require('mongoose');
var schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/key')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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
        type: []
    }

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
      this.findById(id,callback);
    },
    
    
    getUserByUsername : function(username,callback){
      this.find({username: username},callback);
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
    
    findByToken : function (token, callback) {
      var Superuser = this;
      jwt.verify(token,config.database.secret,function(err, decode){
        if(err) throw err;
        this.findOne({"_id":decode}, function(err, Superuser){
              if(err) {
                console.log(err);
                return callback(err);
              }
              callback(null, Superuser);
          })
      })
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;