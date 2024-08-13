//// JS file for the task endpoints



/// Setup

require('dotenv').config(); // Load environment variables from .env
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./User.js");
const Task = require('./Task.js');
const express = require("express");
const router = express.Router();



/// Extra functions
  
function authenticateToken(request, response, next) {
    const authHeader = request.headers["authorization"];
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



/// Exporting
module.exports = router;