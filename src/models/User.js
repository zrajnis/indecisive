const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//set up a mongoose model and pass it using module.exports

module.exports = mongoose.model('User', new Schema({
  username: String,
  lowercaseUsername: String,
  password: String,
  email: String,
  dilemmaVotes: [{dilemmaId: Schema.ObjectId,voteIndex: Number}], //pair id of dilemma that user voted for and index of option he voted for
  admin: Boolean
}));
