//// JS file for the Task model



/// Setup
require('dotenv').config(); // Load environment variables from .env
const taskSchema = require("./TaskSchema.js");
const mongoose = require("mongoose");

// Task model
module.exports = mongoose.model("Tasks", taskSchema);
