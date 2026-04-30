import * as React from 'react';
import { useState } from 'react';
import './SkinTone.css';
import { useNavigate } from "react-router-dom";

export default function SkinTone() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [selectedTone, setSelectedTone] = useState(null);

  const handleNext = () => {
    if (selectedTone) {
      navigate("/prediction");
    } else {
      alert("Please select a skin tone before proceeding.");
    }
  };

  return (
    <div className="SkinTypeContainer">
      
      <div className="top-row">
        <div className="title-with-info">
          <h1>What is your Skin Tone?</h1>
          <span 
            className="info-trigger" 
            onClick={() => setShowInfo(!showInfo)}
            title="Click for more info"
          >
            ⓘ
          </span>
        </div>
        <div className="next">
          <button onClick={handleNext}>Next</button>
        </div>
      </div>

      <div className="skinbuttons">
        <button 
          className={`tone-btn ${selectedTone === 'light' ? 'active' : ''}`}
          onClick={() => setSelectedTone('light')}
        >
          Light Skin
        </button>
        <button 
          className={`tone-btn ${selectedTone === 'medium' ? 'active' : ''}`}
          onClick={() => setSelectedTone('medium')}
        >
          Medium Skin
        </button>
        <button 
          className={`tone-btn ${selectedTone === 'dark' ? 'active' : ''}`}
          onClick={() => setSelectedTone('dark')}
        >
          Dark Skin
        </button>
      </div>

      {showInfo && (
        <div className="skintoneinfo">
          <h1>Why we ask</h1>
          <h3>
            Skin conditions like Vitiligo present differently depending on melanin levels. 
            Specifying your skin tone helps our AI calibrate its detection patterns to ensure 
            higher accuracy and reduce bias for all skin types.
          </h3>
        </div>
      )}
    </div>
  );
}