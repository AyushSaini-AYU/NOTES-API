var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();



  /////yaha se shuru///////

app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

app.use( ( req, res, next ) => {

  console.log( " HTTP Method - " + req.method + " , URL - " + req.url );
  next();

} )

const userRouter = require('./routes/userRoutes');
app.use('/users', userRouter);

const notesRouter = require('./routes/notesRoutes');
app.use('/notes', notesRouter);

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
.then( ()=> {

  console.log("MongoDB connected");

})
.catch( (error)=>{

  console.log(error);

} )

  /////yaha pe khatam///////


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
