const express = require ('express');
const router = express.Router();
const account = require('../models/account');

// get a list of accounts from the db
router.get('/get', function(req, res, next){
    res.send({type: 'GET'});
});

// add a new account to the db
router.post('/post', function(req, res, next){
    account.create(req.body).then(function(account){
        res.send(account);
    }).catch(next);
});

// update a account in the db
router.put('/put/:id', function(req, res, next){
    account.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
       account.findOne({_id: req.params.id}).then(function(account){
            res.send(account);
        });
    }).catch(next);
});

// delete a account from the db
router.delete('/delete/:id', function(req, res, next){
    console.log(req.params.id);
    account.findByIdAndRemove({_id: req.params.id}).then(function(account){
        res.send(account);
    }).catch(next);
});

module.exports = router;