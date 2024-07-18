// JSX file for the registration page

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function RegisterPage() {  
    const navigate = useNavigate();
    
    /// If the user is already logged in, redirect to the landing page
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

            // If the response is ok, navigate to the landing page
            if (response.status === 200) {
                navigate("/landing");
            }
            
        }
        
        catch (error) {

        }

    }
    getUserInformation();

    
    // State variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userError, setError] = useState(null);


    // Function to create account
    async function createAccount(event) {
      event.preventDefault();

      // Handling missing input
      if (firstName == "") {
        setError("Enter your first name");
        return;
      }
      if (lastName == "") {
        setError("Enter your last name");
        return;
      }
      if (email == "") {
        setError("Enter your email");
        return;
      }
      if (username == "") {
        setError("Enter a username");
        return;
      }
      if (password == "") {
        setError("Enter a password");
        return;
      }
      setError("");

      // Registering the account
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: 
            JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              username: username,
              password: password
            })
        });
        let data = await response.json();
        const {createdUser} = data;

        // If registration is successful, navigate to the login page
        if (createdUser) {
          navigate("/login");
        }
        // Else
        else {
          setError("Username already exists");
        }
      }
      
      catch (error) {

      }

      
    }


    // Returning
    return (
      <>
        {/* Navigation bar */}
        <header>
          <nav className = "navbar navbar-expand-md bg-primary fs-3">
              <span className = "fw-normal text-light fs-3 px-4 py-2"> CoinCanvas </span>
          </nav>       
        </header>        
        

        {/* Registry section */}
        <main className = "container p-0" style = {{marginTop: "100px"}}>
          <div className = "row justify-content-center">
            <div className = "col-xl-3 col-lg-3 col-md-4 col-sm-4 col-7">

              {/* Register text */}
              <div className = "h2 text-center form-label mb-4"> Register </div>

              {/* Registration details */}
              <form action = "/register" method = "POST">
                <div>
                  <input value = {firstName} type = "text" placeholder = "First Name" className = "form-control mb-3" onChange = {(event) => {setFirstName(event.target.value)}} required></input> 
                </div>

                <div>
                  <input value = {lastName} type = "text" placeholder = "Last Name" className = "form-control mb-3" onChange = {(event) => {setLastName(event.target.value)}} required></input> 
                </div>

                <div>
                  <input value = {email} type = "text" placeholder = "Email" className = "form-control mb-3" onChange = {(event) => {setEmail(event.target.value)}} required></input> 
                </div>

                <div>
                  <input value = {username} type = "text" placeholder = "Username" className = "form-control mb-3" onChange = {(event) => {setUsername(event.target.value)}} required></input> 
                </div>

                <div>
                  <input value = {password} type = "password" placeholder = "Password" className = "form-control mb-3" onChange = {(event) => {setPassword(event.target.value)}} required></input> 
                </div>
                
                {userError && <div className = "text-danger mb-3"> {userError} </div>}

                <div>
                  <input type = "submit" value = "Sign up" className = "btn btn-primary w-100 mb-4" onClick = {createAccount} ></input> 
                </div>                
              </form> 

              {/* Log in */}   
              <NavLink to = "/login" className = "nav-link text-center text-primary w-100" style = {{textDecoration: "underline"}}> Log in </NavLink> 

            </div>
          </div>
        </main>


      </>
    )
}
  
export default RegisterPage