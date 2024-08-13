// JSX file for the editing transactions page

import NavBar from './NavBar';
import { useState, useEffect, act } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function EditTransaction() {  
    const navigate = useNavigate();

    // State variables
    const [userName, setUsername] = useState(null);
    const [date, setDate] = useState("");
    const [activity, setActivity] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [transactionError, setError] = useState(null);
    const [transactionSuccess, setSuccess] = useState(null);
    const [transactionID, setTransactionID] = useState(new URLSearchParams(useLocation().search).get("id"));
    const [typeIncome, setTypeIncome] = useState("");
    const [typeExpense, setTypeExpense] = useState("");
    const [typeValue, setTypeValue] = useState("");


    // Function for getting the transaction details
    async function getTransactionInformation() {
        // Finding the transaction
        try {
            const response = await fetch("http://localhost:3000" + "/getTransaction/" + transactionID, {
                method: "GET",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }

            // If the transaction is null, redirect back to transactions
            if (response.status === 404) {
                navigate("/transactions");
            }

            // Else
            let data = await response.json();
            const {tDate, tActivity, tAmount, tType, tDescription} = data;
            setDate(tDate);
            setActivity(tActivity);
            setAmount(tAmount);
            setType(tType.toLowerCase());
            setDescription(tDescription);

            if (tType == "INCOME") {
                setTypeIncome("EXPENSE");
                setTypeValue("income");
            }
            else {
                setTypeExpense("INCOME");
                setTypeValue("expense");
            }
        }
        
        catch (error) {

        }
    }
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
          navigate("/login");
        }
        else if (transactionID == null || transactionID == "") {
            navigate("/transactions");
        }
        else {
            getTransactionInformation();
        }
    }, [])


    // Function to edit the transaction
    async function updateTransaction(event) {
        event.preventDefault();

        // Handling missing input
        if (date == "") {
            setError("Select a date");
            setSuccess("");
            return;
        }
        if (activity == "") {
            setError("Enter an activity");
            setSuccess("");
            return;
        }
        if (amount == "" || isNaN(parseFloat(amount))) {
            setError("Enter a valid amount");
            setSuccess("");
            return;
        }
        if (type == "") {
            setError("Select a type");
            setSuccess("");
            return;
        }
        setError("");

        // Editing the transaction
        try {
            const response = await fetch("http://localhost:3000" + "/editTransaction", {
                method: "PATCH",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                },
                body: 
                  JSON.stringify({
                        transactionID: transactionID,
                        date: date,
                        activity: activity,
                        amount: parseFloat(amount).toFixed(2),
                        type: type,
                        description: description
                  })
              });

            // Making sure the user's login is still valid
            if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }

            let data = await response.json();
            const {editedTransaction} = data;
      
            // If creation is successful
            if (editedTransaction) {
                setError("");
                setSuccess("Successfully saved the transaction");
            }
            // Else
            else {
                setSuccess("");
                setError("Failed to save the transaction");
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
            <div className = "row justify-content-center">

                {/* Title */}
                <div className = "col-8 mb-5"> 
                    <div className = "fw-bold fs-3 text-center">
                        Edit Transaction
                    </div>
                </div>

                {/* Transaction */}
                <div className = "col-8">
                    <form>
                        <div className ="form-group">
                                            
                            {/* Date */}
                            <label htmlFor = "calendar" className = "fw-bold mb-2"> Date </label>
                            <div className = "mb-4">
                                <input id = "calendar" value = {date} type = "date" className = "form-control w-100" onChange = {(event) => {setDate(event.target.value)}} required/>
                            </div>

                            {/* Activity */}
                            <label htmlFor = "activity" className = "fw-bold mb-2"> Activity </label>
                            <div className = "mb-4">
                                <input id = "activity" value = {activity} type = "text" className = "form-control w-100" onChange = {(event) => {setActivity(event.target.value)}} required/>
                            </div>

                            {/* Amount */}
                            <label htmlFor = "amount" className = "fw-bold mb-2"> Amount </label>
                            <div className = "mb-4">
                                <input id = "amount" value = {amount} type = "number" className = "form-control w-100" onChange = {(event) => {setAmount(event.target.value)}} required/>
                            </div>

                            {/* Type */}
                            <label htmlFor = "typeOption" className = "fw-bold mb-2"> Type </label>
                            <select id = "typeOption" className = "form-select mb-4" onChange = {(event) => {setType(event.target.value)}}>
                                <option value = {typeValue}> {typeValue} </option>
                                {typeExpense && <option value = "income"> income </option>}
                                {typeIncome && <option value = "expense"> expense </option>}
                            </select>

                            {/* Description */}
                            <label htmlFor = "description" className = "fw-bold mb-2"> Description </label>
                            <div className = "mb-4">
                                <textarea id = "description" value = {description} className = "form-control w-100" rows = "4" onChange = {(event) => {setDescription(event.target.value)}}></textarea>
                            </div>

                            {/* Error pop-up */}
                            {transactionError && <div className = "text-danger mb-3"> {transactionError} </div>}

                            {/* Success pop-up */}
                            {transactionSuccess && <div className = "text-success mb-3"> {transactionSuccess} </div>}

                            {/* Button */}
                            <div>
                                <input type = "submit" value = "Save Transaction" className = "btn btn-primary w-100 mt-2 mb-5" onClick = {updateTransaction}></input> 
                            </div> 

                        </div>
                    </form>
                </div>

            </div>
        </main>

      </>
    )
}
  
export default EditTransaction