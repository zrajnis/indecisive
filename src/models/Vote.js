const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//set up a mongoose model and pass it using module.exports

module.exports = mongoose.model('Vote', new Schema({
  userId: Schema.ObjectId,
  dilemmaId: Schema.ObjectId,
  voteIndex: Number
}));

