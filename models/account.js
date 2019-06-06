const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = Schema({
    first_name: String,
    last_name: String
  });

  
const Account = mongoose.model('account', accountSchema);
module.exports = Account;
