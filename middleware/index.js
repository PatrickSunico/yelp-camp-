var Campground = require('../models/campground'),
    Comment = require('../models/comments');

//Middleware
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    //Campground Ownership Authorization
    //===========================================
    //is userLoggedIn if so run the code below and find the Campground by it's object ID
    //else if userNotLoggedIn send an error message.
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect('back');
            } else {
                //does user own the campground if yes render the page
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else { //else if user does not own the campground send a error message
                    res.redirect('back');
                }
            }
        });
    } else { //userNotLoggedIn error message
        res.redirect('back');
    }

    //===========================================
};

middlewareObj.checkCommentOwnership = function(req, res, next) {

    //Campground Comment Ownership Authorization
    //===========================================
    //is userLoggedIn if so run the code below and find the Campground by it's object ID
    //else if userNotLoggedIn send an error message.
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentID, function(err, foundComment) {
            if (err) {
                res.redirect('back');
            } else {
                //does user own the comment if yes render the page
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else { //else if user does not own the campground send a error message
                    res.redirect('back');
                }
            }
        });
    } else { //userNotLoggedIn error message
        res.redirect('back');
    }
    //==========================================

};

middlewareObj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()) { // then move on the the specific page
      return next();
    }
    res.redirect('/login');
};

module.exports = middlewareObj;
