var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: String,
    author: { //Adding in author as an object with two properties id and username, inside of id we want to add in the type of the username and it's schema reference which is located in the user data model.
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //reference to the user model
      },
      username: String // username data type
    }
});

module.exports = mongoose.model('Comment', commentSchema);
