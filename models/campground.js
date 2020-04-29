var mongoose = require('mongoose');

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String, 
    discription: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ]
});

var Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;


// Campground.create(
//     {
//         name: 'hills', 
//         image:'https://champ.d.umn.edu/sites/champ.d.umn.edu/files/styles/hero_interior_880x404/public/umd_interior_home/campground_image.jpg?itok=Gwxo4bUd',
//         discription: 'To one degree or another, we’re all looking for places that fire our imagination, places that call to us. The places that make it easier to breathe, but at the same time, have the power to leave us breathless'
    
//     }, (err, campground)=>{
//         if(err) console.log(err);
//         else{
//             console.log("NEWLY CREATED CAMPGROUND :")
//             console.log(campground);
//         }
//     }

// )
    // var campgrounds = [
    //     {name: 'salmon creek', image:'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&auto=format&fit=crop&w=1388&q=80'}, 
    //     {name: 'hills', image:'https://champ.d.umn.edu/sites/champ.d.umn.edu/files/styles/hero_interior_880x404/public/umd_interior_home/campground_image.jpg?itok=Gwxo4bUd'}, 
    //     {name: 'mountain', image:'https://pixnio.com/free-images/2019/07/20/2019-07-20-13-53-08-1200x800.jpg'},
    //     {name: 'salmon creek', image:'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&auto=format&fit=crop&w=1388&q=80'}, 
    //     {name: 'hills', image:'https://champ.d.umn.edu/sites/champ.d.umn.edu/files/styles/hero_interior_880x404/public/umd_interior_home/campground_image.jpg?itok=Gwxo4bUd'}, 
    //     {name: 'mountain', image:'https://pixnio.com/free-images/2019/07/20/2019-07-20-13-53-08-1200x800.jpg'},
    //     {name: 'salmon creek', image:'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&auto=format&fit=crop&w=1388&q=80'}, 
    //     {name: 'hills', image:'https://champ.d.umn.edu/sites/champ.d.umn.edu/files/styles/hero_interior_880x404/public/umd_interior_home/campground_image.jpg?itok=Gwxo4bUd'}, 
    //     {name: 'mountain', image:'https://pixnio.com/free-images/2019/07/20/2019-07-20-13-53-08-1200x800.jpg'},
    // ];
