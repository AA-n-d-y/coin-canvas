// JSX file for the login page

import { NavLink } from 'react-router-dom';
import './App.css';

function LoginPage() {  
    return (
      <>
        {/* Navigation bar */}
        <header>
          <nav className = "navbar navbar-expand-md bg-primary fs-3">
              <span className = "fw-normal text-light fs-3 px-4 py-2"> CoinCanvas </span>
          </nav>       
        </header> 
        

        {/* Login section */}
        <main className = "container p-0" style = {{marginTop: "100px"}}>
          <div className = "row justify-content-center">
            <div className = "col-xl-3 col-lg-3 col-md-4 col-sm-4 col-7">

              {/* Login text */}
              <div className = "h2 text-center form-label mb-4"> Login </div>

              {/* Login details */}
              <form action = "/login" method = "POST">
                <div>
                  <input type = "text" placeholder = "Username" className = "form-control mb-3" required></input> 
                </div>
                <div>
                  <input type = "password" placeholder = "Password" className = "form-control mb-3" required></input> 
                </div>
                <div>
                  <input type = "submit" value = "Sign in" className = "btn btn-primary w-100 mb-4"></input> 
                </div>                
              </form> 

              {/* Register */}   
              <NavLink to = "/register" className = "nav-link text-center text-primary w-100" style = {{textDecoration: "underline"}}> Register </NavLink> 

            </div>
          </div>
        </main>


      </>
    )
}
  
export default LoginPage