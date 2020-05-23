var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Campground              = require('./models/campground'), // For Schema
    Comment                 = require('./models/comment'),
    User                    = require('./models/user')   
    flash                   = require('connect-flash'),
    seedsDB                 = require('./seeds'),
    methodOverride          = require('method-override'),
    passport                = require('passport'),
    LocalAtrategy           = require('passport-local');


    //Requiring Routes
var commentRoutes           = require('./routes/comments'),
    campgroundRoutes        = require('./routes/campgrounds'),
    indexRoutes             = require('./routes/index');
    const PORT = process.env.PORT || 49966

    // seedsDB(); //seed the database
     

    mongoose.connect(process.env.DATABASEURL, {useNewUrlParser:true, useUnifiedTopology:true})
    // mongoose.connect("", {useNewUrlParser:true, useUnifiedTopology:true})
    app.use(bodyParser.urlencoded({extended: true}))
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'))
    app.use(methodOverride('_method'));
    app.use(flash());

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Once aain Rusty wins cutest dog',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalAtrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

app.use('/',indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

//  PORT LISTNING
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
