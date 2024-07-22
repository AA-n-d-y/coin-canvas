// JSX file for the app

import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import TransactionsPage from './TransactionsPage.jsx';
import AddTransactions from './AddTransactions.jsx';
import SettingsPage from './SettingsPage.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    {/* Pages */}
      <Routes>
        <Route path = "/" element = {<DashboardPage/>} />
        <Route path = "/login" element = {<LoginPage/>} />
        <Route path = "/register" element = {<RegisterPage/>} />
        <Route path = "/dashboard" element = {<DashboardPage/>} />
        <Route path = "/transactions" element = {<TransactionsPage/>} />
        <Route path = "/addTransactions" element = {<AddTransactions/>} />
        <Route path = "/settings" element = {<SettingsPage/>} />
        <Route path = "/logout" element = {<LoginPage/>} />
        <Route path = "*" element = {<ErrorPage/>} />
      </Routes>
    </>
  )
}

export default App