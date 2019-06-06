const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: String,
  password: String,
  account: [{ type: Schema.Types.ObjectId, ref: 'Account' }]
});

const User = mongoose.model('user', userSchema);
module.exports = User;
