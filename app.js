var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var company = require('./routes/company_routes');
var location = require('./routes/location_routes');
var organization = require('./routes/organization_routes');
var launch_pad = require('./routes/launch_pad_routes');
var vehicle_model = require('./routes/vehicle_model_routes');
var vehicle = require('./routes/vehicle_routes');
var launch_attempt = require('./routes/launch_attempt_routes');
var payload = require('./routes/payload_routes');
var about = require('./routes/about_routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/company', company);
app.use('/location', location);
app.use('/organization', organization);
app.use('/launch_pad',launch_pad);
app.use('/vehicle_model', vehicle_model);
app.use('/vehicle', vehicle);
app.use('/launch_attempt', launch_attempt);
app.use('/payload', payload);
app.use('/about', about);
app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

module.exports = app;
