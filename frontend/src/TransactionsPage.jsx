// JSX file for the dashboard page

import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function TransactionsPage() {  
    const navigate = useNavigate();

    // State variables
    const [firstName, setFirstName] = useState("");


    // Function for getting the user details
    async function getTransactionInformation() {
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
            getTransactionInformation();
        }
    }, [])
    

    // Returning
    return (
      <>
        {/* Navigation bar */}
        <NavBar/>
        

        {/* Content */}
        <main className = "container" style = {{marginTop: "100px"}}>
            
            {/* Content beginning */}
            <div className = "row d-flex justify-content-center">

                {/* Content header */}
                <span className = "col-8 fw-bold fs-3 mb-1">
                    Transactions History
                </span>

                {/* Transactions */}
                <NavLink to = "/addTransactions" className = "col-md-2 col-8 btn bg-dark text-light fs-5 mx-1 mb-3"> + Add new </NavLink> 

            </div>

            {/* Transactions table */}
            <div className = "row justify-content-center mt-5">
                <div className = "col-10">
                    <div class="table-responsive-sm">
                        <table class="table">
                            <thead class="table-dark">
                                <tr>
                                    <th scope = "col"> Date </th>
                                    <th scope = "col"> Activity </th>
                                    <th scope = "col"> Amount </th>
                                    <th scope = "col"> Type </th>
                                    <th scope = "col"> Description </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" className = "py-3"> Jul 20, 2024 </th>
                                    <td className = "py-3"> Compensation </td>
                                    <td className = "py-3"> 
                                        <span className = "rounded border border-2 border-primary text-primary px-2 py-1"> $1000 </span>
                                    </td>
                                    <td className = "py-3"> Income </td>
                                    <td className = "py-3"> Received payment </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        </main>

      </>
    )
}
  
export default TransactionsPage