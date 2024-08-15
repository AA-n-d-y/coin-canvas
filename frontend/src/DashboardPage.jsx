// JSX file for the dashboard page

import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function DashboardPage() {  
    const navigate = useNavigate();

    // State variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [transactionData, setTransactionData] = useState([]);
    const [currencyFormat, setCurrencyFormat] = useState("");
    const [totalRemaining, setTotalRemaining] = useState(0.00);
    const [totalIncome, setTotalIncome] = useState(0.00);
    const [totalExpenses, setTotalExpenses] = useState(0.00);
    const [positiveBalance, setPositiveBalance] = useState(false);
    const [negativeBalance, setNegativeBalance] = useState(false);


    // Function for getting the user details
    async function getUserInformation() {
        // Finding the account
        try {
            const response = await fetch("http://localhost:3000" + "/getUser", {
            method: "GET",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            });

            // If the response status is unauthorized, navigate back to the login and destroy the token
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
            
            let data = await response.json();
            const {firstName, lastName} = data;
            
            // Else if login is successful, set some state variable values
            setFirstName(firstName);
            setLastName(lastName);
        }
        
        catch (error) {

        }
    }
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


            // Calculating totals
            let income = 0;
            let expenses = 0;
            transactions.forEach((transaction) => {
                if (transaction.type == "INCOME") {
                    income += parseFloat(transaction.amount);
                    setTotalIncome(income);
                }
                else if (transaction.type == "EXPENSE") {
                    expenses += parseFloat(transaction.amount);
                    setTotalExpenses(expenses);
                }
            });

            // If balance is negative
            if (totalIncome - totalExpenses < 0) {
                setPositiveBalance(false);
                setNegativeBalance(true);
                setTotalRemaining(Math.abs(totalIncome - totalExpenses).toFixed(2));
            }
            // Else
            else {
                setPositiveBalance(true);
                setNegativeBalance(false);
                setTotalRemaining((totalIncome - totalExpenses).toFixed(2));
            }
        }
        
        catch (error) {

        }
    }
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
        else {
            getUserInformation();
            getTransactionInformation("");
        }
    }, [])
    

    // Returning
    return (
      <>
        {/* Navigation bar */}
        <NavBar/>
        

        {/* Content */}
        <main className = "container" style = {{marginTop: "75px"}}>
            <div className = "row justify-content-center">
                {/* Welcome */}
                <div className = "col-10"> 
                    <div className = "fw-bold fs-3">
                        Welcome, <br></br> {firstName} {lastName}
                    </div>
                </div>

                {/* Remaining, Income, Expenses */}
                <div className = "col-10 d-flex flex-wrap flex-md-row d-grid justify-content-between mt-5">

                    {/* Remaining */}
                    <div className = "col-3 border border-2 rounded border-primary px-2 py-2" style = {{}}> 
                        <div> 
                            <h4> Remaining </h4>
                            <div className = "fs-4"> ⚖ </div>
                        </div>
                        <p className = "fs-4 fw-bold mt-3"> 
                            {positiveBalance && <p> {currencyFormat}{totalRemaining} </p>}
                            {negativeBalance && <p> -{currencyFormat}{totalRemaining} </p>}
                        </p>
                    </div>
                    
                    {/* Income */}
                    <div className = "col-3 border border-2 rounded border-primary px-2 py-2">
                        Income
                    </div>

                    {/* Expenses */}
                    <div className = "col-3 border border-2 rounded border-primary px-2 py-2">
                        Expenses
                    </div>

                </div>

            </div>
        </main>

      </>
    )
}
  
export default DashboardPage