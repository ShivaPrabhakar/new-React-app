const bodyParser = require('body-parser');

const server = require('socket.io')();

const urlEncodedParser = bodyParser.urlencoded({extended: false});

const { auth } = require("../middleware/auth");

const User = require('../models/user_model');

const passport = require('passport');

const {loginVerification,formValidation,userSearch} = require('./../services/user');

console.log(typeof(User));





// User.find({}).distinct("email",(err,data) =>{

//     if(err) throw err;

//     data.forEach((id) =>{

//         console.log(id);

//     })

// })



module.exports = (app) => {



  

  



    // app.get('/',function(req,res){

    //     res.redirect('/api/register');

    // })



    // app.get('/api/register', function(req,res){

    //     res.render('index');    

    // });



    app.post('/api/register', urlEncodedParser ,function(req,res){

       
        console.log("in registeer api",req.body);
        formValidation(req,function(result){

            console.log(result.isEmpty());

            if (!result.isEmpty()) {

                var errors = result.array().map(function (elem) {

                    return elem.msg;

                });

                console.log('There are following validation errors: ' + errors.join(' && '));

                req.flash('failure', errors.join(' && ') );

            } 

        else {          

                var user =  {

                    name:req.body.name, 

                    email:req.body.email, 

                    username:req.body.username, 

                    password:req.body.password, 

                    token:"",

                    tokenExp : ""

                }           
                console.log("user creation");
                User.createUser({ user : user},function(err,user){

                    if(err){
                        console.log(err);

                        return res.status(500).json({Signup: false, message:'User is not registered', errors: err.message});

                    }

                    else{

                        console.log("success \n",user);
                        return res.status(201).json({Signup: true, message:'User is registered'});

                      

                    }

                })

            }

        });

    });



    // app.get('/api/login', function(req, res){

    //     res.render('loginf');

    // });

    app.post('/api/emailExist',function(req,res){
        const email = req.body.email;
        User.find({email:email},function(err,data){
            if(err){
                console.log(err);
                throw err;
            }
            else{
                if(data.length === 0){
                    console.log(data === []);
                    res.status(200).json({exist:false,message:'Email does not exit'});
                }
                else{
                    console.log(data[0] === undefined);
                    console.log(data);
                    //if()
                    res.status(400).json({exist:true,message:'Email exits'});

                }
            }
        })
    })

    app.post('/api/usernameExist',function(req,res){
        const username = req.body.username;
        User.find({username:username},function(err,data){
            if(err){
                console.log(err);
                throw err;
            }
            else{
                if(data.length === 0){
                    res.status(200).json({exist:false,message:'Username does not exit'});
                }
                else{
                    res.status(400).json({exist:true,message:'Username exits'});

                }
            }
        })
    })



    app.post('/api/login', urlEncodedParser ,function(req, res ){

        console.log("req cookie");

       if(req.cookie !== undefined  ){

           if(req.cookie.w_auth !== '')

                res.redirect('/chat');

       }

       if(req.cookie !== undefined ){

           if(req.cookie.w_authExp !== '')

                res.redirect('/chat');

       }

        loginVerification(req.body.logusername,req.body.logpassword,function(err,data){

            // console.log("bdjdbsbch");

            // console.log(req.body.logpasswor,"111d");

            if(err) throw err;

            if(data !== "error" && data.Login ){

                console.log("suces");
                res.cookie("w_authExp", data.token);

                res.cookie("w_auth",data.token);

               res.status(200).json({login:'true',token: data.token})

            } else{
                let msg = data.message || 'Password doesn\'t match.';
                return res.status(401).json({Login: false, message:msg});

            }

        });

    });





    console.log("udsgvubfcew");



    app.get('/auth/google',

  passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/plus.login',

  , 'https://www.googleapis.com/auth/plus.profile.emails.read' ]  }),function(req,res){

      console.log("hello");

     

  });



  app.get( '/auth/google/callback', 

  passport.authenticate( 'google', { 

      

      failureRedirect: '/auth/google/failure'

}),function(req,res){

    console.log("req = ",req._passport.session.user);

    let user = req._passport.session.user;

    res.cookie("w_authExp", user);

    res.cookie("w_auth",user);

    res.redirect('/api/chat');

});

    



      app.post("/api/logout", auth, (req, res) => {
        console.log("in api logout");

        //   console.log(req.cookies.w_authExp);

        User.findOneAndUpdate({ token: req.cookies.w_authExp },{new : true} ,{ token: "", tokenExp: "" }, (err, doc) => {

            if (err) return res.json({ success: false, err });

            server.on('disconnect', function() {

                console.log("<<<<<<<<<<<<<<<<<<<<disconected>>>>>>>>>>>>>>")

            });

            res.cookie("w_auth","");

            res.cookie("w_authExp","");

            console.log(res.cookie);
            res.status(200).json({logout:'true',token: doc.token})
            // res.redirect('/login');

        });

    });

    app.get('/search',async (req,res) => {
        console.log(req._parsedOriginalUrl.query.split('=')[1]);
        let searchText = '^'+req._parsedOriginalUrl.query.split('=')[1];
        let searchResult = await userSearch(searchText);
        if(searchResult.length > 0 ){
            res.status(200)
            res.send(searchResult);
        }
        else{ 
            res.status(400);
            res.send("No user found");
        }
    })

}


//.fromcontroler = fromcontroler; 