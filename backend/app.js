var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("./auth/local");

var indexRouter = require('./routes/index');

const users = require('./routes/users.js')
const landlords = require('./routes/landlord.js')
const tenants = require('./routes/tenants.js')
const tickets = require('./routes/tickets.js')
const apartments = require('./routes/apartments.js')
const threads = require('./routes/threads.js')
const messages = require('./routes/messages.js')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('never gonna give you up'));

app.use(
  session({
    secret: "never gonna give u up",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './client/build')));


app.use('/', indexRouter);

app.use('/users', users);
app.use('/landlords', landlords);
app.use('/tenants', tenants);
app.use('/tickets', tickets);
app.use('/apartments', apartments);
app.use('/threads', threads);
app.use('/messages', messages);

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
