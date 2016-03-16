var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/cat_app');

//Cat Schema Basic Pattern
//Which says Every cat has a name, age, and a temperament
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// Name of the Schema

//builds of from the schema pattern and creates a
//object model from the schema patten
//which now we can use certain methods/actions that can interact with out database
//such as Cat.find(), Cat.create()
var Cat = mongoose.model("Cat", catSchema);

//inside the DB we can see Cat as
//  Cat {
//    name: String,
//    age: Number,
//    temperament : String
//  };
//

//adding a new cat to the DB
//Create a new cat from the Cat object constructor
//add some property values to them.
//george is just the name of the variable on the javascript side of things
// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil"
// });

// //Then we save our newly created object with it's property values with
// //george.save() and then we want to give a call back function ->
// //if the cat was saved in the db or there was an error
// george.save(function(err,cat){
//   if(err){
//     console.log("Something Went Wrong")
//   } else {
//     console.log("We just save a cat to the DB");
//     console.log(george);
//   }
// });

//retrieve all cats from the DB and console.log each one
//We are running Cat.find and we're passing in a empty object {} which particularly says we are not looking for a specific type of //cat, Simply we just want this call back function to display all of the cats that are stored in the DB
Cat.find({}, function(err,cats){ // err and cats we can call the function parameters anything we want.
  if(err) {
    console.log("Error");
    console.log(err);
  } else {
    console.log("All The Cats");
    console.log(cats);
  }
});

//Create and Save Cat in one
Cat.create({
  name: "Snow White",
  age: 15,
  temperament: "Bland"
},function(err,cat){
  if(err) {
    console.log(err);
  } else {
    console.log(cat);
  }
});
