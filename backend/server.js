//// JS file for the server



/// Setup

require('dotenv').config(); // Load environment variables from .env
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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



/// Extra functions

function generateToken(user) {
  // Return a token associated with the user
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30d"});
}

function authenticateToken(request, response, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // If the token does not exist
  if (token == null) {
    return response.status(401);
  }

  // Else verify it
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    // If there is an error
    if (error) {
      return response.status(401);
    }

    // Otherwise, attach the user to request and move on to the next middleware/route
    request.user = user;
    next();
  });
}



/// Routes

// Post request (creating a new account)
app.post("/register", async (request, response) => { 
  // Extracting the details
  let { firstName, lastName, email, username, password } = request.body;

  try {
    // If the user already exists, do not create an account
    const tempUser = await User.findOne({username: username});
    if (tempUser != null) {
      response.status(409).json({createdUser: false});
      return;
    }

    // Otherwise, create a new account and save it to the database
    password = await bcrypt.hash(password, 10);
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
    // If the account exists, log them in
    const user = await User.findOne({username: username});

    if (user != null && (await bcrypt.compare(password, user.password))) {
      response.status(200).json({loggedIn: true, user});
    }

    // Otherwise, do not log them in
    else {
      response.status(404).json({loggedIn: false, user: null});
    }
  }
  
  catch(error) {
    // Otherwise, do not log them in
    response.status(404).json({loggedIn: false, user: null});
    console.log("Error in logging in");
  } 
});



/// Running the server
app.listen(PORT, () => {
    console.log("SERVER RUNNING");
});
