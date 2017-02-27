const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Dilemma = require('../models/Dilemma');

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

router.post('/settings/changeEmail', (req, res) => {
  const data = req.body.value;

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
        {safe: true, upsert: false}, (err, user) => {
          if(err) throw err;
          if(user) {
            res.json({result: 'Success'});
          }
          else {
            res.json({result: 'Something unexpected happened'})
          }

        });
    }
  });
});

router.post('/settings/changePassword', (req, res) => {
  const data = req.body.value;

  User.findOneAndUpdate({
      '_id':req.cookies['id']
    },{$set: {'password': data}},
    {safe: true, upsert: false}, (err, user) =>{
      if(err) throw err;
      if(user) {
        res.json({result: 'Success'});
      }
      else {
        res.json({result: 'Something unexpected happened'})
      }
    });
});

router.delete('/settings', (req, res) => {
  User.findOneAndRemove({
    '_id': req.cookies['id']
  }, (err, user) => {
    if(err) throw err;
    if(user) {
      console.log('user found and deleted');
      res.clearCookie('token');
      res.clearCookie('id');
      res.json({result: 'Success'});
    }
    else {
      res.json({result: 'User not found'})
    }

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
              if(vote.dilemmaId.toString() === dilemma._id.toString()) {
                votesArray.push(vote);
              }
            });
              if(!votesArray[index]) {
                votesArray.push({"voteIndex": -1});
              }
          });
          res.send({dilemmas, votes: votesArray});
        })
      });
    }
    else{
      res.json({result: 'User not found'});
    }
  })
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('id');
  res.json({result: 'Success'});
});

module.exports = router;
