// JSX file for the tasks page

import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';

function TasksPage() {  
    const navigate = useNavigate();

    // State variables
    const [taskData, setTaskData] = useState([]);
    const [taskFilter, setTaskFilter] = useState("");


    // Function for getting the task details
    async function getTaskInformation(taskFilter) {
        // Finding the tasks
        try {
            const response = await fetch("http://localhost:3000" + "/getTasks", {
                method: "POST",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                },
                body: 
                  JSON.stringify({
                        taskFilter: taskFilter
                  })
            });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }

            let data = await response.json();
            const {tasks} = data;
            setTaskData(tasks);
        }
        
        catch (error) {

        }
    }
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
        else {
            getTaskInformation(taskFilter);
        }
    }, [taskFilter])


    // Function to delete a task
    async function deleteTask(taskID) {
        // Deleting the task
        try {
            const response = await fetch("http://localhost:3000" + "/deleteTask", {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                },
                body: 
                  JSON.stringify({
                        taskID: taskID
                  })
              });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }

        catch (error) {

        }
    }


    // Function to delete all tasks
    async function deleteTasks() {
        // Deleting the task
        try {
            const response = await fetch("http://localhost:3000" + "/deleteTasks", {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken")
                }
              });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }

        catch (error) {

        }
    }

    
    // Returning
    return (
      <>
        {/* Navigation bar */}
        <NavBar/>


        {/* Content */}
        <main className = "container" style = {{marginTop: "75px"}}>
            
            {/* Content beginning */}
            <div className = "row d-flex justify-content-center">

                {/* Content header */}
                <span className = "col-8 fw-bold fs-3 mb-1">
                    Tasks
                </span>

                {/* Add tasks */}
                <NavLink to = "/addTasks" className = "col-md-2 col-8 btn bg-dark text-light fs-5 mx-1 mb-3 py-2"> + Add new </NavLink> 

            </div>

            {/* Tasks section */}
            <div className = "row justify-content-center mt-5 mb-5">
                <div className = "col-10">

                    {/* Search bar */}
                    <input value = "" className = "form-control w-100 mb-2" placeholder = "Filter by title..." 
                        onChange = {(event) => {
                            setTaskFilter(event.target.value);
                        }} 
                    />

                    
                    {/* Task Total and Delete All Button*/}
                    <form action = "/tasks" method = "GET">
                        <span className = "d-flex justify-content-between mt-4 mb-5">
                            <span className = "fw-bold fs-5 py-2"> Tasks: {taskData.length} </span>
                            <input type = "submit" value = "DELETE ALL" className = "btn border border-3 border-dark text-danger fw-bold px-3 py-2" 
                                style = {{ backgroundColor: "#ffabab"}} 
                                onClick = 
                                    {() => {
                                        deleteTasks();
                                    }}
                            > 
                            </input>
                        </span>
                    </form>

                
                    {/* Tasks */}
                    <div className = "">
                        {taskData.map((task, index) => (
                            <div className = "col-4 border border-dark">
                                <h5> {task.title} </h5>
                                <span> {task.date} </span>
                                <p> {task.description} </p>
                                
                            </div>
                        ))}
                    </div>
        
                </div>
            </div>

        </main>

      </>
    )
}
  
export default TasksPage