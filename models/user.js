var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const { stringify } = require("querystring");

var UserSchema = new mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    mail: String,
    password: String,
    contact: Number
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);