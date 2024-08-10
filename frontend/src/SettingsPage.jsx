// JSX file for the settings page

import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function SettingsPage() {  
    const navigate = useNavigate();

    // State variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [detailsError, setDetailsError] = useState(null);
    const [detailsSuccess, setDetailsSuccess] = useState(null);
    const [preferencesError, setPreferencesError] = useState(null);
    const [preferencesSuccess, setPreferencesSuccess] = useState(null);


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
            const {firstName, lastName, email, username} = data;
            
            // Else if login is successful, set some state variable values
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
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
    

    // Function to update user details
    async function updateDetails(event) {
        event.preventDefault();

        // Handling missing input
        if (firstName == "") {
            setDetailsError("Enter your first name");
            setDetailsSuccess("");
            return;
        }
        if (lastName == "") {
            setDetailsError("Enter your last name");
            setDetailsSuccess("");
            return;
        }
        if (email == "") {
            setDetailsError("Enter your email");
            setDetailsSuccess("");
            return;
        }
        setDetailsError("");

        // Updating the user's details
        try {
            const response = await fetch("http://localhost:3000" + "/updateUserDetails", {
                method: "PATCH",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                },
                body: 
                  JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                  })
              });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }

            let data = await response.json();
            const {updatedDetails} = data;
      
            // If update is successful
            if (updatedDetails) {
                setDetailsError("");
                setDetailsSuccess("Successfully updated your details");
            }
            // Else
            else {
                setDetailsSuccess("");
                setDetailsError("Failed to update your details");
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
                <div className = "col-10"> 

                    {/* Title */}
                    <div className = "fw-bold fs-3">
                        Settings
                    </div>


                    {/* Account Details */}
                    <div className = "mt-5">
                        <form onSubmit = {updateDetails}>
                            
                            <label className = "fw-bold fs-5"> Account Details </label>

                            {/* First name and last name */}
                            <div className = "row mt-3">
                                <div className = "form-group col-md-6 mb-3">
                                    <label htmlFor = "firstName"> First Name </label>
                                    <input value = {firstName} type = "text" className = "form-control mt-1" id = "firstName" onChange = {(event) => {setFirstName(event.target.value)}} required/>
                                </div>
                                <div className = "form-group col-md-6 mb-3">
                                    <label htmlFor = "lastName"> Last Name </label>
                                    <input value = {lastName} type = "text" className = "form-control mt-1" id = "lastName" onChange = {(event) => {setLastName(event.target.value)}} required/>
                                </div>
                            </div>

                            {/* Username */}
                            <div className = "form-group">
                                <label htmlFor = "username"> Username </label>
                                <input value = {username} className = "form-control mt-1" id = "username" disabled/>
                            </div>

                            {/* Email */}
                            <div className = "form-group mt-3">
                                <label htmlFor = "email"> Email </label>
                                <input value = {email} type = "text" className = "form-control mt-1" id = "email" onChange = {(event) => {setEmail(event.target.value)}} required/>
                            </div>

                            {/* Password */}
                            <div className = "form-group mt-3 mb-4">
                                <label htmlFor = "password"> Password </label>
                                <input type = "password" className = "form-control mt-1" id = "password" placeholder = "Enter a new password" onChange = {(event) => {setPassword(event.target.value)}} />
                            </div>

                            {/* Error pop-up */}
                            {detailsError && <div className = "text-danger mb-3"> {detailsError} </div>}

                            {/* Success pop-up */}
                            {detailsSuccess && <div className = "text-success mb-3"> {detailsSuccess} </div>}

                            <button type = "submit" className = "btn btn-primary mt-2 mb-3"> Save Changes </button>

                        </form>
                    </div>


                    {/* Preferences */}
                    <div className = "mt-5">
                        <form>
                            <label className = "fw-bold fs-5"> Preferences </label>
                        </form>
                    </div>

                </div>
            </div>
        </main>

      </>
    )
}
  
export default SettingsPage