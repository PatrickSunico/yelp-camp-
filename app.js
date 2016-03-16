var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
  {campName: "Pine View", image: "https://farm3.staticflickr.com/2818/10131087334_1e32741e70.jpg"},
  {campName: "Bunker Hill", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
  {campName: "Megaton Valley", image: "https://farm6.staticflickr.com/5319/7407436246_0ac54dd559.jpg"},
  {campName: "Pine View", image: "https://farm3.staticflickr.com/2818/10131087334_1e32741e70.jpg"},
  {campName: "Bunker Hill", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
  {campName: "Megaton Valley", image: "https://farm6.staticflickr.com/5319/7407436246_0ac54dd559.jpg"}
];

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

app.get("/campgrounds", function(req,res){
  //campgrounds array


  res.render("pages/campgrounds", {campgrounds: campgrounds});
});

//same route but as a post request
//rest Convention

app.post("/campgrounds" ,function(req, res){
  //Push the user post data in our object array/database
  // get data from form and add to campgrounds array
  var name = req.body.campName;
  var image = req.body.image;
  //redirect back to campgrounds page
  var newCampground = {campName:name, image:image}
  campgrounds.push(newCampground)
  res.redirect("/campgrounds");
});

//separate page or route to show the form to post a new campground
// this form will be able to make a new campground post
//This sends a postrequest to /campgrounds
app.get("/campgrounds/new", function(req,res){

  res.render("pages/formcampground");
});

app.listen(3000, function(){
  console.log("Server Listening");
});
