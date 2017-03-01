const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const voteRoutes = require('./routes/vote');
const dilemmaRoutes = require('./routes/dilemma');
const config = require('./config.js');

app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

const options={ server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },replset: { socketOptions:
{ keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.connect(config.database,options); // connect to database

app.set('superSecret', config.secret); // secret variable

//use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

//set routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/user/vote', voteRoutes);
app.use('/dilemma', dilemmaRoutes);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/user/test', (req, res) => {
  res.render('index', { name: 'Indecisive' });
});

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