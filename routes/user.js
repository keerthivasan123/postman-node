const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Account = require('../models/account');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//Login
router.post('/login', async(req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  try{
     user= await User.findOne({ email:email });
      if(!user) return res.json("Email does'exist");
      var isMatch = password.localeCompare(user.password);
      if(isMatch==0)
      {
        console.log("logged in");
        jwt.sign({user}, 'secretkey', { expiresIn: '300s' }, (err, token) => {
          res.json({
            token,
            user:user._id
          });
        });
      }
  }catch(err)
  {
    return err;
  }
});
// get a list of users from the db
router.post('/details',verifyToken, async(req, res, next)=>{
  jwt.verify(req.token, 'secretkey', (err,authData) => {
    console.log(authData);
    console.log(err);
    if(authData) {
      res.json({
        message: 'Post created...',
        authData
      });
      
    } else {
      res.sendStatus(403);
    }
  });
    
    
    
});

// add a new user to the db

router.post('/create', async(req, res, next)=>{
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const { email, password, first_name,last_name} = req.body;
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password
    });
    try{
      user=user.save(function (err) {
        if (err) return handleError(err);
      
        const account = new Account({
          first_name,
          last_name   
        });
      
        account.save(function (err) {
          if (err) return handleError(err);
          // thats it!
          res.json("account created successfully");
        });
      });
    }
    catch(err)
    {
      return err;
    }
});

// update a user in the db
router.put('/put/:id', async(req, res, next)=>{
    user.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        user.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    }).catch(next);
});

// delete a user from the db
router.delete('/delete/:id', async(req, res, next)=>{
  try{
    let user = await user.findByIdAndRemove({_id: req.params.id});
    if(user)
    {
      res.send(user)
    }
    else{
      res.send('Not exitsting');
    }
  }
  catch(err)
  {
    return err; 
  }
});
// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      console.log(bearerHeader);
      // Split at the space
    //  const bearer = bearerHeader.split(' ');
      // Get token from array
    //  const bearerToken = bearer[1];
      // Set the token
      req.token = bearerHeader;
      // Next middleware
      next(); 
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }
  

module.exports = router;