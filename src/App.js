import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Firebase Import
import './firebase';

// Component Imports
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import TakePhoto from './components/TakePhoto';
import Prediction from './components/Prediction';
import SkinTone from './components/SkinTone';
import Navbar from './components/Navbar';
import EditProfile from './components/EditProfile';
import LogOut from './components/LogOut';
import Resources from './components/Resources'; // 1. Added this import

function App() {
  return (
    <Router>
      <Navbar />

      <div className="content-container">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* Public Educational Page */}
          <Route path="/resources" element={<Resources />} /> {/* 2. Added this route */}
          
          {/* Authentication Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/log-out" element={<LogOut />} />
          
          {/* Core App Features */}
          <Route path="/take-photo" element={<TakePhoto />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/skin-tone" element={<SkinTone />} />
          
          {/* User Settings */}
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;