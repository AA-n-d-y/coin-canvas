// JSX file for a page that does not exist

import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';

function ErrorPage() {  
    const navigate = useNavigate();

    // Checking for login
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
          navigate("/login");
        }
        else {

        }
    }, [])

    
    // Returning
    return (
      <>
        {/* Navigation bar */}
        <NavBar/>


        {/* Text */}
        <main className = "container" style = {{marginTop: "75px"}}>
            <div className = "row justify-content-center">
                <div className = "col-6"> 
                    <div className = "fw-bold text-center fs-3">
                        The page you were looking for does not exist
                    </div>
                </div>
            </div>
        </main>

      </>
    )
}
  
export default ErrorPage