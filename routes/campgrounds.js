var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleWare = require('../middleware/index');


// INDEX ROUTE - show all campgrounds
router.get('/', (req, res)=>{
    
    Campground.find({},(err, allCampgrounds)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
})


// CREATE ROUTE - add a new campground to DB
router.post('/', middleWare.isLoggedIn, (req, res)=>{
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var discription = req.body.discription;
    var newCampground = {name: name, price:price, image: image, discription: discription, author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds')
        }
    })
})


// NEW ROUTE -show form to create new campground
router.get('/new',  middleWare.isLoggedIn, (req,res)=>{
    res.render('campgrounds/new');
})


// SHOW ROUTE - /dogs/:id   SHOW MORE INFO ABOUT ONE CAMPGROUND
router.get('/:id', (req, res)=>{
    // find the campgroud with provided ID
    Campground.findById(req.params.id).populate('comments').exec( (err, foundCampgournd)=>{
        
        if(err){
            console.log(err);
        }else{
            // render show templet with that campground
            res.render('campgrounds/show', {campground: foundCampgournd});
        }
    })
   
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleWare.checkCampgroundownership, (req,res)=>{
        Campground.findById(req.params.id, (err, foundCampground)=>{
            res.render('campgrounds/edit', {campground: foundCampground});
        });
    })


// UPDATE CAMPGROUND ROUTE

router.put('/:id', middleWare.checkCampgroundownership, (req, res)=>{
    // find and update the correct campgrounds
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    })

})

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleWare.checkCampgroundownership, (req, res)=>{
    Campground.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect('/campgrounds')
        }else{
            res.redirect('/campgrounds')
        }
    })
})

module.exports = router;