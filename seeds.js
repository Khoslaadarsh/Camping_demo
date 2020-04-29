var mongoose = require('mongoose');
var Campground = require('./models/campground');

var Comment  = require('./models/comment')
var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        discription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Dessert Messa",
        image: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        discription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Flora Fauna",
        image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
    },
]


var seedDB = ()=>{
// Remove All campgorunds
    Campground.deleteMany({}, (err)=>{
        // if(err){
        //     console.log(err);
        // }else{

        //     console.log('removed campgrounds');

        //     // add a few campgrounds

        //     for(var seed of data){

        //         Campground.create(seed, (err, campground)=>{
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 console.log('campgrounds added');
        //                 Comment.deleteMany({}, (err)=>{
        //                     if(err){
        //                         console.log(err);
        //                     }else{
        //                         // add a few comments
        //                         Comment.create({
        //                             text: "This place is great, but I wish there was internet",
        //                             author: "Homer"
        //                         }, (err, comment)=>{
        //                             if(err){
        //                                 console.log(err);
        //                             }else{
        
        //                                 campground.comments.push(comment);
        //                                 campground.save();
        //                                 console.log("Created new Comment");
        //                             }
        //                         })
        //                     }
        //                 })
        //             }
        //         })
        //     }
        // }
    });






}

module.exports = seedDB;