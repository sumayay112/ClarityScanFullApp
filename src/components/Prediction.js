import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Prediction.css";

const Prediction = () => {
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // --- CONNECTED TO YOUR LIVE RENDER BACKEND ---
  const BACKEND_URL = "https://clarity-backend-t2kw.onrender.com/predict";

  const handleUpload = async (file) => {
    if (!file) return;

    // Create a local preview of the image for the user
    setImagePreview(URL.createObjectURL(file));
    
    setLoading(true);
    setResult("");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Sending the image to the Python Backend on Render
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("The AI server is starting up. Please wait 30 seconds and try again.");
      }

      const data = await res.json();
      
      if (data.status === "failed") {
        throw new Error(data.error || "Analysis failed.");
      }

      // Update the screen with results from the Backend
      setResult(data.prediction);
      setConfidence(data.confidence);

    } catch (err) {
      console.error("Prediction Error:", err);
      setError(err.message || "Unable to connect to the AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-page-beige">
      <div className="prediction-card-light">
        <div className="blue-accent-bar"></div>
        <h1>Analyse Image</h1>
        <p className="subtitle">Upload a clear photo for AI classification.</p>
        
        <div className="upload-section">
          <label className="custom-file-upload">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files[0])}
              disabled={loading}
            />
            {loading ? "Analysing..." : "Choose Image"}
          </label>
        </div>

        {imagePreview && (
          <div className="preview-container">
            <img src={imagePreview} alt="Selected Area" className="scan-preview" />
          </div>
        )}

        {loading && (
          <p className="status-msg">
            Processing image... (The first scan may take a minute to wake up the server).
          </p>
        )}
        
        {error && <p className="error-text">{error}</p>}
        
        {result && !loading && (
          <div className="result-container">
            <div className="result-header">
              <h3>Classification: <span>{result}</span></h3>
              <p className="confidence-text">Confidence: {confidence}%</p>
            </div>

            <div className="meter-bar">
              <div className="meter-fill" style={{ width: `${confidence}%` }}></div>
            </div>
            
            <div className="privacy-badge"> 
              Analysis complete. Your image has not been stored.
            </div>

            <p className="disclaimer">
              Note: This is an AI tool for educational purposes and is not a medical diagnosis.
            </p>

            <button 
              className="next-btn-green" 
              onClick={() => navigate('/resources')}
            >
              View Educational Resources →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;