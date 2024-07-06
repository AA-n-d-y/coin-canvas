// JSX file for the registration page

import { NavLink } from 'react-router-dom';
import './App.css';

function RegisterPage() {  
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
                  <input type = "text" placeholder = "First Name" className = "form-control mb-3" required></input> 
                </div>
                <div>
                  <input type = "text" placeholder = "Last Name" className = "form-control mb-3" required></input> 
                </div>
                <div>
                  <input type = "text" placeholder = "Email" className = "form-control mb-3" required></input> 
                </div>
                <div>
                  <input type = "text" placeholder = "Username" className = "form-control mb-3" required></input> 
                </div>
                <div>
                  <input type = "password" placeholder = "Password" className = "form-control mb-3" required></input> 
                </div>
                <div>
                  <input type = "submit" value = "Sign up" className = "btn btn-primary w-100 mb-4"></input> 
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