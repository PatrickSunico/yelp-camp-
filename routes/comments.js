//Express Router
var express = require('express');
var router = express.Router({mergeParams:true});

//DB Model imports
var Campground = require('../models/campground'),
    Comment = require('../models/comments');

//middleware imports
var middleware = require('../middleware');

var paths = {
  landing: 'pages/landing',
  index: 'pages/index',
  new: 'pages/formcampground',
  show: 'pages/show',
  //comments
  showcomments: 'comments/showcomments',
  editComment: 'comments/editcomment'
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

router.get('/new',middleware.isLoggedIn, function(req, res) {

  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render(paths.showcomments, {
        campground: campground
      });
    }
  });
});

//==========================================


//Create Route
//==========================================
//Chaining NEW and Create
router.post('/', middleware.isLoggedIn, function(req, res) {
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
          req.flash('success', 'Successfully added comment');
          res.redirect('/campgrounds/' + campground._id); //redirects back to the campground specific to it's id
        }
      });
    }
  });
});

//Show the comment edit route
//==========================================

router.get('/:commentID/edit', middleware.checkCommentOwnership, function(req,res){
  Comment.findById(req.params.commentID, function(err, foundComment){ //comment_id define inside of the the route
    if(err) {
      res.redirect('back');
    } else {
      res.render(paths.editComment,{commentID: req.params.id, comment: foundComment});
    }
  });
});

//==========================================


//Update Post Route
//==========================================
router.post('/:commentID',middleware.checkCommentOwnership,  function(req,res){
  Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, function(err, updatedComment){
    if(err) {
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id); //redirect back to the campground by it's ID
    }
  });
});
//==========================================

//Comment Delete Route
//==========================================
router.delete('/:commentID',middleware.checkCommentOwnership, function(req,res){
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.commentID, function(err){
    if(err){
      res.redirect('back');
    } else {
      req.flash('success', 'Comment Deleted');
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});
//==========================================

// //Campground Comment Ownership Authorization
// //===========================================
// function checkCommentOwnership(req,res,next) {
//   //is userLoggedIn if so run the code below and find the Campground by it's object ID
//   //else if userNotLoggedIn send an error message.
//   if (req.isAuthenticated()) {
//       Comment.findById(req.params.commentID, function(err, foundComment) {
//           if (err) {
//               res.redirect('back');
//           } else {
//               //does user own the comment if yes render the page
//               if (foundComment.author.id.equals(req.user._id)) {
//                   next();
//               } else { //else if user does not own the campground send a error message
//                 res.redirect('back');
//               }
//           }
//       });
//   } else { //userNotLoggedIn error message
//       res.redirect('back');
//   }
// }
// //==========================================



// //Authentication Middleware
// //==========================================
// function isLoggedIn(req, res,next) {
//   if(req.isAuthenticated()) { // then move on the the specific page
//     return next();
//   }
//   res.redirect('/login');
// }
// //==========================================

module.exports = router;
