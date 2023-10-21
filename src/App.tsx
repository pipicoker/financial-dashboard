import React from 'react';
import './App.css';
import {Routes, Route,} from 'react-router-dom'
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Home from './Pages/Home';
// import Balances from './Pages/Balances';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/ForgotPassword" element={<ForgotPassword/>} />
      <Route path="/Home/*" element={<Home/>} />
      {/* <Route path="/Balances" element={<Balances />} /> */}
      </Routes>
          
    </div>
  );
}

export default App;
