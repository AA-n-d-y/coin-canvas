// JSX file for the login page

import { useState, useEffect } from 'react';
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import './App.css';

function LoginPage() {  
    const navigate = useNavigate();

    /// If the user is already logged in, redirect to the dashboard
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

            // If the response is ok, navigate to the dashboard
            if (response.status === 200) {
                navigate("/dashboard");
            }
            
        }
        
        catch (error) {

        }

    }
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {

        }
        else {
            getUserInformation();
        }
    }, [])


    // State variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userError, setError] = useState(null);
    

    // Function to login
    async function login(event) {
      event.preventDefault();

      // Handling missing input
      if (username == "") {
        setError("Enter your username");
        return;
      }
      if (password == "") {
        setError("Enter your password");
        return;
      }
      setError("");

      // Finding the account
      try {
        const response = await fetch("http://localhost:3000" + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: 
            JSON.stringify({
              username: username,
              password: password
            })
        });
        let data = await response.json();
        const {loggedIn, user, accessToken} = data;

        // If login is successful, set the JWT to local storage and navigate to the dashboard
        if (loggedIn) {
          localStorage.setItem("accessToken", accessToken);
          navigate("/dashboard");
        }
        // Else
        else {
          setError("Username or password is incorrect");
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
              <span className = "fw-bold text-light fs-3 px-4 py-2"> CoinCanvas </span>
          </nav>       
        </header> 
        

        {/* Login section */}
        <main className = "container" style = {{marginTop: "75px"}}>
          <div className = "row justify-content-center">
            <div className = "col-xl-3 col-lg-3 col-md-4 col-sm-4 col-7">

              {/* Login text */}
              <div className = "h2 text-center form-label mb-4"> Login </div>

              {/* Login details */}
              <form>
                <div>
                  <input value = {username} type = "text" placeholder = "Username" className = "form-control mb-3" onChange = {(event) => {setUsername(event.target.value)}} required></input> 
                </div>

                <div>
                <input value = {password} type = "password" placeholder = "Password" className = "form-control mb-3" onChange = {(event) => {setPassword(event.target.value)}} required></input> 
                </div>

                {/* Error pop-up */}
                {userError && <div className = "text-danger mb-3"> {userError} </div>}

                <div>
                  <input type = "submit" value = "Sign in" className = "btn btn-primary w-100 mb-4" onClick = {login} ></input> 
                </div>                
              </form> 

              {/* Register */}   
              <NavLink to = "/register" className = "nav-link text-center text-primary mb-5 w-100" style = {{textDecoration: "underline"}}> Register </NavLink> 

            </div>
          </div>
        </main>


      </>
    )
}
  
export default LoginPage