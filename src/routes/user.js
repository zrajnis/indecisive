const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Dilemma = require('../models/Dilemma');
const Vote = require('../models/Vote');

//middleware to verify the token
router.use((req, res, next) => {
  //check header or url parameters or post parameters for token
  const token = req.cookies['token'];
  //decode token
  if(token){
    //verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
      if(err) {
        res.clearCookie('token');//remove the token
        return res.json({success: false, message: 'Failed to authenticate token.'});
      }
      else{
        //if everything is good,save to request for use in other routers
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.redirect('http://localhost:3000');
  }
});

router.get('/', (req, res) => {
  res.render('index', { name: 'Indecisive' });
});

router.post('/settings', (req, res) => {
  const data = req.body.value;
  const inputType = req.body.type;
  
  switch(inputType) {
    case 'email':
      User.findOne({
        'email': data.toLowerCase()
      }, (err, user) => {
        if(err) throw err;
        if(user) {
          console.log('Email is already in use');
          res.json({result: 'Email is already in use'});
        }
        else {
          User.findOneAndUpdate({
              '_id':req.cookies['id']
            },{$set: {'email': data.toLowerCase()}},
            {safe: true, upsert: false}, (err) => {
              if(err) throw err;
              res.json({result: 'Success'});
            });
        }
      });
      break;
    case 'password':
      User.findOneAndUpdate({
          '_id':req.cookies['id']
        },{$set: {'password': data}},
        {safe: true, upsert: false}, (err) =>{
          if(err) throw err;
          res.json({result:'Success'});
        });
      break;
    default:
      res.json({result: 'Something unexpected happened'});
      break;
  }
});

router.delete('/settings', (req, res) => {
  User.findOneAndRemove({
    '_id': req.cookies['id']
  }, (err) => {
    if (err) throw err;
    res.clearCookie('token');
    res.clearCookie('id');
    res.json({result: 'Success'});
  })
});

router.post('/createDilemma', (req, res) => {
  const newDilemma = req.body.dilemmaData;
  const timestamp = new Date().toLocaleString('en-GB'); //im well aware timestamp can be pulled out of ObjectId().getTimestamp(), i prefer this logic though
  let answerVotes = newDilemma.answers.slice(); //copy array by val
  answerVotes.forEach((answer, index) => { //change all values to 0
    answerVotes[index] = 0;
  });

  User.findOne({
    '_id': req.cookies['id']
  }, (err, user) => {
    if (err) throw err;
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
        if (err) throw err;
      });
      res.json({result: 'Dilemma created'});
    }
    else {
      res.json({result: 'User not found'});
    }
  });
});

router.post('/loadDilemmas', (req, res) => {
  const dilemmaIds = [];
  const votesArray = [];
  
  User.findOne({
    '_id': req.cookies['id']
  }, (err, user) => {
    if(err) throw err;
    if(user) {
      Dilemma.find({}, (err, dilemmas) => {
        if(err) throw err;
        //use more loops than needed but as a result only return votes for loaded dilemmas and map them to co-relate with dilemmas index wise( better scalability and faster response overall)
        dilemmas.forEach((dilemma) => {
          dilemmaIds.push(dilemma._id);//array with ids of each dilemma
        });
        Vote.find({
          'userId': req.cookies['id'],
          'dilemmaId': {$in: dilemmaIds} //get all the votes on loaded dilemmas for the user
        }, (err,votes) => {
          if(err) throw err;
          dilemmas.forEach((dilemma, index) => { //map votes so that each index of vote in array is the vote of the dilemma with same index in dilemmas array
            votes.forEach((vote) => {
              if(vote.dilemmaId.toString() === dilemma._id.toString()){
                votesArray.push(vote);
              }
            });
              if(!votesArray[index]){
                votesArray.push({"voteIndex": -1});
              }
          });
          votes = votesArray;
          res.send({dilemmas, votes});
        })
      });
    }
    else{
      res.json({result: 'User not found'});
    }
  })
});

router.post('/newVote', (req, res) => {
  const dilemmaId = req.body.dilemmaId;
  const answerIndex = req.body.answerIndex;

  Dilemma.findOne({
    '_id': dilemmaId}, (err, dilemma) => {
    if(err) throw err;
    if(dilemma) {
      Vote.findOne({
        'userId': req.cookies['id'],
        'dilemmaId': dilemma._id
      }, (err, vote) => {
        if(err) throw err;
        if(!vote) {
          dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
            return index === answerIndex ? ++answerVote : answerVote;
          });
          dilemma.save();
          const newVoteModel = new Vote({
            'userId': req.cookies['id'],
            'dilemmaId': dilemma._id,
            'voteIndex': answerIndex
          });
          
          newVoteModel.save((err, vote) => {
            if(err) throw err;
            res.send({dilemma, vote});
          });
        }
        else{
          res.json({result: 'error: Vote already exists'});
        }
      });
    }
    else {
      res.json({result: 'error: Dilemma not found'});
    }
  });
});

router.post('/changeVote', (req, res) => {
  const dilemmaId = req.body.dilemmaId;
  const oldAnswerIndex = req.body.oldAnswerIndex;
  const newAnswerIndex = req.body.newAnswerIndex;

  Dilemma.findOne({
    '_id': dilemmaId}, (err, dilemma) => {
    if(err) throw err;
    if(dilemma) {
      Vote.findOne({
        'userId': req.cookies['id'],
        'dilemmaId': dilemma._id,
        'voteIndex': oldAnswerIndex
      }, (err, vote) => {
        if(err) throw err;
        if(vote){
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
          console.log('test aaaa');
        }
      })
    }
    else{
      res.json({result: 'error: Dilemma not found'});
    }
  });
});

router.post('/removeVote', (req, res) => {
  const dilemmaId = req.body.dilemmaId;
  const answerIndex = req.body.answerIndex;

  Dilemma.findOne({
    '_id': dilemmaId}, (err, dilemma) => {
    if(err) throw err;
    if(dilemma) {
      Vote.findOne({
        'userId': req.cookies['id'],
        'dilemmaId': dilemma._id,
        'voteIndex': answerIndex
      }, (err, vote) => {
        if(err) throw err;
        if(vote) {
          vote.remove();
          dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
            return index === answerIndex ? --answerVote: answerVote;
          });
          dilemma.save();
          res.send({dilemma});
        }
      })
    }
    else {
      res.json({result: 'error: Dilemma not found'});
    }
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('id');
  res.json({result: 'Success'});
});

module.exports = router;
