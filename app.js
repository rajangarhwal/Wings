var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    passport = require("passport"),
    bodyparser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportlocalMongoose = require("passport-local-mongoose"),
    request = require("request"),
    User = require("./models/user");




mongoose.connect('mongodb://localhost/App_Wings', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.use(require("express-session")({
    secret: "Something is usual but in secret",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});



app.get("/", function(req, res) {

    res.render("Home", { currentUser: req.user });
})





app.get("/movie_rating/", isLoggedIn, function(req, res) {
    res.render("movie_rating");
})

app.post("/movie_rating/results/", isLoggedIn, function(req, res) {

    var query = req.body.mvname;
    console.log(query);
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    console.log(url);
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var mv = JSON.parse(body);
            console.log(mv["Search"]);
            res.render("movie_rating_results", { mvd: mv });
        }

    });
})







// Register form

app.get("/Sign_Up", function(req, res) {
    res.render("Sign_Up");
})

// handle Sign Up logic

app.post("/Sign_Up", function(req, res) {
    var newfirst = req.body.newfirst;
    var newlast = req.body.newlast;
    var newemail = req.body.newemail;
    var password = req.body.password;
    var newcontact = req.body.newcontact;
    var username = req.body.username;

    var newUser = new User({
        username: username,
        first_name: newfirst,
        last_name: newlast,
        mail: newemail,
        contact: newcontact
    });

    User.register(newUser, password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("Sign_Up");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/");
        });
    });
})


// show login form 
app.get("/Login", function(req, res) {
    res.render("Login");
})

// handling login logic

app.post("/Login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/Login"
}), function(req, res) {});


// logout route 
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// login check

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/Login")
}

app.listen(3099, function(req, res) {
    console.log("Server Started !!! ");
})
