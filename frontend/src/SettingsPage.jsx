// JSX file for the settings page

import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function SettingsPage() {  
    const navigate = useNavigate();

    // State variables
    const [firstName, setFirstName] = useState("");


    // Function for getting the user details
    async function getUserInformation() {
        // Finding the account
        try {
            
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
                {/* Title */}
                <div className = "col-10"> 
                    <div className = "fw-bold fs-3">
                        Settings
                    </div>
                </div>

                {/* Settings */}
                

            </div>
        </main>

      </>
    )
}
  
export default SettingsPage