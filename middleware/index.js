var Campground = require('../models/campground');
var Comment = require('../models/comment');
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundownership = (req, res, next)=>{
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err){
                req.flash('error', 'Campground not found');
                res.redirect('back');
            }else{
                // does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash('error', 'You dont have permision to do that');
                    res.redirect('back');
                }
            }
        });
    }else{
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
};

middlewareObj.checkCommentownership = (req, res, next)=>{

    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                // does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash('error', 'You dont have permision to do that');
                    res.redirect('back');
                }
            }
        });
    }else{
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
};


module.exports = middlewareObj;