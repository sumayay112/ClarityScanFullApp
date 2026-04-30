import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Add this import
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // 2. Initialize navigate

  return (
    <div className="home-wrapper">
      <header className="hero-section">
        <div className="hero-content">
          <h1>ClarityScan</h1>
          <p>Investigating AI inclusivity in dermatological classification.</p>
          <div className="hero-buttons">
            {/* 3. Use navigate() instead of window.location */}
            <button className="main-btn" onClick={() => navigate('/login')}>
              Start Scan
            </button>
            <button className="secondary-btn" onClick={() => navigate('/resources')}>
              Education
            </button>
          </div>
        </div>
      </header>
      {/* ... rest of your code ... */}
    </div>
  );
};

export default Home;