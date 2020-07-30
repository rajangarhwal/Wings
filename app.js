var express = require("express");
var app = express();

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("Home");
})

app.get("/Login/", function(req, res) {
    res.render("Login");
})

app.listen(process.env.PORT, process.env.IP, function(req, res) {
    console.log("Server Started !!");
})
