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
  if(token) {
    //verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
      if(err) {
        res.clearCookie('token');//remove the token
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

router.get(['/', '/home', '/hot', '/newest', '/mine', '/search'], (req, res) => {
  res.render('index', { name: 'Indecisive' });
});

router.post('/settings/changeEmail', (req, res) => {
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
            res.json({result: 'Something unexpected happened'});
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
    {safe: true, upsert: false}, (err, user) => {
      if(err) {
        throw err;
      }
      if(user) {
        res.json({result: 'Success'});
      }
      else {
        res.json({result: 'Something unexpected happened'});
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

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('id');
  res.json({result: 'Success'});
});

module.exports = router;
