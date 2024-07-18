// JSX file for the landing page

import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function LandingPage() {  
    const navigate = useNavigate();

    // If the user is not logged in, redirect to the login page
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
          navigate("/login");
        }
    }, []);


    // Returning
    return (
        <>
            <NavBar/>
            LANDING PAGE
        </>
    )
}
  
export default LandingPage