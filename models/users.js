var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new mongoose.Schema({
  username: String,
  password: String
});


userSchema.plugin(passportLocalMongoose); //Adds in some predefined methods from passport-local-mongoose to our user

var User = mongoose.model('User', userSchema);


module.exports = User;
