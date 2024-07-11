//// JS file for the server



/// Setup
require('dotenv').config(); // Load environment variables from .env
let PORT = process.env.PORT;
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

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

const User = require("./User.js");


/// Routes

// Post request (creating a new account)
app.post("/register", async (request, response) => { 
  // Extracting the details
  const { firstName, lastName, email, username, password } = request.body;

  try {
    // If the user already exists, do not create an account
    const tempUser = await User.findOne({username: username});
    if (tempUser != null) {
      response.status(409).json({createdUser: false});
      return;
    }

    // Otherwise, create a new account and save it to the database
    const newUser = new User({firstName, lastName, email, username, password});
    await newUser.save();
    response.status(201).json({createdUser: true, newUser});
  }
  
  catch(error) {
    console.error("Error in creating an account", error);
  }
});


/// Running the server
app.listen(PORT, () => {
    console.log("SERVER RUNNING");
});
