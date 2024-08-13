// JSX file for the editing tasks page

import NavBar from './NavBar';
import { useState, useEffect, act } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function EditTask() {  
    const navigate = useNavigate();

    // State variables
    const [userName, setUsername] = useState(null);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [taskError, setError] = useState(null);
    const [taskSuccess, setSuccess] = useState(null);
    const [taskID, setTaskID] = useState(new URLSearchParams(useLocation().search).get("id"));


    // Function for getting the task details
    async function getTaskInformation() {
        // Finding the task
        try {
            const response = await fetch("http://localhost:3000" + "/getTask/" + taskID, {
                method: "GET",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }

            // If the task is null, redirect back to tasks
            if (response.status === 404) {
                navigate("/tasks");
            }

            // Else
            let data = await response.json();
            const {tTitle, tDate, tDescription} = data;
            setTitle(tTitle);
            setDate(tDate);
            setDescription(tDescription);
        }
        
        catch (error) {

        }
    }
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
          navigate("/login");
        }
        else if (taskID == null || taskID == "") {
            navigate("/tasks");
        }
        else {
            getTaskInformation();
        }
    }, [])


    // Function to edit the task
    async function updateTask(event) {
        event.preventDefault();

        // Handling missing input
        if (title == "") {
            setError("Enter a title");
            setSuccess("");
            return;
        }
        if (date == "") {
            setError("Select a date");
            setSuccess("");
            return;
        }
        setError("");

        // Editing the task
        try {
            const response = await fetch("http://localhost:3000" + "/editTask", {
                method: "PATCH",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                },
                body: 
                  JSON.stringify({
                        taskID: taskID,
                        title: title,
                        date: date,
                        description: description
                  })
              });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }

            let data = await response.json();
            const {editedTask} = data;
      
            // If creation is successful
            if (editedTask) {
                setError("");
                setSuccess("Successfully saved the task");
            }
            // Else
            else {
                setSuccess("");
                setError("Failed to save the task");
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
            <div className = "row justify-content-center">

                {/* Title */}
                <div className = "col-8 mb-5"> 
                    <div className = "fw-bold fs-3 text-center">
                        Edit Task
                    </div>
                </div>

                {/* Task */}
                <div className = "col-8">
                    <form>
                        <div className ="form-group">
                                            
                            {/* Title */}
                            <label htmlFor = "title" className = "fw-bold mb-2"> Title </label>
                            <div className = "mb-4">
                                <input id = "title" value = {title} type = "text" className = "form-control w-100" onChange = {(event) => {setTitle(event.target.value)}} required/>
                            </div>

                            {/* Date */}
                            <label htmlFor = "calendar" className = "fw-bold mb-2"> Date </label>
                            <div className = "mb-4">
                                <input id = "calendar" value = {date} type = "date" className = "form-control w-100" onChange = {(event) => {setDate(event.target.value)}} required/>
                            </div>

                            {/* Description */}
                            <label htmlFor = "description" className = "fw-bold mb-2"> Description </label>
                            <div className = "mb-4">
                                <textarea id = "description" value = {description} className = "form-control w-100" rows = "4" onChange = {(event) => {setDescription(event.target.value)}}></textarea>
                            </div>

                            {/* Error pop-up */}
                            {taskError && <div className = "text-danger mb-3"> {taskError} </div>}

                            {/* Success pop-up */}
                            {taskSuccess && <div className = "text-success mb-3"> {taskSuccess} </div>}

                            {/* Button */}
                            <div>
                                <input type = "submit" value = "Save Task" className = "btn btn-primary w-100 mt-2 mb-5" onClick = {updateTask}></input> 
                            </div> 

                        </div>
                    </form>
                </div>

            </div>
        </main>

      </>
    )
}
  
export default EditTask