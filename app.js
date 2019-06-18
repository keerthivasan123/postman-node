const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
// set up express app
const app = express();

// DB Config
const db = "mongodb+srv://keerthi:keerthi@cluster0-lsaj1.mongodb.net/keerthi?retryWrites=true";

//Connection mongooDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/account', require('./routes/account'));
app.use('/user', require('./routes/user'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('now listening for requests');
});
