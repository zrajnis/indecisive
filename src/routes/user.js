const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
    return res.redirect('http://localhost:3000/error');
  }
});

router.get('/', (req, res) => {
  res.render('index', { name: 'Indecisive' });
});

router.post('/settings', (req, res) => {
  const data = req.body.value;
  const inputType = req.body.type;
  switch(inputType) {
    case 'text':
      User.findOne({
        lowercaseUsername: data.toLowerCase()
      }, (err, user) => {
        if(err) throw err;
        if(user) {
          console.log('username is already taken');
          res.json({result: 'Username is not available'});
        }
        else {
          User.findOneAndUpdate({
              '_id':req.cookies['id']
            },{$set: {'username': data, 'lowercaseUsername': data.toLowerCase()}},
            {safe: true, upsert: false}, (err) => {
              if(err) throw err;
              res.json({result: 'Success'});
            });
        }
      });
      break;
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
    res.json({message: 'success'});
  })
});

module.exports = router;
