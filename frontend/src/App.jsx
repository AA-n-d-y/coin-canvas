// JSX file for the app

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import TransactionsPage from './TransactionsPage.jsx';
import AddTransactions from './AddTransactions.jsx';
import SettingsPage from './SettingsPage.jsx';
import EditTransaction from './EditTransaction.jsx';
import TasksPage from './TasksPage.jsx';
import AddTasks from './AddTasks.jsx';
import EditTask from './EditTask.jsx';

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
        <Route path = "/tasks" element = {<TasksPage/>} />
        <Route path = "/addTasks" element = {<AddTasks/>} />
        <Route path = "/editTask" element = {<EditTask/>} />
        <Route path = "/transactions" element = {<TransactionsPage/>} />
        <Route path = "/addTransactions" element = {<AddTransactions/>} />
        <Route path = "/editTransaction" element = {<EditTransaction/>} />
        <Route path = "/settings" element = {<SettingsPage/>} />
        <Route path = "/logout" element = {<LoginPage/>} />
        <Route path = "*" element = {<ErrorPage/>} />
      </Routes>
    </>
  )
}

export default App