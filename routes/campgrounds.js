var express = require('express');
var router = express.Router(); // A router object is an isolated instance of middleware and routes, capable only of performing middleware and routing functions, routing methods such as get,post,delete and so on.

//DB Model imports
var Campground = require('../models/campground');

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

//INDEX ROUTE - show all campgrounds
//==========================================
router.get('/', function(req, res) {

  var user = req.user;
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render(paths.index, {
        campgrounds: allCampgrounds
      });
    }
  });
});
//==========================================


//NEW Route
//==========================================
//NEW - SHOW form to create new campground
//separate page or route to show the form to post a new campground
// this form will be able to make a new campground post
//This sends a postrequest to /campgrounds
router.get('/new', function(req, res) {
  res.render(paths.new);
});
//==========================================

//CREATE ROUTE Add new campgrounds to DB
//Post Request
//==========================================
router.post('/', function(req, res) {
  //Get campground form inputs using body parser
  //select the form and retrieve it's data from user input
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;

  //campName and image property values schema in DB
  //name and image values inputted by the user
  var newCampground = {
      name: name,
      image: image,
      description: description
    }; // store values from input into our DB

  //Create a new Campground then save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) { //if err console.log error
      console.log(err);
    } else {
      res.redirect('/campgrounds'); // else redirect back to campgrounds page
    }
  });
});
//==========================================


//SHOW
//shows more info about one campground
//==========================================
router.get('/:id', function(req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
        //render show template with that campground
      res.render(paths.show, {
        campground: foundCampground
      });
    }
  });
});
//===========================================


module.exports = router;
