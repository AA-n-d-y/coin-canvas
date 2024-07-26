// JSX file for the adding transactions page

import NavBar from './NavBar';
import { useState, useEffect, act } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';

function AddTransactions() {  
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

            // If the response was not ok or the username is null, navigate back to the login and destroy the token
            let data = await response.json();
            const {username} = data;
            if (response.status === 401 || username == null) {
                localStorage.clear();
                navigate("/login");
            }
            setUsername(username);
            
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
        }
    }, [])


    // Function to add the transaction
    async function addTransaction(event) {
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

        // Adding the transaction
        try {
            const response = await fetch("http://localhost:3000" + "/addTransaction", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: 
                  JSON.stringify({
                        username: userName,
                        date: date,
                        activity: activity,
                        amount: parseFloat(amount).toFixed(2),
                        type: type,
                        description: description
                  })
              });
            let data = await response.json();
            const {createdTransaction} = data;
      
            // If creation is successful
            if (createdTransaction) {
                setError("");
                setSuccess("Successfully added transaction");
            }
            // Else
            else {
                setSuccess("");
                setError("Failed to add transaction");
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
                                <input id = "calendar" value = {date} type = "date" className = "form-control w-100" onChange = {(event) => {setDate(event.target.value)}} required/>
                            </div>

                            {/* Activity */}
                            <label htmlFor = "activity" className = "fw-bold mb-2"> Activity </label>
                            <div className = "mb-4">
                                <input id = "activity" value = {activity} type = "text" placeholder = "Enter an activity" className = "form-control w-100" onChange = {(event) => {setActivity(event.target.value)}} required/>
                            </div>

                            {/* Amount */}
                            <label htmlFor = "amount" className = "fw-bold mb-2"> Amount </label>
                            <div className = "mb-4">
                                <input id = "amount" value = {amount} type = "number" placeholder = "Enter an amount" className = "form-control w-100" onChange = {(event) => {setAmount(event.target.value)}} required/>
                            </div>

                            {/* Type */}
                            <label htmlFor = "typeOption" className = "fw-bold mb-2"> Type </label>
                            <select id = "typeOption" value = {type} className = "form-select mb-4" onChange = {(event) => {setType(event.target.value)}}>
                                <option value = ""></option>
                                <option value = "income"> Income </option>
                                <option value = "expense"> Expense </option>
                            </select>

                            {/* Description */}
                            <label htmlFor = "description" className = "fw-bold mb-2"> Description </label>
                            <div className = "mb-4">
                                <textarea id = "description" value = {description} placeholder = "Enter a description (Optional)" className = "form-control w-100" rows = "4" onChange = {(event) => {setDescription(event.target.value)}}></textarea>
                            </div>

                            {/* Error pop-up */}
                            {transactionError && <div className = "text-danger mb-3"> {transactionError} </div>}

                            {/* Success pop-up */}
                            {transactionSuccess && <div className = "text-success mb-3"> {transactionSuccess} </div>}

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