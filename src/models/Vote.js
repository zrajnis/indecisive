const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Vote', new Schema({
  userId: Schema.ObjectId,
  dilemmaId: Schema.ObjectId,
  voteIndex: Number
}));

