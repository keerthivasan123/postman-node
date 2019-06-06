    
const express = require('express');

// set up express app
const app = express();

// initialize routes
app.use('/account', require('./routes/account'));
app.use('/user', require('./routes/user'));
// listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('now listening for requests');
});