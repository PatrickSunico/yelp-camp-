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
          //add username and id to comment then save the comment
          //since we are inside the comment.create block,
          //whenever a comment is created we use req.user.id and req.user.username
          //then just plugin them right in to comment.author, comment meaning the callback argument from our comment model, along with it's value method and id.
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;

          //save comment
          //then we save the comment persistently at first,
          comment.save();

          //then move on to push the comment to the campground schema
          campground.comments.push(comment);
          campground.save();

          console.log(comment);
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
