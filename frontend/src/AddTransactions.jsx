// JSX file for the adding transactions page

import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function AddTransactions() {  
    const navigate = useNavigate();

    // State variables
    const [firstName, setFirstName] = useState("");


    // Checking if the user is logged in
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
          navigate("/login");
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
                <div className = "col-8 mb-5"> 
                    <div className = "fw-bold fs-3 text-center">
                        New Transaction
                    </div>
                </div>

                {/* Transaction */}
                <div className = "col-8">
                    <form>

                        {/* Income/Expense */}
                        <div className ="form-group">
                            <label for = "typeOption" className = "mb-2"> Type </label>
                            <select id = "typeOption" className = "form-control">
                                <option> Income </option>
                                <option> Expense</option>
                            </select>
                        </div>

                    </form>
                </div>

            </div>
        </main>

      </>
    )
}
  
export default AddTransactions