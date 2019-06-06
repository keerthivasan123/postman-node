const express = require ('express');
const router = express.Router();
const account = require('../models/account');

// get a list of ninjas from the db
router.get('/get', function(req, res, next){
    res.send({type: 'GET'});
});

// add a new ninja to the db
router.post('/post', function(req, res, next){
    account.create(req.body).then(function(account){
        res.send(account);
    }).catch(next);
});

// update a ninja in the db
router.put('/put/:id', function(req, res, next){
    res.send({type: 'PUT'});
});

// delete a ninja from the db
router.delete('/delete/:id', function(req, res, next){
    res.send({type: 'DELETE'});
});

module.exports = router;