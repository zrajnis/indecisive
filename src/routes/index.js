const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get(['/', '/home', '/hot', '/newest'], (req, res) => {
  res.render('index', { name: 'Indecisive' });
});

router.post('/signup', (req,res) => {
  const newUser = req.body.newUser;

  User.findOne({
    'lowercaseUsername': newUser.username.toLowerCase()
  }, (err, user) => {
    if(err) {
      throw err;
    }
    if(user) {
      res.json({result: 'Username is not available'});
    }
    else { //if username is not taken check if email is already in use
      User.findOne({
        'email': newUser.email.toLowerCase()
      }, (err, user) => {
        if(err) {
          throw err;
        }
        if(user) {
          res.json({result: 'Email is already in use'});
        }
        else {
          const newUserModel = new User({
            username: newUser.username,
            lowercaseUsername: newUser.username.toLowerCase(),
            password: newUser.password,
            email: newUser.email.toLowerCase(),
            admin: false
          });
          
          newUserModel.save( (err) => {
            if(err) {
              throw err;
            }
          });
          res.json({result: 'Success'});
        }
      });
    }
  });
});

router.post('/login', (req,res) => {
  const userData = req.body.userData;

  User.findOne({
    'lowercaseUsername': userData.username.toLowerCase(),
    'password': userData.password
  }, (err, user) => {
    if(err) {
      throw err;
    }
    if(user) {
      const token = jwt.sign(user, req.app.get('superSecret'),{
        expiresIn : '24h' //expires in 24 hours
      });
      res.cookie('token', token, {expires: new Date(Date.now() + 86400000)});//86400000 miliseconds is 24 hours
      res.cookie('id', user._id, {expires: new Date(Date.now() + 86400000)});
      res.json({result: 'Success'});
    }
    else {
      res.json({result: 'Login failed'});
    }
  });
});

module.exports = router;
