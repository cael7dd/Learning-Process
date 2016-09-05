var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var orm=require("orm");
var routes = require('./routes/index');
var users = require('./routes/users');
const session=require("express-session");
const mongodbStore=require("connect-mongodb-session")(session);
var app = express();
var store=new mongodbStore({
    uri:"mongodb://localhost:27017/userSystem",
    collection:"userSession"
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    secret:"112334",
    resave:false,
    saveUninitialized:false,
    store:store
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(orm.express("mysql://root:@localhost/usersystem",{
    define:function (db,models,next) {
        models.user=db.define("user",{
            id:Number,
            logName:String,
            niceName:String,
            password:String,
            level:Number,
            info:String
        });
        next();
    }
}));

app.use('/', routes);
app.use('/users', users);
app.use("/personal",require("./routes/personalInfo"));
app.use("/resign",require("./routes/resign"));
app.use("/login",require("./routes/logIn"));
app.use("/api",require("./routes/api"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
