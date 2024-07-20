// JSX file for a page that does not exist

import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function ErrorPage() {  
    const navigate = useNavigate();

    // Function for logging out
    function logout() {
        // Removing the token from local storage and redirecting the user back to the login page
        localStorage.removeItem("accessToken");
    }

    
    // Returning
    return (
      <>
        {/* Navigation bar */}
        <header>
          <nav className = "navbar navbar-expand-md bg-primary fs-3">
              <span className = "fw-bold text-light fs-3 px-4 py-2"> CoinCanvas </span>
              <NavLink to = "/dashboard" className = "btn border-3 text-white fs-5 mx-1"> Dashboard </NavLink>
              <NavLink to = "/logout" className = "btn border-3 text-white fs-5 mx-1" onClick = {logout}> Sign out </NavLink>
          </nav>       
        </header>   


        {/* Text */}
        <main className = "container p-0" style = {{marginTop: "100px"}}>
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