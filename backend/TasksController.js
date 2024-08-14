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

// Post request (adding a task)
router.post("/addTask", authenticateToken, async (request, response) => {
    // Extracting the details
    let { username, title, date, description } = request.body;
  
    try {
  
      // If the account exists, create the task
      const user = await User.findById(request.user._id);
      
      if (user != null) {
        // Create the task, add it to the user, and save the user
        user.tasks.push(new Task({title, date, description}));
        user.tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        await user.save();
  
        // Returning things to the client
        response.status(201).json({createdTask: true});
      }
  
      // Otherwise, do not create a task
      else {
        response.status(401).json({createdTask: false});
      }
    }
    
    catch (error) {
      // Otherwise, do not create a task
      response.status(422).json({createdTask: false});
    } 
});
  
  
// Post request (getting the tasks)
router.post("/getTasks", authenticateToken, async (request, response) => {
    let { taskFilter } = request.body;
  
    try {
      // If the account exists, return the tasks
      const user = await User.findById(request.user._id);
  
      if (user != null) {
        let tasks;
  
        // If there is a filter, return the filtered tasks
        if (taskFilter != "") {
          tasks = user.tasks.filter(task => task.title.includes(taskFilter));
        }
  
        // Else return all the tasks
        else {
          tasks = user.tasks;
        }
  
        response.status(200).json({tasks: tasks});
      }
      
      // Otherwise, do not return the tasks
      else {
        response.status(401).json({tasks: null});
      }
    }
  
    catch (error) {
      // Otherwise, do not return the tasks
      response.status(409).json({tasks: null});
    }
});
  
  
// Get request (getting a task)
router.get("/getTask/:taskID", authenticateToken, async (request, response) => {
    const taskID  = request.params.taskID;
  
    try {
      // If the account exists, return the task
      const user = await User.findById(request.user._id);
  
      if (user != null) {
        const task = user.tasks.find(t => t._id == taskID);

        // If the task is null
        if (task == null) {
            response.status(404).json({task: null});
            return;
        }

        // Else
        response.status(200).json({task: task, 
            tTitle: task.title, tDate: task.date, tDescription: task.description});
      }
      
      // Otherwise, do not return the task
      else {
        response.status(401).json({task: null});
      }
    }
  
    catch (error) {
      // Otherwise, do not return the task
      response.status(409).json({task: null});
    }
});
  
  
// Delete request (deleting a task)
router.delete("/deleteTask", authenticateToken, async (request, response) => {
    const {taskID} = request.body;
  
    try {
      // If the account exists, delete the task
      const user = await User.findById(request.user._id);
  
      if (user != null) {
        let newTasks = user.tasks.filter(task => task._id != taskID);
        user.tasks = newTasks;
        await user.save();
        response.status(200);
      }
      
      // Otherwise, do not delete the task
      else {
        response.status(401);
      }
    }
  
    catch (error) {
      // Otherwise, do not delete the task
      response.status(409);
    }
});
  
  
// Delete request (deleting all tasks)
router.delete("/deleteTasks", authenticateToken, async (request, response) => {
    try {
      // If the account exists, delete the tasks
      const user = await User.findById(request.user._id);
  
      if (user != null) {
        user.tasks = [];
        await user.save();
        response.status(200);
      }
      
      // Otherwise, do not delete the tasks
      else {
        response.status(401);
      }
    }
  
    catch (error) {
      // Otherwise, do not delete the tasks
      response.status(409);
    }
});
  
  
// Patch request (editing a task)
router.patch("/editTask", authenticateToken, async (request, response) => {
    // Extracting the details
    let {taskID, title, date, description } = request.body;
  
    try {
  
      // If the account exists, edit the task
      const user = await User.findById(request.user._id);
      
      if (user != null) {
  
        // Edit the task, and save the user
        user.tasks.find(task => task._id == taskID).title = title;
        user.tasks.find(task => task._id == taskID).date = date;
        user.tasks.find(task => task._id == taskID).description = description;
        user.tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        await user.save();
  
        // Returning things to the client
        response.status(200).json({editedTask: true});
      }
  
      // Otherwise, do not edit the task
      else {
        response.status(401).json({editedTask: false});
      }
    }
    
    catch (error) {
      // Otherwise, do not edit the task
      response.status(422).json({editedTask: false});
    } 
});



/// Exporting
module.exports = router;