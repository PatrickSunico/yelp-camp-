var mongoose = require('mongoose'),
    Campground = require('./models/campground');
    Comment = require('./models/comments');

//predefined data
var data = [{
    campName: 'Clouds Rest',
    image: 'https://farm1.staticflickr.com/110/316612922_38fb0698f5.jpg',
    campDescription: 'blah blah blah'
}, {
    campName: 'Megaton Valley',
    image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg',
    campDescription: 'blah blah blah'
}, {
    campName: 'Goodsprings',
    image: 'http://i.telegraph.co.uk/multimedia/archive/01940/jollydays_1940549b.jpg',
    campDescription: 'blah blah blah'
}];

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 

         //add a few campgrounds
         //Loop through our predefined data the give it an argument named seed
        //seed is just the name of the argument that is going to be passed inside the forEach
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create( //associate a comment from the looped predefined data
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){ //err handling callbacks
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment); //push each campground and associate it with a comment
                                campground.save(); //save it through the DB
                                console.log("Created new comment");
                            }
                        });
                    //End else block
                }
            });
            //End forEach block
        });
        //end Campground remove block
    });

    //End seed Block
}

module.exports = seedDB;
