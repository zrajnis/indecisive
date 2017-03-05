const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Dilemma = require('../models/Dilemma');

router.post('/logout', (req, res) => {// its before middleware for sole reason of displaying logout failed error(middleware wouldnt let it go through)
  if(req.cookies['id'] && req.cookies['token']) {
    res.clearCookie('token');
    res.clearCookie('id');
    res.json({result: 'Success'});
  }
  else {
    res.json({result: 'Logout failed'});
  }
});

//middleware to verify the token
router.use((req, res, next) => {
  //check header or url parameters or post parameters for token
  const token = req.cookies['token'];
  //decode token
  if(token) {
    //verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
      if(err) {
        res.clearCookie('token');//remove the token
        res.clearCookie('id');//remove users id
        return res.json({success: false, message: 'Failed to authenticate token.'});
      }
      else {
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

router.post('/settings/email', (req, res) => {
  const data = req.body.value;

  User.findOne({
    'email': data.toLowerCase()
  }, (err, user) => {
    if(err) {
      throw err;
    }
    if(user) {
      res.json({result: 'Email is already in use'});
    }
    else {
      User.findOneAndUpdate({
        '_id':req.cookies['id']
      },{$set: {'email': data.toLowerCase()}},
        {safe: true, upsert: false}, (err, user) => {
          if(err) {
            throw err;
          }
          if(user) {
            res.json({result: 'Success'});
          }
          else {
            res.json({result: 'User not found'});
          }
        });
    }
  });
});

router.post('/settings/password', (req, res) => {
  const data = req.body.value;

  User.findOneAndUpdate({
    '_id':req.cookies['id']
  },{$set: {'password': data}},
    {safe: true, upsert: false}, (err, user) => {
      if(err) {
        throw err;
      }
      if(user) {
        res.json({result: 'Success'});
      }
      else {
        res.json({result: 'User not found'});
      }
    });
});

router.delete('/settings', (req, res) => {
  User.findOneAndRemove({
    '_id': req.cookies['id']
  }, (err, user) => {
    if(err) {
      throw err;
    }
    if(user) {
      res.clearCookie('token');
      res.clearCookie('id');
      res.json({result: 'Success'});
    }
    else {
      res.json({result: 'User not found'});
    }
  });
});

router.use((req, res, next) => { //in case token exists but id cookie doesnt
  const id = req.cookies['id'];
  if(!id) {
    res.clearCookie('token');//remove the token
    res.clearCookie('id');//remove users id
    return res.redirect('http://localhost:3000');
  }
  else {
    next();
  }
});

router.get(['/', '/home', '/hot', '/newest', '/mine', '/search'], (req, res) => {
  res.render('index', { name: 'Indecisive' });
});

module.exports = router;
