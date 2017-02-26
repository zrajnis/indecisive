const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  username: String,
  lowercaseUsername: String,
  password: String,
  email: String,
  admin: Boolean
}));
