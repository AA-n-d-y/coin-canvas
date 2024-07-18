// JSX file for a page that does not exist

import { NavLink } from 'react-router-dom';
import './App.css';

function ErrorPage() {  
    return (
      <>
        {/* Navigation bar */}
        <header>
          <nav className = "navbar navbar-expand-md bg-primary fs-3">
              <span className = "fw-normal text-light fs-3 px-4 py-2"> CoinCanvas </span>
              <form action = "/dashboard" method = "GET">
                <input type = "submit" value = "Dashboard" class = "btn btn-dark text-white fs-5 mx-2"></input> 
              </form> 
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