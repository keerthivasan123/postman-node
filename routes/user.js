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
  try{
     user= User.findOne({email:email}).exec();
      console.log('The author is %s', user.account);
      res.json(user);
  }catch(err)
  {
    return err;
  }
});
// get a list of users from the db
router.get('/details', async(req, res, next)=>{
    console.log(req.body.email);
    const user = req.body;
    User.
    findOne({ email: user.email }).
    populate('account').
    exec(function (err, story) {
      if (err) return handleError(err);
      console.log('The author is %s', story.account.last_name);
      // prints "The author is Ian Fleming"
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
      user.save(function (err) {
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
    let user = user.findByIdAndRemove({_id: req.params.id});
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
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }
  

module.exports = router;