const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const React = require('react');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('./config.js');
let User = require('./models/User');
let Dilemma = require('./models/Dilemma');

app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static(path.join(__dirname, 'static')));

const options={ server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },replset: { socketOptions:
{ keepAlive: 300000, connectTimeoutMS : 30000 } } };
mongoose.connect(config.database,options); // connect to database

app.set('superSecret', config.secret); // secret variable

app.get('/', require('./routes').index);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(app.get('port'),function() {
  console.log('listening on ' + app.get('port'));
});

module.exports = app;