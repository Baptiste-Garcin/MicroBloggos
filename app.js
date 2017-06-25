/**
* @Author: Ernest
* @Date:   11-Jan-2017
* @Project: MEAN_rush
* @Filename: app.js
* @Last modified by:   Ernest
* @Last modified time: 15-Jan-2017
* @License: MIT
*/


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var db = require('./app_server/models/db.js');


var session = require('express-session');

var routing = require('./app_server/routes/routing');

require('./app_server/config/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));


app.use('/', routing);
app.get("*", function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

db.connect();



app.use(passport.initialize());
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"success": false, "message" : err.name + ": " + err.message});
  }
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

module.exports = app;
