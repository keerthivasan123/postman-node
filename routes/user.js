const express = require ('express');
const router = express.Router();
const user = require('../models/user');

// get a list of ninjas from the db
router.get('/get', function(req, res, next){
    res.send({type: 'GET'});
});

// add a new ninja to the db
router.post('/post', function(req, res, next){
    req.body
    user.create(req.body).then(function(user){

        res.send(user);
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