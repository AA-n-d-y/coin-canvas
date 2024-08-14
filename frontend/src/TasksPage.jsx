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
                <NavLink to = "/addTasks" className = "col-md-2 col-8 btn btn-dark text-light fs-5 mx-1 mb-3 py-2"> + Add new </NavLink> 

            </div>

            {/* Tasks section */}
            <div className = "row justify-content-center mt-5 mb-5">
                <div className = "col-10">

                    {/* Search bar */}
                    <input value = {taskFilter} className = "form-control w-100 mb-2" placeholder = "Filter by title..." 
                        onChange = {(event) => {
                            setTaskFilter(event.target.value);
                        }} 
                    />

                    
                    {/* Task Total and Delete All Button*/}
                    <form action = "/tasks" method = "GET">
                        <span className = "d-flex flex-wrap justify-content-between mt-4 mb-5">
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

                </div>


                {/* Tasks */}
                <div className = "col-12 d-flex flex-wrap flex-md-row d-grid justify-content-center">
                        {taskData.map((task, index) => (
                            <div key = {task._id} className = "col-md-3 col-10 border shadow-sm mx-3 mb-5 px-3">
                                
                                {/* Task details*/}
                                <h5 className = "mt-2 fs-5 py-2" style = {{overflowX: "hidden", overflowY: "hidden"}}> {task.title} </h5>
                                <span className = "text-secondary fs-6" style = {{overflowX: "hidden", overflowY: "hidden"}}> {task.date} </span>
                                <p className = "fs-6 mt-3" style = {{overflowX: "hidden", overflowY: "hidden"}}> {task.description} </p>


                                {/* Details, Edit, and Delete Buttons */}
                                <div className = "d-flex flex-wrap justify-content-end mt-4 mb-3"> 

                                    {/* Details */}
                                    <input type = "submit" value = "DETAILS" className = "text-success bg-white px-2" 
                                        style = {{border: "none"}}
                                        data-bs-toggle = "modal" data-bs-target = {`#${task._id}`}
                                    />

                                    {/* Details Modal */}
                                    <div className = "modal fade" id = {task._id} tabIndex = "-1" role = "dialog" aria-labelledby = "detailsModalTitle" aria-hidden = "true">
                                        <div className = "modal-dialog modal-dialog-centered" role = "document">
                                            <div className = "modal-content">
                                                <div className = "modal-header">
                                                    <h5 className = "modal-title" id = "detailsModalLongTitle"> Task Details </h5>
                                                    <button type = "button" className = "btn-close" data-bs-dismiss = "modal" aria-label = "Close"></button>
                                                </div>

                                                <div className = "modal-body" style = {{ overflowWrap: 'break-word', wordWrap: 'break-word' }}>
                                                    <label> Title </label>
                                                    <h5 className = "form-control mt-1 mb-4 py-2"> {task.title} </h5>

                                                    <label> Date </label>
                                                    <span className = "form-control mt-1 mb-4 py-2"> {task.date} </span>

                                                    <label> Description </label>
                                                    <p className = "form-control mt-1 mb-4 py-2"> {task.description} </p>
                                                </div>
                                                
                                                <div className = "modal-footer">
                                                    <button type = "button" className = "btn btn-primary" data-bs-dismiss = "modal"> Close </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Edit */}
                                    <input type = "submit" value = "EDIT" className = "text-primary bg-white px-2" 
                                        style = {{border: "none"}}
                                        onClick = 
                                            {() => {
                                                navigate("/editTask?id=" + task._id);
                                            }}
                                    />


                                    {/* Delete */}
                                    <form action = "/tasks" method = "GET">
                                        <input type = "submit" value = "DELETE" className = "text-danger bg-white px-2" 
                                            style = {{border: "none"}} 
                                            onClick = 
                                                {() => {
                                                    deleteTask(task._id);
                                                }}
                                        > 
                                        </input>
                                    </form>

                                </div>


                            </div>
                        ))}
                </div>


            </div>
        </main>

      </>
    )
}
  
export default TasksPage