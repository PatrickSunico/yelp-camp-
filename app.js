var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");

//Add mongoose and connect our DB
mongoose.connect("mongodb://localhost/yelp_camp");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
  campName: String,
  image: String,
  campDescription: String
});

//Create Campground model so we can use some mongoose methods
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     campName: "Granite Hill",
//     image: "http://i.telegraph.co.uk/multimedia/archive/01940/jollydays_1940549b.jpg",
//     description: "This is a huge granite hill, No water"
//   },function(err, campground){
//     if(err) {
//       console.log(err);
//     } else {
//       console.log(campground);
//     }
//   });

//Parses data input inside the body
app.use(bodyParser.urlencoded({extended:true}));
//serve contents of the home page
app.use(express.static("public"));
//set the view engine to find ejs files
app.set("view engine", "ejs");

//Set the home page or landing page
app.get("/", function(req,res){

  //render home page template
  res.render("pages/landing");
  // res.send("Welcome to Home");
});

//INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req,res){

  //Get all campgrounds from DB

  Campground.find({}, function(err,allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("pages/index", {campgrounds: allCampgrounds})
    }
  });
});

//CREATE ROUTE Add new campgrounds to DB
//same route but as a post request
app.post("/campgrounds" ,function(req, res){
  //Get campground form inputs using body parser
  //select the form and retrieve it's data from user input
  var name = req.body.campName;
  var image = req.body.image;
  var description = req.body.campDescription;

  //campName and image property values schema in DB
  //name and image values inputted by the user
  var newCampground = {campName:name, image:image, campDescription:description} // store values from input into our DB

  //Create a new Campground then save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err) { //if err console.log error
      console.log(err);
    }else {
      res.redirect("/campgrounds"); // else redirect back to campgrounds page
    }
  });
});

//NEW - SHOW form to create new campground
//separate page or route to show the form to post a new campground
// this form will be able to make a new campground post
//This sends a postrequest to /campgrounds
app.get("/campgrounds/new", function(req,res){
  res.render("pages/formcampground");
});

//SHOW
//shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
  //find campground with database object ID
  //i.e <a href="/campgrounds/<%= index._id %>" class="btn btn-primary">More Info</a>
  Campground.findById(req.params.id, function(err, foundCampground){ //get parameter id from campgrounds inside More info Button which links to index.id
    if(err){
      console.log(err);
    } else {
      //back from the DB pass in our foundCampground through our ejs file via this campgrounds property value.
      res.render("pages/show", {campgrounds: foundCampground});
    }
  });
});

app.listen(3000, function(){
  console.log("Server Listening");
});
