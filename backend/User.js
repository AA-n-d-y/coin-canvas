//// JS file for the User schema



/// Setup
require('dotenv').config(); // Load environment variables from .env
const mongoose = require("mongoose");
const taskSchema = require("./TaskSchema.js");
const transactionSchema = require("./TransactionSchema.js");


// User schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    currency: String,
    tasks: [taskSchema], // Holding the tasks in this array
    transactions: [transactionSchema] // Holding the transactions in this array
});

// User model
module.exports = mongoose.model("Users", userSchema);
