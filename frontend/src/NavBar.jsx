// JSX file for the navigation bar

import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function NavBar() {  
    const navigate = useNavigate();

    // Function for logging out
    function logout() {
        // Removing the token from local storage and redirecting the user back to the login page
        localStorage.removeItem("accessToken");
        navigate("/login");
    }


    // Returning
    return (
        <>
            <header>
                <nav className = "navbar navbar-expand-md bg-primary fs-3">
                    <span className = "fw-normal text-light fs-3 px-4 py-2"> CoinCanvas </span>
                    <form action = "/dashboard" method = "GET">
                        <input type = "submit" value = "Dashboard" class = "btn btn-dark text-white fs-5 mx-2"></input> 
                    </form> 
                    <form action = "/transactions" method = "GET">
                        <input type = "submit" value = "Transactions" class = "btn btn-dark text-white fs-5 mx-2"></input> 
                    </form> 
                    <form action = "/settings" method = "GET">
                        <input type = "submit" value = "Settings" class = "btn btn-dark text-white fs-5 mx-2"></input> 
                    </form> 
                    <form>
                        <input type = "submit" value = "Sign out" class = "btn btn-dark text-white fs-5 mx-2" onClick = {logout}></input> 
                    </form>               
                </nav>       
            </header> 
        </>
    )
}
  
export default NavBar