const router = require('express').Router();
const User = require('../models/User');
const Vote = require('../models/Vote');
const Dilemma = require('../models/Dilemma');

function mapDilemmasAndVotes(dilemmas, user, dilemmaIds, votesArray, req, res) {
  if(user) { //if logged in
    //use more loops than needed but as a result only return votes for loaded dilemmas and map them to co-relate with dilemmas index wise( better scalability and faster response overall)
    dilemmas.forEach((dilemma) => {
      dilemmaIds.push(dilemma._id);//array with ids of each dilemma
    });
    Vote.find({
      'userId': req.cookies['id'],
      'dilemmaId': {$in: dilemmaIds} //get all the votes on loaded dilemmas for the user
    }, (err, votes) => {
      if(err) {
        throw err;
      }
      dilemmas.forEach((dilemma, index) => { //map votes so that each index of vote in array is the vote of the dilemma with same index in dilemmas array
        votes.forEach((vote) => {
          if(vote.dilemmaId.toString() === dilemma._id.toString()) {
            votesArray.push(vote);
          }
        });
        if(!votesArray[index]) {
          votesArray.push({'voteIndex': -1});
        }
      });
      res.send({dilemmas, votes: votesArray});
    });
  }
  else { //guest
    dilemmas.forEach((dilemma) => { //since guest is not logged in map each vote with index -1
      votesArray.push({'voteIndex': -1, 'dilemmaId': dilemma._id});
    });
    res.send({dilemmas, votes: votesArray});
  }
}

router.post('/create', (req, res) => {
  const newDilemma = req.body.dilemmaData;
  const timestamp = new Date().toLocaleString('uk-UA'); //im well aware timestamp can be pulled out of ObjectId().getTimestamp()
  let answerVotes = newDilemma.answers.slice(); //copy array by val
  answerVotes.forEach((answer, index) => { //change all values to 0
    answerVotes[index] = 0;
  });

  User.findOne({
    '_id': req.cookies['id']
  }, (err, user) => {
    if (err) {
      throw err;
    }
    if (user) {
      const newDilemmaModel = new Dilemma({
        title: newDilemma.title,
        description: newDilemma.description,
        answers: newDilemma.answers,
        answerVotes: answerVotes,
        timestamp: timestamp,
        author: user.username
      });

      newDilemmaModel.save((err) => {
        if(err) {
          throw err;
        }
      });
      res.json({result: 'Dilemma created'});
    }
    else {
      res.json({result: 'User not found'});
    }
  });
});

router.post('/load/home', (req, res) => {
  const dilemmaIds = [];
  const votesArray = [];

  User.findOne({
    '_id': req.cookies['id']
  }, (err, user) => {
    if(err) {
      throw err;
    }
    Dilemma.find({}, (err, dilemmas) => {
      if(err) {
        throw err;
      }
      mapDilemmasAndVotes(dilemmas, user, dilemmaIds, votesArray, req, res);
    });
  });
});

router.post('/load/newest', (req, res) => {
  const dilemmaIds = [];
  const votesArray = [];

  User.findOne({
    '_id': req.cookies['id']
  }, (err, user) => {
    if(err) {
      throw err;
    }
    Dilemma.find().sort({timestamp : -1}).then((dilemmas) => {
      mapDilemmasAndVotes(dilemmas, user, dilemmaIds, votesArray, req, res);
    });
  });
});

router.post('/load/hot', (req, res) => {
  const dilemmaIds = [];
  const votesArray = [];

  User.findOne({
    '_id': req.cookies['id']
  }, (err, user) => {
    if(err) {
      throw err;
    }
    Dilemma.aggregate([
      {'$unwind': '$answerVotes'},
      {
        '$group': {
          '_id': '$_id',
          'title': {'$first': '$title'},
          'answers': {'$first': '$answers'},
          'totalCount': {
            '$sum': '$answerVotes'
          },
          'answerVotes': {
            '$push' : '$answerVotes'
          },
          'timestamp': {'$first': '$timestamp'},
          'author': {'$first': '$author'}
        }
      },
      {
        '$project': {
          'title': 1,
          'answers': 1,
          'answerVotes': 1,
          'timestamp': 1,
          'author': 1,
          'totalCount': 1
        }
      }
    ]).sort({'totalCount': -1}).then((dilemmas) => {
      mapDilemmasAndVotes(dilemmas, user, dilemmaIds, votesArray, req, res);
    });
  });
});

router.post('/load/mine', (req, res) => {
  const dilemmaIds = [];
  const votesArray = [];

  User.findOne({
    '_id': req.cookies['id']
  }, (err, user) => {
    if(err) {
      throw err;
    }
    if(user) {
      Dilemma.find({
        'author': user.username}, (err, dilemmas) => {
        if(err) {
          throw err;
        }
        mapDilemmasAndVotes(dilemmas, user, dilemmaIds, votesArray, req, res);
      });
    }
    else { //only scenario where this can happen is if users id cookie was manually erased,so we remove token too
      res.clearCookie('token');
    }
  });
});


router.post('/search', (req, res) => {
  const dilemmaIds = [];
  const votesArray = [];
  const title = req.body.title;

  User.findOne({
    '_id': req.cookies['id']
  }, (err, user) => {
    if(err) {
      throw err;
    }
    Dilemma.find({
      'title': title
    }, (err, dilemmas) => {
      if(err) {
        throw err;
      }
      if(dilemmas.length > 0) { //dilemmas is an array and empty array is truthy so we need to check length
        mapDilemmasAndVotes(dilemmas, user, dilemmaIds, votesArray, req, res);
      }
      else {
        res.json({result: 'Dilemma not found'});
      }
    });
  });
});

module.exports = router;
