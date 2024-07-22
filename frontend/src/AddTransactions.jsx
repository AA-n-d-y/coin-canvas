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
    

    // Function to add the transaction
    function addTransaction() {

    }


    // Returning
    return (
      <>
        {/* Navigation bar */}
        <NavBar/>
        

        {/* Content */}
        <main className = "container" style = {{marginTop: "75px"}}>
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
                        <div className ="form-group">
                                            
                            {/* Date */}
                            <label htmlFor = "calendar" className = "fw-bold mb-2"> Date </label>
                            <div className = "mb-4">
                                <input id = "calendar" type = "date" className = "form-control w-100" required/>
                            </div>

                            {/* Activity */}
                            <label htmlFor = "activity" className = "fw-bold mb-2"> Activity </label>
                            <div className = "mb-4">
                                <input id = "activity" type = "text" placeholder = "Enter an activity" className = "form-control w-100" required/>
                            </div>

                            {/* Amount */}
                            <label htmlFor = "amount" className = "fw-bold mb-2"> Amount </label>
                            <div className = "mb-4">
                                <input id = "amount" type = "text" placeholder = "Enter an amount" className = "form-control w-100" required/>
                            </div>

                            {/* Type */}
                            <label htmlFor = "typeOption" className = "fw-bold mb-2"> Type </label>
                            <select id = "typeOption" className = "form-select mb-4">
                                <option value = "income"> Income </option>
                                <option value = "expense"> Expense </option>
                            </select>

                            {/* Description */}
                            <label htmlFor = "description" className = "fw-bold mb-2"> Amount </label>
                            <div className = "mb-4">
                                <textarea id = "description" placeholder = "Enter a description (Optional)" className = "form-control w-100" rows = "4"></textarea>
                            </div>

                            {/* Button */}
                            <div>
                                <input type = "submit" value = "Add Transaction" className = "btn btn-primary w-100 mt-2 mb-5" onClick = {addTransaction}></input> 
                            </div> 

                        </div>
                    </form>
                </div>

            </div>
        </main>

      </>
    )
}
  
export default AddTransactions