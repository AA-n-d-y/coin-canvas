//// JS file for the User schema



/// Setup
require('dotenv').config(); // Load environment variables from .env
const mongoose = require("mongoose");


// User schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String
});

// User model
module.exports = mongoose.model("Users", userSchema);