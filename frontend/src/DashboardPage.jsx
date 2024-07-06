// JSX file for the dashboard page

import { NavLink } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';

function DashboardPage() {  
    return (
      <>
        {/* Navigation bar */}
        <NavBar/>
        

        {/* Content */}
        <main className = "container p-0" style = {{marginTop: "100px"}}>
            <div className = "row justify-content-center">
                {/* Welcome */}
                <div className = "col-10"> 
                    <div className = "fw-bold fs-3">
                        Welcome,
                    </div>
                </div>

                {/* Overview */}
                

            </div>
        </main>

      </>
    )
}
  
export default DashboardPage