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


 const handleUpload = async (file) => {
   if (!file) return;
  
   // Create preview
   setImagePreview(URL.createObjectURL(file));
  
   setLoading(true);
   setResult("");
   setError(null);


   try {
     const formData = new FormData();
     formData.append("file", file);


     //  FastAPI endpoint
     const res = await fetch("http://127.0.0.1:8000/predict", {
       method: "POST",
       body: formData,
     });


     if (!res.ok) throw new Error("FastAPI connection failed");
    
     const data = await res.json();
    
     setResult(data.prediction);
     setConfidence(data.confidence);


   } catch (err) {
     console.error("Prediction Error:", err);
     setError("Unable to connect to the AI server.");
   } finally {
     setLoading(false);
   }
 };


 return (
   <div className="prediction-page-beige">
     <div className="prediction-card-light">
       <div className="blue-accent-bar"></div>
       <h1>Analyse Image</h1>
       <p className="subtitle">Upload a clear photo of the skin area for classification.</p>
      
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


       {loading && <p className="status-msg">Analysing image for classification..</p>}
      
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
          
           <div className="privacy-badge"> Clarity Scan complete. Your image has been discarded.</div>


           {/* --- button --- */}
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
