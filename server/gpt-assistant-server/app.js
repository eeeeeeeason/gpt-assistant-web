var proxyer = require('https-proxy-agent');
console.log(proxyer);


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/assistant');
var  OpenAI = require('openai');
var app = express();

const http = require('http');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

dotenv.config({ path: './.env' , override: true});
console.log( process.env.OPENAI_API_KEY," process.env.OPENAI_API_KEY");

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
