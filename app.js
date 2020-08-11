var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    bodyparser = require("body-parser");



app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


mongoose.connect('mongodb://localhost/App_Wings', { useNewUrlParser: true, useUnifiedTopology: true });
var customerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    mail: String,
    password: String,
    contact: Number
});

var Customer = mongoose.model('Customer', customerSchema);


app.get("/", function(req, res) {
    res.render("Home");
})

app.get("/Login/", function(req, res) {
    res.render("Login");
})
app.get("/Sign_Up/", function(req, res) {
    res.render("Sign_Up");
})

app.post("/add", function(req, res) {
    var newfirst = req.body.newfirst;
    var newlast = req.body.newlast;
    var newemail = req.body.newemail;
    var newpass1 = req.body.password;
    var newcontact = req.body.newcontact;

    Customer.create({
        first_name: newfirst,
        last_name: newlast,
        mail: newemail,
        password: newpass1,
        contact: newcontact
    }, function(err, customer) {
        if (err) {
            console.log("Got Error During Addition of Database")
            console.log(err);
        } else {
            console.log("NEw Customer Data is Added");
            console.log(customer);
        }
    });
    res.redirect("/");
})
app.listen(process.env.PORT, process.env.IP, function(req, res) {
    console.log("Server Started !!");
})
