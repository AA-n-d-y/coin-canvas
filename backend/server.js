//// JS file for the server



/// Setup

require('dotenv').config(); // Load environment variables from .env
const User = require("./User.js");
const Transaction = require('./Transaction.js');
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



/// Extra functions

function generateToken(user) {
  // Return a token associated with the user 
  return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30d"});
}

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

// Get request (getting a user's information)
app.get("/getUser", authenticateToken, async (request, response) => {
  // Getting the user information
  const user = await User.findById(request.user._id);
  const {firstName, lastName, email, username} = user;

  // Returning the information
  response.status(200).json({firstName, lastName, email, username});
  return;
});


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
  
  catch (error) {
    response.status(422).json({createdUser: false});
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
      // Generate the JWT and send stuff back to the client
      response.status(200).json({loggedIn: true, user, accessToken: generateToken(user)});
    }

    // Otherwise, do not log them in
    else {
      response.status(404).json({loggedIn: false, user: null, accessToken: null});
    }
  }
  
  catch (error) {
    // Otherwise, do not log them in
    response.status(404).json({loggedIn: false, user: null, accessToken: null});
  } 
});


// Post request (adding a transaction)
app.post("/addTransaction", authenticateToken, async (request, response) => {
  // Extracting the details
  let { username, date, activity, amount, type, description } = request.body;

  try {
    type = type.toUpperCase();

    // Making sure the amount doesn't contain the - symbol and formatting it
    amount = Math.abs(amount);
    amount = parseFloat(amount).toFixed(2);
    amount = amount.toString();

    // If the account exists, create the transaction
    const user = await User.findById(request.user._id);
    
    if (user != null) {

      let colour;
      if (type == "EXPENSE") {
        colour = "#fe4545";
      }
      else {
        colour = "#02d882";
      }

      // Create the transaction, add it to the user, and save the user
      user.transactions.push(new Transaction({date, activity, amount, type, colour, description}));
      user.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      await user.save();

      // Returning things to the client
      response.status(201).json({createdTransaction: true});
    }

    // Otherwise, do not create a transaction
    else {
      response.status(401).json({createdTransaction: false});
    }
  }
  
  catch (error) {
    // Otherwise, do not create a transaction
    response.status(422).json({createdTransaction: false});
  } 
});


// Get request (getting the transactions)
app.get("/getTransactions", authenticateToken, async (request, response) => {
  try {
    // If the account exists, return the transactions
    const user = await User.findById(request.user._id);

    if (user != null) {
      const transactions = user.transactions;
      response.status(200).json({transactions: transactions});
    }
    
    // Otherwise, do not return the transactions
    else {
      response.status(401).json({transactions: null});
    }
  }

  catch (error) {
    // Otherwise, do not return the transactions
    response.status(409).json({transactions: null});
  }
});


// Get request (getting a transaction)
app.get("/getTransaction/:transactionID", authenticateToken, async (request, response) => {
  const transactionID  = request.params.transactionID;

  try {
    // If the account exists, return the transaction
    const user = await User.findById(request.user._id);

    if (user != null) {
      const transaction = user.transactions.find(t => t._id == transactionID);
      response.status(200).json({transaction: transaction, 
        tDate: transaction.date, tActivity: transaction.activity, tAmount: transaction.amount, tType: transaction.type, tDescription: transaction.description});
    }
    
    // Otherwise, do not return the transaction
    else {
      response.status(401).json({transaction: null});
    }
  }

  catch (error) {
    // Otherwise, do not return the transaction
    response.status(409).json({transaction: null});
  }
});


// Delete request (deleting a transaction)
app.delete("/deleteTransaction", authenticateToken, async (request, response) => {
  const {transactionID} = request.body;

  try {
    // If the account exists, delete the transaction
    const user = await User.findById(request.user._id);

    if (user != null) {
      let newTransactions = user.transactions.filter(transaction => transaction._id != transactionID);
      user.transactions = newTransactions;
      await user.save();
      response.status(200);
    }
    
    // Otherwise, do not delete the transaction
    else {
      response.status(401);
    }
  }

  catch (error) {
    // Otherwise, do not delete the transaction
    response.status(409);
  }
});


// Patch request (editing a transaction)
app.patch("/editTransaction", authenticateToken, async (request, response) => {
  // Extracting the details
  let {transactionID, date, activity, amount, type, description } = request.body;

  try {
    type = type.toUpperCase();

    // Making sure the amount doesn't contain the - symbol and formatting it
    amount = Math.abs(amount);
    amount = parseFloat(amount).toFixed(2);
    amount = amount.toString();

    // If the account exists, edit the transaction
    const user = await User.findById(request.user._id);
    
    if (user != null) {

      let colour;
      if (type == "EXPENSE") {
        colour = "#fe4545";
      }
      else {
        colour = "#02d882";
      }

      // Edit the transaction, and save the user
      user.transactions.find(transaction => transaction._id == transactionID).date = date;
      user.transactions.find(transaction => transaction._id == transactionID).activity = activity;
      user.transactions.find(transaction => transaction._id == transactionID).amount = amount;
      user.transactions.find(transaction => transaction._id == transactionID).type = type;
      user.transactions.find(transaction => transaction._id == transactionID).description = description;
      user.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      await user.save();

      // Returning things to the client
      response.status(200).json({editedTransaction: true});
    }

    // Otherwise, do not edit the transaction
    else {
      response.status(401).json({editedTransaction: false});
    }
  }
  
  catch (error) {
    // Otherwise, do not edit the transaction
    response.status(422).json({editedTransaction: false});
  } 
});



/// Running the server
app.listen(PORT, () => {
    console.log("SERVER RUNNING");
});
