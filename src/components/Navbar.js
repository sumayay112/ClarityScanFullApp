import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Left Side: Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/skin-tone">Skin Tone</Link></li>
              <li><Link to="/prediction">Prediction</Link></li>
              <li><Link to="/edit-profile">Edit Profile</Link></li>
              
              <li className="user-display">
                Hi, <strong>{user.email ? user.email.split('@')[0] : "User"}</strong>
              </li>
              
              <li>
                <button onClick={handleLogout} className="logout-button">Log Out</button>
              </li>
            </>
          )}
        </ul>

        {/* Right Side: Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src="/ClarityScan.png" alt="ClarityScan Logo" />
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;