var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),

    //models
    Campground = require('./models/campground'),
    Comment = require('./models/comments'),
    seedDB = require('./seeds');

    seedDB(); // exported from seeds.js

//Add mongoose and connect our DB
mongoose.connect("mongodb://localhost/yelp_camp");

//Parses data input inside the body
app.use(bodyParser.urlencoded({extended:true}));
//serve contents of the home page
app.use(express.static(__dirname + "/public"));
//set the view engine to find ejs files
app.set("view engine", "ejs");

var paths = {
  landing: 'pages/landing',
  index: 'pages/index',
  new: 'pages/formcampground',
  show: 'pages/show',
  comments: 'comments/comments'
};

//Set the home page or landing page
//==========================================
app.get("/", function(req,res){

  //render home page template
  res.render(paths.landing);
  // res.send("Welcome to Home");
});
//==========================================


//INDEX ROUTE - show all campgrounds
//==========================================
app.get("/campgrounds", function(req,res){

  //Get all campgrounds from DB

  Campground.find({}, function(err,allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render(paths.index, {campgrounds: allCampgrounds})
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
app.get("/campgrounds/new", function(req,res){
  res.render("pages/formcampground");
});
//==========================================

//CREATE ROUTE Add new campgrounds to DB
//Post Request
//==========================================
app.post("/campgrounds" ,function(req, res){
  //Get campground form inputs using body parser
  //select the form and retrieve it's data from user input
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;

  //campName and image property values schema in DB
  //name and image values inputted by the user
  var newCampground = {name:name, image:image, description:description} // store values from input into our DB

  //Create a new Campground then save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err) { //if err console.log error
      console.log(err);
    }else {
      res.redirect("/campgrounds"); // else redirect back to campgrounds page
    }
  });
});
//==========================================


//SHOW
//shows more info about one campground
//==========================================
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render(paths.show, {campground: foundCampground});
        }
    });
});
//==========================================



//Comments Route
//New Route
//==========================================

app.get('/campgrounds/:id/comments/new', function(req, res) {

  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render(paths.comments, {campground: campground})
    }
  });
});

//==========================================


//Create Route
app.post('/campgrounds/:id/comments', function(req, res) {
  // var text = req.comments.params.id;

  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }

  });
});



app.listen(3000, function(){
  console.log("Server Listening");
});
