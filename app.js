var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  session = require('express-session'),

  //models
  Campground = require('./models/campground'),
  Comment = require('./models/comments'),
  User = require('./models/users'),
  seedDB = require('./seeds');

seedDB(); // exported from seeds.js

//Add mongoose and connect our DB
mongoose.connect("mongodb://localhost/yelp_camp");

//Express Settings
//============================================================
//Parses data input inside the body
app.use(bodyParser.urlencoded({
  extended: true
}));
//serve contents of the home page
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//if user is logged in change navbar and display 2 buttons else if no logged in
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});

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


// File Paths
//============================================================

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

//============================================================



//Set the home page or landing page
//==========================================
app.get("/", function(req, res) {

  //render home page template
  res.render(paths.landing);
  // res.send("Welcome to Home");
});
//==========================================


//INDEX ROUTE - show all campgrounds
//==========================================
app.get("/campgrounds", function(req, res) {

  var user = req.user;
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render(paths.index, {
        campgrounds: allCampgrounds
      })
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
app.get("/campgrounds/new", function(req, res) {
  res.render("pages/formcampground");
});
//==========================================

//CREATE ROUTE Add new campgrounds to DB
//Post Request
//==========================================
app.post("/campgrounds", function(req, res) {
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
    } // store values from input into our DB

  //Create a new Campground then save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) { //if err console.log error
      console.log(err);
    } else {
      res.redirect("/campgrounds"); // else redirect back to campgrounds page
    }
  });
});
//==========================================


//SHOW
//shows more info about one campground
//==========================================
app.get("/campgrounds/:id", function(req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground)
        //render show template with that campground
      res.render(paths.show, {
        campground: foundCampground
      });
    }
  });
});
//==========================================



//Comments Route
//New Route
//==========================================

//When a user makes a get request to the page with a form
// it will run isLoggedIn function first and it will check if the user is Logged in or not ,
// if the user is loggedin it call next as we can see in the isLoggedIn function,
// which will move on the do the callback function to render the campground.


app.get('/campgrounds/:id/comments/new',isLoggedIn, function(req, res) {

  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render(paths.comments, {
        campground: campground
      })
    }
  });
});

//==========================================


//==========================================

//Create Route

//Chaining NEW and Create
app.post('/campgrounds/:id/comments', function(req, res) {
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


//User Authentication Routes

//==========================================
//show register form
app.get('/register', function(req, res) {
  res.render(auth.register);
});

//Handle Sign up Logic

app.post('/register', function(req, res) {

  //Make a new instance of the object User with username credentials via bodyparser as parameter arguments then store it to our variable newUser
  var newUser = new User({username: req.body.username});

  //Then do the actual register query by using the variable reference of newUser and the password credentials from bodyparser.
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render(auth.register); // if err redirect back
    }
    //do a passport local authenticate then redirect back to our campgrounds page
    passport.authenticate('local')(req, res, function() {
      res.redirect('/campgrounds');
    });
  });
});

//==========================================

//Login Logic Routes
//==========================================
app.get('/login', function(req, res) {
  res.render(auth.login);
});


//Middleware logic
//app.post('/login', middleware, function callback)
//When request comes in to /login we want passport to authenticate it's user credentials first,
// inside of the post block if user is successful redirect to the main /campgrounds page else loop back to login page until successful.

app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  function(req, res) {

  });
//==========================================


//Logout route

//==========================================
app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

//isLoggedOut middleware
function isLoggedIn(req, res,next) {
  if(req.isAuthenticated()) { // then move on the the specific page
    return next();
  }
  res.redirect('/login');
}

//==========================================



app.listen(3000, function() {
  console.log("Server Listening");
});
