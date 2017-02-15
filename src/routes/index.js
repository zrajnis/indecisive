const router = require('express').Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res.render('index', { name: 'Indecisive' });
});

router.post('/signup', (req,res) => {
  const newUser = req.body.newUser;
  console.log(newUser);
  User.findOne({
    lowercaseUsername: newUser.username.toLowerCase()
  }, (err, user) => {
    if (err)throw err;
    if (user){
      console.log('user exists');
      res.json({result: 'Username is not available'});
    }
    else { //if username is not taken check if email is already in use
      User.findOne({
        email: newUser.email.toLowerCase()
      }, (err, user) => {
        if (err) throw err;
        if (user){
          console.log('email is already in use');
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
            if (err) throw err;
          });
          console.log('User registered successfully');
          res.json({result: 'Success'});

        }
      })
    }
  });
});

module.exports = router;