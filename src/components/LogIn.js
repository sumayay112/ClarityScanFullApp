import * as React from 'react';
import './LogIn.css';
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate(); 

  const handleLogIn = (e) => {   
    e.preventDefault();
    navigate("/skin-tone");
  };

  return (                     
    <div className="LogInContainer">
      <h1>Clarity Scan</h1>
      <h2>Log in</h2>

      <label>Email</label>
      <input type="email" placeholder="Enter your email" />

      <div className="input-group">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
      </div>

      <button className="login-btn" onClick={handleLogIn}>
        Log In
      </button>
    </div>
  );
}