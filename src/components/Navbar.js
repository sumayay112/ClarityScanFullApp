import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ClarityScan</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/skin-tone">Skin Tone</Link></li>
        <li><Link to="/take-photo">Take Photo</Link></li>
        <li><Link to="/prediction">Prediction</Link></li>
        <li><Link to="/view-previous-images">View Previous Images</Link></li>
        <li><Link to="/edit-profile">Edit Profile</Link></li>
        <li><Link to="/log-out">Log Out</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;