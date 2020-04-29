var express = require('express');
var router  = express.Router();
var passport = require('passport');
var User     = require('../models/user')


// ==============
// ROOT ROUTE
// ==============

router.get('/', (req, res)=>{
    res.render('landing');
})



// =============
// AUTH ROUTES
// =============

// show resister form
router.get('/register', (req, res)=>{
    res.render('register');
})

// handle signup logic
router.post('/register', (req, res)=>{
    User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
        if(err){
            req.flash('error', err.message);
            res.render('register');
        }
        else{
            passport.authenticate('local')(req, res, ()=>{
                req.flash('success', 'Welcome to YelpCamp ' + user.username);
                res.redirect('/campgrounds');
            })

        }
    })
})

// show login form
router.get('/login', (req, res)=>{
    res.render('login');
})

// handeling login logic
router.post('/login', passport.authenticate('local', {
    
    successRedirect: '/campgrounds',
    // successFlash: req.flash('success', "Successfully Logged in as" + user.username),
    failureRedirect: '/login', 
}) ,(req, res)=>{

})

// logout route
router.get('/logout', (req, res)=>{
    req.logOut();
    req.flash('success', 'Logged You Out')
    res.redirect('/campgrounds');
})


module.exports = router;
