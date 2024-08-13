//// JS file for the Task schema



/// Setup
require('dotenv').config(); // Load environment variables from .env
const mongoose = require("mongoose");


// Task schema
const taskSchema = new mongoose.Schema({
    title: String,
    date: String,
    description: {
        type: String,
        required: false
    }
});

// Task model
module.exports = taskSchema;
