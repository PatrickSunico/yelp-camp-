//Express Router
var express = require('express');
var router = express.Router({mergeParams:true});

//DB Model imports
var Campground = require('../models/campground'),
    Comment = require('../models/comments');

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


//Comments Route
//New Route
//==========================================

//When a user makes a get request to the page with a form
// it will run isLoggedIn function first and it will check if the user is Logged in or not ,
// if the user is loggedin it call next as we can see in the isLoggedIn function,
// which will move on the do the callback function to render the campground.

router.get('/new',isLoggedIn, function(req, res) {

  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render(paths.comments, {
        campground: campground
      });
    }
  });
});

//==========================================


//Create Route
//==========================================
//Chaining NEW and Create
router.post('/', function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id); //redirects back to the campground specific to it's id
        }
      });
    }
  });
});

//==========================================


function isLoggedIn(req, res,next) {
  if(req.isAuthenticated()) { // then move on the the specific page
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
