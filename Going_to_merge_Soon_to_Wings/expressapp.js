var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("welcome on my site!!");
})

app.get("/dogs", function(req, res) {
    var dogs = [{
        name: "bishal",
        breed: "verma"
    }, {
        name: "abhisek",
        breed: "gotam"
    }];

    res.render("app.ejs", { Dog: dogs });
})

app.listen(30000, function(res, req) {
    console.log("server!!");
})