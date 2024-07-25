//// JS file for the Transaction model



/// Setup
require('dotenv').config(); // Load environment variables from .env
const transactionSchema = require("./TransactionSchema.js");
const mongoose = require("mongoose");

// Transaction model
module.exports = mongoose.model("Transactions", transactionSchema);
