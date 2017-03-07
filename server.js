const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./src/routes/index');
const indexRoutes = require('./src/routes/index');
const userRoutes = require('./src/routes/user');
const voteRoutes = require('./src/routes/vote');
const dilemmaRoutes = require('./src/routes/dilemma');
const errorHandler = require('./src/routes/errorHandler');
const config = require('./config.js');

app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + '/src/views');
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
app.use('/vote', voteRoutes);
app.use('/user', userRoutes);
app.use('/dilemma', dilemmaRoutes);

app.use(express.static(path.join(__dirname, '/src/static')));
app.use('/', errorHandler);

http.listen(app.get('port'),function() {
  console.log('listening on ' + app.get('port'));
});

module.exports = app;
