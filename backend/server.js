//// JS file for the server



/// Setup

require('dotenv').config(); // Load environment variables from .env
const jwt = require("jsonwebtoken");
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
      console.log("Failed to connect to the database");
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
    response.status(201).json({createdUser: true});
  }
  
  catch(error) {
    console.log("Error in creating an account");
  }
});


// Post request (logging in)
app.post("/login", async (request, response) => {
  // Extracting the details
  const { username, password } = request.body;

  try {
    // If the account does not exist, do not log in
    const user = await User.findOne({username: username, password: password});
    if (user == null) {
      response.status(404).json({loggedIn: false, user: null});
      return;
    }

    // Otherwise, log the user in
    response.status(200).json({loggedIn: true, user});
  }
  
  catch(error) {
    console.log("Error in logging in");
  }  
});



/// Running the server
app.listen(PORT, () => {
    console.log("SERVER RUNNING");
});
