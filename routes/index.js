//Express Router
var express = require('express');
var router = express.Router();

//MiddleWares
var passport = require('passport');

//DB Model imports
var User = require('../models/users');

//paths
var paths = {
  landing: 'pages/landing',
  index: 'pages/index',
  new: 'pages/formcampground',
  show: 'pages/show',
  comments: 'comments/comments'
};

var auth = {
  register: 'authentication/register',
  login: 'authentication/login'
};


//Set the home page or landing page
//==========================================
router.get('/', function(req, res) {

  //render home page template
  res.render(paths.landing);
  // res.send("Welcome to Home");
});
//==========================================

//User Authentication Routes
//==========================================
//show register form
router.get('/register', function(req, res) {
  res.render(auth.register);
});

//Handle Sign up Logic

router.post('/register', function(req, res) {

  //Make a new instance of the object User with username credentials via bodyparser as parameter arguments then store it to our variable newUser
  var newUser = new User({username: req.body.username});

  //Then do the actual register query by using the variable reference of newUser and the password credentials from bodyparser.
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      req.flash('error', err.message);
      return res.render(auth.register); // if err redirect back
    }
    //do a passport local authenticate then redirect back to our campgrounds page
    passport.authenticate('local')(req, res, function() {
      req.flash('success',"Welcome to YelpCamp" + " " + user.username);
      res.redirect('/campgrounds');
    });
  });
});

//==========================================

//Login Logic Routes
//==========================================
router.get('/login', function(req, res) {
  res.render(auth.login);
});


//Middleware logic
//app.post('/login', middleware, function callback)
//When request comes in to /login we want passport to authenticate it's user credentials first,
// inside of the post block if user is successful redirect to the main /campgrounds page else loop back to login page until successful.

router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  function(req, res) {

  });
//==========================================


//Logout route

//==========================================
router.get('/logout', function(req,res){
  req.logout();
  req.flash('success', 'Logged you out');
  res.redirect('/');
});

module.exports = router;
