const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Account = require('../models/account');
var bcrypt = require('bcryptjs');
const authenticateUser = require('./auth');
const passport = require('../passport');

//Login
router.post('/login',async(req, res, next)=>{
  let user = req.body;
    let result = await authenticateUser(user);
    console.log(result.err);
    if (result.err) return res.status(400).json({ success: false, msg: result.err });
    res.json({ success: true, token: result.token });
});
// get a list of users from the db
router.post('/details', passport.authenticate('jwt', { session: false }), async(req, res)=>{
  const id=req.user._id;
  console.log(id);
  try {
    let userDoc = await User.findById(id,'-password').populate('account');
    console.log(userDoc);
    res.status(200).json(userDoc);
  } catch (err) {
    console.log(err);
}
  
});

// add a new user to the db

router.post('/create', async(req, res, next)=>{
    //var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // var salt=await bcrypt.genSalt(10);
   // const hash=bcrypt.hash(user.password,salt);
    //user.password=hash;
   try{
    let user = { email: req.body.email, password: req.body.password };
    let account = { first_name: req.body.first_name, last_name: req.body.last_name };
    let account_created = await Account.create(account);
    user.account=account_created;
    let user_created = await User.create(user);
    console.log(user_created);
    try {
      let userDoc = await User.findById(user_created._id).populate('account');
      res.json(user_created);
    } catch (err) {
      console.log(err);
  }
  }  catch (err) {
    res.json({ err: err, words:'user already exists' });
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
  

module.exports = router;