const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Dilemma', new Schema({
  title: String,
  description: String,
  answers: [String],
  answerVotes: [Number], //total number of votes for each answer
  timestamp: String,
  author: String //users are unique so name can be used as id in this case (also will reduce number of queries in total)
}));
