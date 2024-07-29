//// JS file for the Transaction schema



/// Setup
require('dotenv').config(); // Load environment variables from .env
const mongoose = require("mongoose");


// Transaction schema
const transactionSchema = new mongoose.Schema({
    date: String,
    activity: String,
    amount: String,
    type: String,
    colour: String,
    description: {
        type: String,
        required: false
    }
});

// Transaction model
module.exports = transactionSchema;
