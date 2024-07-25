//// JS file for the User schema



/// Setup
require('dotenv').config(); // Load environment variables from .env
const mongoose = require("mongoose");
const transactionSchema = require("./TransactionSchema.js");


// User schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    transactions: [transactionSchema] // Holding the transactions in this array
});

// User model
module.exports = mongoose.model("Users", userSchema);
