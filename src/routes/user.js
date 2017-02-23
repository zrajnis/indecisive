const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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

router.post('/settings', (req, res) => {
  const data = req.body.value;
  const inputType = req.body.type;
  switch(inputType) {
    case 'email':
      User.findOne({
        email: data.toLowerCase()
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
  const timestamp = new Date().toLocaleString('en-GB');
  let answerVotes = newDilemma.answers.slice(); //copy array by val
  answerVotes.forEach((answer, index) => { //change all values to 0
    answerVotes[index] = 0;
  });
  console.log(answerVotes);

  User.findOne({
    _id: req.cookies['id']
  }, (err, user) => {
    if (err) throw err;
    if (user) {
      const newDilemmaModel = new Dilemma({
        title: newDilemma.title,
        description: newDilemma.description,
        answers: newDilemma.answers,
        answerVotes: answerVotes,
        votersId: [],
        timestamp: timestamp,
        author: user.username
      });

      newDilemmaModel.save((err) => {
        if (err) throw err;
      });
      console.log('Dilemma created successfully');
      res.json({result: 'Dilemma created'});
    }
    else {
      res.json({result: 'User not found'});
    }
  });
});

router.post('/loadDilemmas', (req, res) => {
  User.findOne({
    _id: req.cookies['id']
  }, (err, user) => {
    if(err) throw err;
    if(user) {
      Dilemma.find({}, (err, dilemmas) => {
        if(err) throw err;
        res.send(dilemmas);
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
    _id: dilemmaId}, (err, dilemma) => {
    if(err) throw err;
    if(dilemma){
      dilemma.votersId.push(req.cookies['id']);
      dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
        return index === answerIndex ? ++answerVote: answerVote;
      });
      dilemma.save();
      res.send(dilemma);
    }
    else{
      res.json({result: 'error: Dilemma not found'});
    }
  });
});

router.post('/changeVote', (req, res) => {
  console.log('change vote');
  const dilemmaId = req.body.dilemmaId;
  const oldAnswerIndex = req.body.oldAnswerIndex;
  const newAnswerIndex = req.body.newAnswerIndex;
  console.log(dilemmaId);
  Dilemma.findOne({
    _id: dilemmaId}, (err, dilemma) => {
    if(err) throw err;
    if(dilemma){
      dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
        if(index === oldAnswerIndex){
          answerVote--;
        }
        else if(index === newAnswerIndex){
          answerVote++;
        }
        return answerVote;
      });
      dilemma.save();
      res.send(dilemma);
    }
    else{
      res.json({result: 'error: Dilemma not found'});
    }
  });
});

router.post('/removeVote', (req, res) => {
  const dilemmaId = req.body.dilemmaId;
  const answerIndex = req.body.answerIndex;
  console.log(dilemmaId);
  Dilemma.findOne({
    _id: dilemmaId}, (err, dilemma) => {
    if(err) throw err;
    if(dilemma){
      dilemma.votersId.splice(dilemma.votersId.indexOf(req.cookies['id']),1);
      dilemma.answerVotes = dilemma.answerVotes.map((answerVote, index) => {
        return index === answerIndex ? --answerVote: answerVote;
      });
      dilemma.save();
      res.send(dilemma);
    }
    else{
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
