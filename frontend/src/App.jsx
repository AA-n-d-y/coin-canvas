// JSX file for the app

import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import ErrorPage from './ErrorPage.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    {/* Pages */}
      <Routes>
        <Route path = "/" element = {<LandingPage/>} />
        <Route path = "/landing" element = {<LandingPage/>} />
        <Route path = "/login" element = {<LoginPage/>} />
        <Route path = "/register" element = {<RegisterPage/>} />
        <Route path = "/dashboard" element = {<DashboardPage/>} />
        <Route path = "/logout" element = {<LoginPage/>} />
        <Route path = "*" element = {<ErrorPage/>} />
      </Routes>
    </>
  )
}

export default App