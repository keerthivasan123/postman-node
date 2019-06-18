const mongoose = require('mongoose');
const Account = require('./account')
const Schema = mongoose.Schema;

const user = Schema({
  email: String,
  password :String,
  account: [{ type: Schema.Types.ObjectId, ref: 'account' }]
});

//const Account = Schema({
 // first_name: String,
 // last_name: String
//});

//const Account = mongoose.model('acc', User);
const User = mongoose.model('user', user);
module.exports = User;