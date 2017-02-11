const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const React = require('react');

const routes = require('./routes/index');
app.set('port', process.env.PORT || 3000);
//app.use('/',routes.index);
//app.engine('hbs',hbs({extname:'hbs', defaultLayout:'layout', layoutsDir:__dirname+ '/views/'}));
//app.set('views', path.join(__dirname, '/views'));
//app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static(path.join(__dirname, 'static')));

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