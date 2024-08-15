//// JS file for the transaction endpoints



/// Setup

require('dotenv').config(); // Load environment variables from .env
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./User.js");
const Transaction = require('./Transaction.js');
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

// Post request (adding a transaction)
router.post("/addTransaction", authenticateToken, async (request, response) => {
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
  
  
// Post request (getting the transactions)
router.post("/getTransactions", authenticateToken, async (request, response) => {
    let { transactionFilter } = request.body;
  
    try {
      // If the account exists, return the transactions
      const user = await User.findById(request.user._id);
  
      if (user != null) {
        let transactions;
  
        // If there is a filter, return the filtered transactions
        if (transactionFilter != "") {
          transactions = user.transactions.filter(transaction => transaction.activity.includes(transactionFilter));
        }
  
        // Else return all the transactions
        else {
          transactions = user.transactions;
        }
  
        const currency = user.currency;
        response.status(200).json({transactions: transactions, currency: currency});
      }
      
      // Otherwise, do not return the transactions
      else {
        response.status(401).json({transactions: null, currency: null});
      }
    }
  
    catch (error) {
      // Otherwise, do not return the transactions
      response.status(409).json({transactions: null, currency: null});
    }
});
  
  
// Get request (getting a transaction)
router.get("/getTransaction/:transactionID", authenticateToken, async (request, response) => {
    const transactionID  = request.params.transactionID;
  
    try {
      // If the account exists, return the transaction
      const user = await User.findById(request.user._id);
  
      if (user != null) {
        const transaction = user.transactions.find(t => t._id == transactionID);

        // If the transaction is null
        if (transaction == null) {
            response.status(404).json({transaction: null});
            return;
        }

        // Else
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
router.delete("/deleteTransaction", authenticateToken, async (request, response) => {
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
  
  
// Delete request (deleting all transactions)
router.delete("/deleteTransactions", authenticateToken, async (request, response) => {
    try {
      // If the account exists, delete the transactions
      const user = await User.findById(request.user._id);
  
      if (user != null) {
        user.transactions = [];
        await user.save();
        response.status(200);
      }
      
      // Otherwise, do not delete the transactions
      else {
        response.status(401);
      }
    }
  
    catch (error) {
      // Otherwise, do not delete the transactions
      response.status(409);
    }
});
  
  
// Patch request (editing a transaction)
router.patch("/editTransaction", authenticateToken, async (request, response) => {
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
        user.transactions.find(transaction => transaction._id == transactionID).colour = colour;
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



/// Exporting
module.exports = router;