// JSX file for the navigation bar

import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function NavBar() {  
    const navigate = useNavigate();

    // Function for logging out
    function logout() {
        // Removing the token from local storage and redirecting the user back to the login page
        localStorage.removeItem("accessToken");
    }


    // Returning
    return (
        <>
            <header>
                <nav className = "navbar navbar-expand-md bg-primary fs-3">
                    <span className = "fw-normal text-light fs-3 px-4 py-2"> CoinCanvas </span>             
                    <NavLink to = "/dashboard" className = "btn btn-dark text-white fs-5 mx-2"> Dashboard </NavLink>
                    <NavLink to = "/transactions" className = "btn btn-dark text-white fs-5 mx-2"> Transactions </NavLink>
                    <NavLink to = "/settings" className = "btn btn-dark text-white fs-5 mx-2"> Settings </NavLink>
                    <NavLink to = "/logout" className = "btn btn-dark text-white fs-5 mx-2" onClick = {logout}> Sign out </NavLink>
                </nav>       
            </header> 
        </>
    )
}
  
export default NavBar