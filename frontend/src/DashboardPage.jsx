// JSX file for the dashboard page

import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SummaryChart from './SummaryChart';
import ActivitiesChart from './ActivitiesChart';

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
    const [zeroExpenses, setZeroExpenses] = useState(false);
    const [normalExpenses, setNormalExpenses] = useState(false);
    const [amountsArray, setAmountsArray] = useState([]);
    const [datesArray, setDatesArray] = useState([]);
    const [activitiesAmountsArray, setActivitiesAmountsArray] = useState([]);
    const [activitiesArray, setActivitiesArray] = useState([]);


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
            const balanceMap = new Map();
            const activitiesMap = new Map();
            transactions.reverse();

            transactions.forEach((transaction) => {
                if (transaction.type == "INCOME") {
                    income += parseFloat(transaction.amount);

                    // Inserting the activities and amounts into the activities map
                    if (activitiesMap.has(transaction.activity)) {
                        activitiesMap.set(transaction.activity, activitiesMap.get(transaction.activity) + parseFloat(transaction.amount));
                    }
                    else {
                        activitiesMap.set(transaction.activity, parseFloat(transaction.amount));
                    }
                }
                else if (transaction.type == "EXPENSE") {
                    expenses += parseFloat(transaction.amount);

                    // Inserting the activities and amounts into the activities map
                    if (activitiesMap.has(transaction.activity)) {
                        activitiesMap.set(transaction.activity, activitiesMap.get(transaction.activity) - parseFloat(transaction.amount));
                    }
                    else {
                        activitiesMap.set(transaction.activity, parseFloat(transaction.amount) * -1);
                    }
                }

                // Inserting the dates and amounts into the balance map
                balanceMap.set(transaction.date, income - expenses);
            });

            // Formatting the totals
            setTotalIncome(income.toFixed(2));
            setTotalExpenses(expenses.toFixed(2));
            if (expenses == 0) {
                setZeroExpenses(true);
                setNormalExpenses(false);
            }
            else {
                setZeroExpenses(false);
                setNormalExpenses(true);
            }

            // If balance is negative
            if (income - expenses < 0) {
                setPositiveBalance(false);
                setNegativeBalance(true);
                setTotalRemaining(Math.abs(income - expenses).toFixed(2));
            }
            // Else
            else {
                setPositiveBalance(true);
                setNegativeBalance(false);
                setTotalRemaining((income - expenses).toFixed(2));
            }
            

            /// Inserting the key value pairs into the arrays

            let dArray = [];
            let amtArray = [];
            for (const [date, amount] of balanceMap) {
                dArray.push(date);
                amtArray.push(amount.toFixed(2));
            }
            setDatesArray(dArray);
            setAmountsArray(amtArray);

            let actArray = [];
            let actAmtArray = [];
            for (const [activity, amount] of activitiesMap) {
                actArray.push(activity);
                actAmtArray.push(amount.toFixed(2));
            }
            setActivitiesArray(actArray);
            setActivitiesAmountsArray(actAmtArray);
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
                <div className = "col-10 mb-4"> 
                    <div className = "fw-bold fs-3" style = {{ overflowWrap: 'break-word', wordWrap: 'break-word' }}>
                        Welcome, <br></br> {firstName} {lastName}
                    </div>
                </div>


                {/* Balance, Income, Expenses */}
                <div className = "col-12 d-flex flex-wrap flex-md-row d-grid justify-content-md-around justify-content-center mt-5 mb-5">

                    {/* Balance */}
                    <div className = "col-md-3 col-10 border border-5 rounded border-primary px-3 py-2 mb-5" style = {{ backgroundColor: "#d0e2ff", overflowWrap: 'break-word', wordWrap: 'break-word' }}> 
                        <div className = "d-flex flex-wrap justify-content-between"> 
                            <h4 className = "mt-2"> Balance </h4>
                            <div className = "fs-1"> 🏦 </div>
                        </div>
                        <div className = "fs-4 fw-bold mt-3"> 
                            {positiveBalance && <p> {currencyFormat}{totalRemaining} </p>}
                            {negativeBalance && <p> -{currencyFormat}{totalRemaining} </p>}
                        </div>
                    </div>
                    
                    {/* Income */}
                    <div className = "col-md-3 col-10 border border-5 rounded border-success px-3 py-2 mb-5" style = {{ backgroundColor: "#99fed0", overflowWrap: 'break-word', wordWrap: 'break-word' }}> 
                        <div className = "d-flex flex-wrap justify-content-between"> 
                            <h4 className = "mt-2"> Income </h4>
                            <div className = "fs-1"> ⤴️ </div>
                        </div>
                        <div className = "fs-4 fw-bold mt-3"> 
                            <p> {currencyFormat}{totalIncome} </p>
                        </div>
                    </div>

                    {/* Expenses */}
                    <div className = "col-md-3 col-10 border border-5 rounded border-danger px-3 py-2 mb-5" style = {{ backgroundColor: "#ffafaf", overflowWrap: 'break-word', wordWrap: 'break-word' }}> 
                        <div className = "d-flex flex-wrap justify-content-between"> 
                            <h4 className = "mt-2"> Expenses </h4>
                            <div className = "fs-1"> ⤵️ </div>
                        </div>
                        <div className = "fs-4 fw-bold mt-3"> 
                            {zeroExpenses && <p> {currencyFormat}{totalExpenses} </p>}
                            {normalExpenses && <p> -{currencyFormat}{totalExpenses} </p>}
                        </div>
                    </div>

                </div>


                {/* Charts */}
                <div className = "col-12 d-flex flex-wrap justify-content-md-between justify-content-center mt-3 mb-5">
                    <div className = "col-md-7 col-10 mb-5 border border-4 rounded border-dark px-3 py-3">
                        <h5 className = "text-center mb-4"> Balances </h5>
                        <SummaryChart amountsArray = {amountsArray} datesArray = {datesArray} currencyFormat = {currencyFormat}/>
                    </div>
                    <div className = "col-md-4 col-10 mb-5 border border-4 rounded border-dark px-3 py-3">
                        <h5 className = "text-center mb-4"> Activities </h5>
                        <ActivitiesChart activitiesAmountsArray = {activitiesAmountsArray} activitiesArray = {activitiesArray} currencyFormat = {currencyFormat}/>
                    </div>
                </div>

            </div>
        </main>

      </>
    )
}
  
export default DashboardPage