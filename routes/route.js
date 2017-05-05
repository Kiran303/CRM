const express = require('express');
const router = express.Router();

var app = express();
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../models/user');
const config = require('../models/token');
var auth = require('../middleware/auth');




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
        message: 'User does not exists'
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





//add User
router.post('/adduser',(req, res, next)=>{

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