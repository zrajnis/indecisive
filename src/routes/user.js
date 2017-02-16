const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//middleware to verify the token
router.use((req, res, next) => {
  console.log('middleware active');
  //check header or url parameters or post parameters for token
  const token=req.cookies['token'];
  console.log('x-access-token read is '+token);
  //decode token
  if(token){
    //verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) =>{
      if(err){
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

module.exports = router;
