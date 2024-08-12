// JSX file for the transactions page

import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function TransactionsPage() {  
    const navigate = useNavigate();

    // State variables
    const [transactionData, setTransactionData] = useState([]);
    const [transactionFilter, setTransactionFilter] = useState("");
    const [currencyFormat, setCurrencyFormat] = useState("");


    // Function for getting the transaction details
    async function getTransactionInformation(transactionFilter) {
        // Finding the transactions
        try {
            const response = await fetch("http://localhost:3000" + "/getTransactions", {
                method: "POST",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                },
                body: 
                  JSON.stringify({
                        transactionFilter: transactionFilter
                  })
            });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }

            let data = await response.json();
            const {transactions, currency} = data;
            setTransactionData(transactions);
            setCurrencyFormat(currency);
        }
        
        catch (error) {

        }
    }
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
        else {
            getTransactionInformation(transactionFilter);
        }
    }, [transactionFilter])


    // Function to delete a transaction
    async function deleteTransaction(transactionID) {
        // Deleting the transaction
        try {
            const response = await fetch("http://localhost:3000" + "/deleteTransaction", {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                },
                body: 
                  JSON.stringify({
                        transactionID: transactionID
                  })
              });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }

        catch (error) {

        }
    }


    // Function to delete all transactions
    async function deleteTransactions() {
        // Deleting the transaction
        try {
            const response = await fetch("http://localhost:3000" + "/deleteTransactions", {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken")
                }
              });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }

        catch (error) {

        }
    }
    

    // Returning
    return (
      <>
        {/* Navigation bar */}
        <NavBar/>
        

        {/* Content */}
        <main className = "container" style = {{marginTop: "75px"}}>
            
            {/* Content beginning */}
            <div className = "row d-flex justify-content-center">

                {/* Content header */}
                <span className = "col-8 fw-bold fs-3 mb-1">
                    Transactions History
                </span>

                {/* Transactions */}
                <NavLink to = "/addTransactions" className = "col-md-2 col-8 btn bg-dark text-light fs-5 mx-1 mb-3 py-2"> + Add new </NavLink> 

            </div>

            {/* Transactions section */}
            <div className = "row justify-content-center mt-5 mb-5">
                <div className = "col-10">

                    {/* Search bar */}
                    <input value = {transactionFilter} className = "form-control w-100 mb-2" placeholder = "Filter by activity..." 
                        onChange = {(event) => {
                            setTransactionFilter(event.target.value);
                        }} 
                    />


                    {/* Transactions table */}
                    <div className = "table-responsive-sm border-bottom border-3 border-dark" style = {{maxHeight: "80vh", overflowX: "auto", overflowY: "auto"}}>
                        <table className = "table">
                            <thead className = "table-dark">
                                <tr>
                                    <th scope = "col"> Date </th>
                                    <th scope = "col"> Activity </th>
                                    <th scope = "col"> Amount </th>
                                    <th scope = "col"> Type </th>
                                    <th scope = "col"> Description </th>
                                    <th scope = "col"> </th>
                                    <th scope = "col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionData.map((transaction, index) => (
                                    <tr key = {transaction._id}>
                                        {/* Date */}
                                        <th scope="row" className = "py-3"> {transaction.date} </th>

                                        {/* Activity */}
                                        <td className = "py-3"> {transaction.activity} </td>

                                        {/* Amount */}
                                        <td className = "py-3"> 
                                            <span className = "border border-2 border-white text-primary px-3 py-2" style = {{ backgroundColor: "#e0edfe", borderRadius: "20px"}}> 
                                                {currencyFormat}{transaction.amount} 
                                            </span>
                                        </td>

                                        {/* Type */}
                                        <td className = "py-3"> 
                                            <span className = "fw-bold" style = {{ color: transaction.colour }}> {transaction.type} </span>
                                        </td>

                                        {/* Description */}
                                        <td className = "py-3"> {transaction.description} </td>

                                        {/* Edit */}  
                                        <td> 
                                            <input type = "submit" value = "EDIT" className = "border border-2 border-primary fw-bold px-3 py-2" 
                                                style = {{ color: "#2c50fe", backgroundColor: "#dae0fb", borderRadius: "20px"}}
                                                onClick = 
                                                    {() => {
                                                        navigate("/editTransaction?id=" + transaction._id);
                                                    }}
                                            />
                                        </td>

                                        {/* Delete */}  
                                        <td>
                                            <form action = "/transactions" method = "GET">
                                                <input type = "submit" value = "DELETE" className = "border border-2 border-danger text-danger fw-bold px-3 py-2" 
                                                    style = {{ backgroundColor: "#ffabab", borderRadius: "20px"}} 
                                                    onClick = 
                                                        {() => {
                                                            deleteTransaction(transaction._id);
                                                        }}
                                                > 
                                                </input>
                                            </form>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>


                    {/* Transaction Total and Delete All Button*/}
                    <form action = "/transactions" method = "GET">
                        <span className = "d-flex justify-content-between mt-4 mb-5">
                            <span className = "fw-bold fs-5 py-2"> Transactions: {transactionData.length} </span>
                            <input type = "submit" value = "DELETE ALL" className = "btn border border-3 border-dark text-danger fw-bold px-3 py-2" 
                                style = {{ backgroundColor: "#ffabab"}} 
                                onClick = 
                                    {() => {
                                        deleteTransactions();
                                    }}
                            > 
                            </input>
                        </span>
                    </form>

                </div>
            </div>

        </main>

      </>
    )
}
  
export default TransactionsPage