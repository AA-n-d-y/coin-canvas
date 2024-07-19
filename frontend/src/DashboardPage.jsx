// JSX file for the dashboard page

import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function DashboardPage() {  
    const navigate = useNavigate();

    // State variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");


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

            // If the response was not ok or the username is null, navigate back to the login and destroy the token
            let data = await response.json();
            const {firstName, lastName, email, username} = data;
            if (response.status === 401 || username == null) {
                localStorage.clear();
                navigate("/login");
            }
            
            // Else if login is successful, set some state variable values
            setFirstName(firstName);
            setLastName(lastName);
            
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
    

    // Returning
    return (
      <>
        {/* Navigation bar */}
        <NavBar/>
        

        {/* Content */}
        <main className = "container p-0" style = {{marginTop: "100px"}}>
            <div className = "row justify-content-center">
                {/* Welcome */}
                <div className = "col-10"> 
                    <div className = "fw-bold fs-3">
                        Welcome, {firstName} {lastName}
                    </div>
                </div>

                {/* Overview */}
                

            </div>
        </main>

      </>
    )
}
  
export default DashboardPage