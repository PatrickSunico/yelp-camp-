
//NPM package modules
//============================================================
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  flash = require('connect-flash'),
  methodOverride = require('method-override'),
  session = require('express-session');
//============================================================


  //models
//============================================================
  var Campground = require('./models/campground'),
  Comment = require('./models/comments'),
  User = require('./models/users'),
  seedDB = require('./seeds');
  //seed DB
  // seedDB(); // exported from seeds.js
//============================================================

//exported Routes
//============================================================
  var campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes = require('./routes/comments'),
      indexRoutes = require('./routes/index');
//============================================================


//Add mongoose and connect our DB
mongoose.connect('mongodb://localhost/yelp_camp');



//Express Settings
//============================================================
//Parses data input inside the body
app.use(bodyParser.urlencoded({
  extended: true
}));
//serve contents of the home page
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
//============================================================


//Passport Configuration
//============================================================
app.use(session({
  secret: 'whats poppin cuh',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Without Passport local mongoose we will have define our own methods to authenticate a user so these code below are ready to use methods that comes inside of the box while using passport local mongoose
passport.use(new LocalStrategy(User.authenticate())); //we are creating a new LocalStrategy using the User.authenticate method that is
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//============================================================


//Middleware Settings
//============================================================
//if user is logged in change navbar and display 2 buttons else if no logged in
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});
//============================================================


//Use imports from routes folder
//============================================================
//with this we don't need to append /campgrounds into following paths i.e /campgrounds/new or /campgrounds/:id

app.use('/',indexRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds',campgroundRoutes);

//============================================================


// File Paths
//============================================================

//============================================================

app.listen(3000, function() {
  console.log('Server Listening');
});
