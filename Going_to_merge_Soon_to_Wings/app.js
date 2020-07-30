var express = require("express");
var app = express();

var parser = require("body-parser");
app.use(parser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var fr = [{ name: "bishal", breed: "kutta" }, {
    name: "gaitam",
    breed: "chutiya"
}, { name: "goran", breed: "gandu" }];


app.get("/", function(req, res) {
    res.render("home");
})

app.get("/friends", function(req, res) {

    res.render("friends", { friends: fr });
})

app.post("/add", function(req, res) {
    var newnamme = req.body.newname;
    var bred = req.body.breed;
    fr.push({
        name: newnamme,
        breed: bred
    });
    res.redirect("/friends");

})


app.listen(30000, function(req, res) {
    console.log("server");
})