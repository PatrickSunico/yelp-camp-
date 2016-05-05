// Here we declare predefined data to be seeded in our website for testing purposes
// We also need to require mongoose and our Campground and Comment Data models so our seedDB function can call a reference or 'reference' their schema defined in our models folder.
var mongoose = require('mongoose'),
    Campground = require('./models/campground');
    Comment = require('./models/comments');

//predefined data
var data = [{
    name: 'Clouds Rest',
    image: 'https://farm1.staticflickr.com/110/316612922_38fb0698f5.jpg',
    description: 'Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Etiam ut purus mattis mauris sodales aliquam. Curabitur suscipit suscipit tellus. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia.Maecenas vestibulum mollis diam. Vivamus consectetuer hendrerit lacus. Sed fringilla mauris sit amet nibh. Curabitur at lacus ac veli ornare lobortis. Sed cursus turpis vitae tortor. Nunc nonummy metus. Suspendisse eu ligula. Pellentesque commodo eros a enim. Vestibulum eu odio. Nam pretium turpis et arcu.Fusce pharetra convallis urna. Aenean commodo ligula eget dolor. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Fusce fermentum. Proin magna.In ut quam vitae odio lacinia tincidunt. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Sed libero. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus.'
}, {
    name: 'Megaton Valley',
    image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg',
    description: 'Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Etiam ut purus mattis mauris sodales aliquam. Curabitur suscipit suscipit tellus. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia.Maecenas vestibulum mollis diam. Vivamus consectetuer hendrerit lacus. Sed fringilla mauris sit amet nibh. Curabitur at lacus ac veli ornare lobortis. Sed cursus turpis vitae tortor. Nunc nonummy metus. Suspendisse eu ligula. Pellentesque commodo eros a enim. Vestibulum eu odio. Nam pretium turpis et arcu.Fusce pharetra convallis urna. Aenean commodo ligula eget dolor. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Fusce fermentum. Proin magna.In ut quam vitae odio lacinia tincidunt. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Sed libero. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus.'
}, {
    name: 'Goodsprings',
    image: 'http://i.telegraph.co.uk/multimedia/archive/01940/jollydays_1940549b.jpg',
    description: 'Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Etiam ut purus mattis mauris sodales aliquam. Curabitur suscipit suscipit tellus. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia.Maecenas vestibulum mollis diam. Vivamus consectetuer hendrerit lacus. Sed fringilla mauris sit amet nibh. Curabitur at lacus ac veli ornare lobortis. Sed cursus turpis vitae tortor. Nunc nonummy metus. Suspendisse eu ligula. Pellentesque commodo eros a enim. Vestibulum eu odio. Nam pretium turpis et arcu.Fusce pharetra convallis urna. Aenean commodo ligula eget dolor. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Fusce fermentum. Proin magna.In ut quam vitae odio lacinia tincidunt. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Sed libero. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus.'
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
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a campground");
        //             //create a comment
        //             Comment.create( //associate a comment from the looped predefined data
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, function(err, comment){ //err handling callbacks
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment); //push each campground and associate it with a comment
        //                         campground.save(); //save it through the DB
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //             //End else block
        //         }
        //     });
        //     //End forEach block
        // });
        //end Campground remove block
    });

    //End seed Block
}

module.exports = seedDB; // export function to main app.js
