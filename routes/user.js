const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Account = require('../models/account');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//Login
router.post('/login', function(req, res, next){
  const user = req.params.body;
  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
  });
});
// get a list of users from the db
router.get('/details', function(req, res, next){
    console.log(req.body.email);
    const User = req.body;
    user.findOne({ 'email':User.email,'password':User.password }).
  populate('account').
  exec(function (err, user) {
    if (err) return err;
    console.log("populated");
    res.send(user);
  });
});

// add a new user to the db

router.post('/post', function(req, res, next){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const { email, password, first_name,last_name} = req.body;
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password
    });
    
    user.save(function (err) {
      if (err) return handleError(err);
    
      const account = new Account({
        first_name,
        last_name   
      });
    
      account.save(function (err) {
        if (err) return handleError(err);
        // thats it!
      });
    });
});

// update a user in the db
router.put('/put/:id', function(req, res, next){
    user.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        user.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    }).catch(next);
});

// delete a user from the db
router.delete('/delete/:id', function(req, res, next){
    user.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    }).catch(next);
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