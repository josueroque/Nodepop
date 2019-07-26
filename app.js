var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Database conection 
 */
require('./lib/conMongoose');
require('./models/Anuncio');
require('./lib/install_db');

/**
 * Rutas de mi API
 */
// app.use('/apiv1/agentes', require('./routes/apiv1/agentes'));

app.locals.title = 'Nodepop';

app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
//app.use('/lib/install_db', require('./lib/install_db'));


/**
 * Web app routes
 */
app.use('/',        require('./routes/index'));
app.use('/users',   require('./routes/users'));


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
