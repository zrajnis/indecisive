const router = require('express').Router();
const Vote = require('../models/Vote');
const Dilemma = require('../models/Dilemma');

router.post('/new', (req, res) => {
  const dilemmaId = req.body.dilemmaId;
  const answerIndex = req.body.answerIndex;

  Dilemma.findOne({
    '_id': dilemmaId}, (err, dilemma) => {
    if(err) {
      throw err;
    }
    if(dilemma && req.cookies['id']) {
      Vote.findOne({
        'userId': req.cookies['id'],
        'dilemmaId': dilemma._id
      }, (err, vote) => {
        if(err) {
          throw err;
        }
        if(!vote) { //user voted
          dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
            return index === answerIndex ? ++answerVote : answerVote;
          });
          dilemma.save();
          const newVoteModel = new Vote({
            'userId': req.cookies['id'],
            'dilemmaId': dilemma._id,
            'voteIndex': answerIndex
          });

          newVoteModel.save((err) => {
            if(err) {
              throw err;
            }
          });
          res.send({dilemma, vote: newVoteModel});
        }
        else {
          res.json({result: 'error: Vote already exists'});
        }
      });
    }
    else if(dilemma) { //guest voted
      dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
        return index === answerIndex ? ++answerVote : answerVote;
      });
      dilemma.save();
      const vote = {
        'voteIndex': answerIndex,
        'dilemmaId': dilemmaId
      };
      
      res.send({dilemma, vote});
    }
    else {
      res.json({result: 'error: Dilemma not found'});
    }
  });
});

router.post('/change', (req, res) => {
  const dilemmaId = req.body.dilemmaId;
  const oldAnswerIndex = req.body.oldAnswerIndex;
  const newAnswerIndex = req.body.newAnswerIndex;

  Dilemma.findOne({
    '_id': dilemmaId}, (err, dilemma) => {
    if(err) {
      throw err;
    }
    if(dilemma && req.cookies['id']) {
      Vote.findOne({
        'userId': req.cookies['id'],
        'dilemmaId': dilemma._id,
        'voteIndex': oldAnswerIndex
      }, (err, vote) => {
        if(err) {
          throw err;
        }
        if(vote) {
          dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
            if(index === oldAnswerIndex) {
              answerVote--;
            }
            else if(index === newAnswerIndex) {
              answerVote++;
            }
            return answerVote;
          });
          dilemma.save();
          vote.voteIndex = newAnswerIndex;
          vote.save();
          res.send({dilemma, vote});
        }
      });
    }
    else if(dilemma) {
      dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
        if(index === oldAnswerIndex) {
          answerVote--;
        }
        else if(index === newAnswerIndex) {
          answerVote++;
        }
        return answerVote;
      });
      dilemma.save();
      const vote = {
        'voteIndex': newAnswerIndex,
        'dilemmaId': dilemmaId
      };

      res.send({dilemma, vote});
    }
    else {
      res.json({result: 'error: Dilemma not found'});
    }
  });
});

router.post('/remove', (req, res) => {
  const dilemmaId = req.body.dilemmaId;
  const answerIndex = req.body.answerIndex;

  Dilemma.findOne({
    '_id': dilemmaId}, (err, dilemma) => {
    if(err) {
      throw err;
    }
    if(dilemma && req.cookies['id']) {
      Vote.findOne({
        'userId': req.cookies['id'],
        'dilemmaId': dilemma._id,
        'voteIndex': answerIndex
      }, (err, vote) => {
        if(err) {
          throw err;
        }
        if(vote) {
          vote.remove();
          dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
            return index === answerIndex ? --answerVote: answerVote;
          });
          dilemma.save();
          res.send({dilemma});
        }
      });
    }
    else if(dilemma) {
      dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
        return index === answerIndex ? --answerVote: answerVote;
      });
      dilemma.save();
      res.send({dilemma});
    }
    else {
      res.json({result: 'error: Dilemma not found'});
    }
  });
});

module.exports = router;
