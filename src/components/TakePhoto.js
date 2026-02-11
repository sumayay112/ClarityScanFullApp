import React, { useState } from 'react';
import './TakePhoto.css'; // Make sure you have this CSS file

export default function TakePhoto() {
  // 1. All logic (state) must be at the top inside the function
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
     
      const response = await fetch('https://your-api.com/predict', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
  };


  return (
    <div className="take-photo-page">
      <div className="photo-card">
        <h1>Take your Photo</h1>
        <p>Please upload a clear image of the affected area.</p>
        
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="file-input"
        />
        
        {file && (
          <div className="upload-section">
            <p>Selected: <strong>{file.name}</strong></p>
            <button 
              className="upload-btn" 
              onClick={handleUpload}
              disabled={status === 'uploading'}
            >
              {status === 'uploading' ? 'Uploading...' : 'Upload & Predict'}
            </button>
          </div>
        )}

        {status === 'success' && <p style={{color: 'green'}}>Upload successful!</p>}
        {status === 'error' && <p style={{color: 'red'}}>Upload failed. Try again.</p>}
      </div>
    </div>
  );
}