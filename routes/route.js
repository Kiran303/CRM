const express = require('express');
var nodemailer = require("nodemailer");
const router = express.Router();

var app = express();
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../models/user');
const config = require('../models/token');
var auth = require('../middleware/auth');
var emailId ;

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'vikas.ahire@flowian.com',
        pass: '15*08*1990*'
    },
    tls: {rejectUnauthorized: false},
    debug:true
});

// send mail with defined transport object

//send Reset Link
router.post('/sendResetLink',(req, res)=>{
    console.log(req.body.email_id);

  User.findOne({'email' : req.body.email_id}, (err, user) => {
    console.log('Your Email ID is', req.body.email_id);
    if( err )
      return done(err);
     //if User Email is not registerd 
            if( !user ) {
            let content = {
                success: false,
                message: 'User does not exists'
            };
            res.send(content);
            return;
        }else{
                    emailId = req.body.email_id;
                    var text = "http://localhost:4200/reset";
                	var mailOptions={
                    from: "vikas.ahire@flowian.com", // sender address
                    to: req.body.email_id, // list of receivers
                    subject: "Hello", // Subject line
                    text: "Hii", // plaintext body
                    html: "Hii your new password can be reset from here:"+text // html body
                	}
                	console.log(mailOptions);
                	smtpTransport.sendMail(mailOptions, function(error, response){
                   	 if(error){
                        	console.log(error);
                		    res.end("error");
                	 }else{
                         let content = {
                             success: true,
                             message: 'Mail sended Successfully'
                                };
                        res.send(content);
                        return;
                        }
                    });
            }
  });

});
 
//update reset password
router.post('/reset',(req, res, next)=>{
    //console.log('emailId is -------->',emailId);
    //console.log("reset password",req.body.password);
    let newUser = new User({ });
     cpassword = newUser.generateHash(req.body.password); 

     if(!emailId){
         let content = {
                        success: false,
                        message: 'Bad Request'
                    };
                    res.send(content);
                    return;
     }
    
    User.findOneAndUpdate({ email: emailId },{ password: cpassword }, function(err, user) {
        if (err) throw err;
        // we have the updated user returned to us
                    let content = {
                        success: true,
                        message: 'New password updated Successfully'
                     //    token: token
                    };
                    emailId = '';
                    res.send(content);
                    return;                 
        });

    });

//retriving contacts
router.get('/getuser',(req, res, next)=>{

    User.find(function(err, users){
            res.json(users);
    });

});
router.get('/success',auth.verifyToken,(req, res, next)=>{
    console.log('in success api');
        let content = {
    success: true,
    message: 'Successfully logged in'
  }
  res.send(content);
});

router.get('/index',auth.verifyToken,(req, res, next)=>{
    console.log('in index api');
        let content = {
    success: true,
    message: 'Successfully logged in'
  }
  res.send(content);
});


router.post('/login',(req, res, next)=>{
    console.log('in login api');
    User.findOne({'email' : req.body.email}, (err, user) => {
    console.log('Email ID ', req.body.email);
    if( err )
      return done(err);

    if( !user ) {
      let content = {
        success: false,
        message: 'Invalid Credentials Please check Username or password again'
      };
      res.send(content);
      return;
    }

    if( !user.validPassword(req.body.password) ){
      let content = {
        success: false,
        message: 'Incorrect password'
      };
      res.send(content);
      return;
    }    
    let token = jwt.sign(user, config.secret, {
      expiresIn : 60*60*24
    });
    let content = {
      user: user,
      success: true,
      message: 'You logged in',
      token: token
    };
    res.send(content);
  })
});

//Register User 
router.post('/registerUser',(req, res, next)=>{

    User.findOne({'email' : req.body.email}, (err, user) => {
    console.log('Registerd Email ID ', req.body.email);
    if( err )
      return done(err);

    if(!user){
        let newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        state: req.body.state,
        city: req.body.city
    });
    newUser.password = newUser.generateHash(req.body.password); 
   console.log('New User ', req.body.email);
    newUser.save((err, user)=>{
        if(err)
        {
           let content = {
            success: false,
            message: 'Failed to Register'
        };
        res.send(content);
        return;
        }
        else
        {
            console.log('Sucess Register true');
            let content = {
            success: true,
            message: 'Registration successfull'
        };
        res.send(content);
        return;
        }
        
        });
    }  
    else{
        console.log('Registerd Email ID already exists');
        let content = {
        success: false,
        message: 'Email already Exists'
      };
      res.send(content);
      return;

    }

    });    
});


//Delete User
router.delete('/deleteuser/:id',(req, res, next)=>{
    User.remove({_id: req.params.id}, function(err, result){

        if(err)
        {
            res.json({msg:'failed delete user'});

        }
        else{
             res.json({msg:'user deleted successfully'});
        }

    });

});
module.exports = router;