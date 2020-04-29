var express = require('express');
var router  = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleWare = require('../middleware/index');


// =======================
// COMMENTS ROUTES
// =======================






// COMMENTS NEW

router.get('/new', middleWare.isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id, (err,  campground)=>{
        if(err){
            console.log(err);
        }else{

            res.render('comments/new', {campground: campground});
        }
    })
})

// COMMENTS CREATE
router.post('/',  middleWare.isLoggedIn, (req, res)=>{
    // lookup campgrounds using ID
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            Comment.create(req.body.comments, (err, comment)=>{
                if(err){
                    req.flash('error', 'Something went wrong');
                    console.log(err);
                }else{
                    // add username and id to comment

                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'Successfully added comment');
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
        }
    })
    // create new comment
    // connect new comment to campground
    // redirect to show page
});


// Comments Edit Routes
router.get('/:comment_id/edit',  middleWare.checkCommentownership,(req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.redirect('back');
        }else{
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment})
        }
    })
})


// Comments Update Routes
router.put('/:comment_id',  middleWare.checkCommentownership,(req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, (err, updatedComment)=>{
        if(err){
            console.log(err);
            res.redirect('back');
        }else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})


// Comments DESTROY Routes
router.delete('/:comment_id',  middleWare.checkCommentownership, (req, res)=>{
    // finds by ID and remove
    Comment.findByIdAndDelete(req.params.comment_id, (err)=>{
        if(err){
            res.redirect('back');
        }else{
            req.flash('success', 'Comment deleted');
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})




module.exports = router;
