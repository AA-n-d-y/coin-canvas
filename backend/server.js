//// JS file for the server



/// Setup
require('dotenv').config(); // Load environment variables from .env

let PORT = process.env.PORT;
const express = require("express");
const app = express();

// Connect to MongoDB using async/await
let DB_URL = process.env.DB_URL;
const mongoose = require("mongoose");
async function connectDB() {
    try {
      await mongoose.connect(DB_URL);
      console.log("Successfully connected to the database");
    } 
    catch (error) {
      console.error("Failed to connect to the database", error);
    }
}
connectDB();



/// Routes

// Post request (creating a new account)
app.post("/register", (request, response, next) => { 

})


/// Running the server
app.listen(PORT, () => {
    console.log("SERVER RUNNING");
});
