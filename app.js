
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
//============================================================

//Testing Environment
//export our mongodb url first inside of our process.env.DATABASEURL
// export DATABASEURL=mongodb://localhost/3000
//Meaning our environment url now resides in this process.env.DATABASE URL

//Production Environment
// in Heroku we added a config variable with the name DATABASEURL and the database url from our mongolab account in there we can now both
// associate our testing environment and our production environment.
//Take note it is not ideal to share our mongolab database url when pushing it as a repo in github.

//Backup URL
var url = process.env.DATABASEURL || "mongodb://localhost/3000";

//Main mongodb connection for production and testing
mongoose.connect(url);
//============================================================

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

app.use(indexRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds',campgroundRoutes);

//============================================================

// process.env.databaseURL
//3000 local host export via process.env.DATABASEURL

var port = (process.env.PORT || 3000);

app.listen(port, function() {
  console.log('Server Listening');
});
