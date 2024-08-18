// JSX file for the adding tasks page

import NavBar from './NavBar';
import { useState, useEffect, act } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function AddTasks() {  
    const navigate = useNavigate();

    // State variables
    const [userName, setUsername] = useState(null);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [taskError, setError] = useState(null);
    const [taskSuccess, setSuccess] = useState(null);


    // Function for getting the user details
    async function getUserInformation() {
        // Finding the account
        try {
            const response = await fetch("http://localhost:3000" + "/getUser", {
                method: "GET",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            });

            // If the response status is unauthorized, navigate back to the login and destroy the token
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }

            let data = await response.json();
            const {username} = data;
            
            setUsername(username);
        }
        
        catch (error) {

        }
    }
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
          navigate("/login");
        }
        else {
            getUserInformation();
        }
    }, [])


    // Function to add the task
    async function addTask(event) {
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
        
        // Handling invalid lengths
        if (title.length > 250) {
            setError("Maximum characters for the title is 250");
            setSuccess("");
            return;
        }
        if (description.length > 500) {
            setError("Maximum characters for the description is 500");
            setSuccess("");
            return;
        }
        setError("");


        // Adding the task
        try {
            const response = await fetch("http://localhost:3000" + "/addTask", {
                method: "POST",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                },
                body: 
                  JSON.stringify({
                        username: userName,
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
            const {createdTask} = data;
      
            // If creation is successful
            if (createdTask) {
                setError("");
                setSuccess("Successfully added the task");
            }
            // Else
            else {
                setSuccess("");
                setError("Failed to add the task");
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
                        New Task
                    </div>
                </div>

                {/* Task */}
                <div className = "col-8">
                    <form>
                        <div className ="form-group">

                            {/* Title */}
                            <label htmlFor = "title" className = "fw-bold mb-2"> Title </label>
                            <div className = "mb-4">
                                <input id = "title" value = {title} type = "text" placeholder = "Enter a title" className = "form-control w-100" onChange = {(event) => {setTitle(event.target.value)}} required/>
                            </div>
                                            
                            {/* Date */}
                            <label htmlFor = "calendar" className = "fw-bold mb-2"> Date </label>
                            <div className = "mb-4">
                                <input id = "calendar" value = {date} type = "date" className = "form-control w-100" onChange = {(event) => {setDate(event.target.value)}} required/>
                            </div>

                            {/* Description */}
                            <label htmlFor = "description" className = "fw-bold mb-2"> Description </label>
                            <div className = "mb-4">
                                <textarea id = "description" value = {description} placeholder = "Enter a description (Optional)" className = "form-control w-100" rows = "4" onChange = {(event) => {setDescription(event.target.value)}}></textarea>
                            </div>

                            {/* Error pop-up */}
                            {taskError && <div className = "text-danger mb-3"> {taskError} </div>}

                            {/* Success pop-up */}
                            {taskSuccess && <div className = "text-success mb-3"> {taskSuccess} </div>}

                            {/* Button */}
                            <div>
                                <input type = "submit" value = "Add Task" className = "btn btn-primary w-100 mt-2 mb-5" onClick = {addTask}></input> 
                            </div> 

                        </div>
                    </form>
                </div>

            </div>
        </main>

      </>
    )
}
  
export default AddTasks