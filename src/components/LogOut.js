import React from 'react';
import { Link } from 'react-router-dom';
import './LogOut.css';

function LogOut() {
  return (
    <div className="logout-container">
      <h2>You have been logged out</h2>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default LogOut;