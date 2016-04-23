//Schema Setup

var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
  campName: String,
  image: String,
  campDescription: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]

});

//Create Campground model so we can use some mongoose methods
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
