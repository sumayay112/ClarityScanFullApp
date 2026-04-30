import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <header className="hero-section">
        <div className="hero-content">
          <h1>ClarityScan</h1>
          <p>Investigating AI inclusivity in dermatological classification.</p>
          <div className="hero-buttons">
            <button className="main-btn" onClick={() => navigate('/login')}>
              Start Scan
            </button>
            <button className="secondary-btn" onClick={() => navigate('/resources')}>
              Education
            </button>
          </div>
        </div>
      </header>

      <section className="research-impact">
        <div className="impact-container">
          <div className="impact-header">
            <span className="tagline">Research & Development</span>
            <h2>Addressing the Representation Gap</h2>
            <p className="impact-description">
              Analysing algorithmic bias to create a more equitable future for digital health.
            </p>
          </div>
          
          <div className="impact-grid">
            <div className="impact-card">
              <div className="indicator"></div>
              <h3>The Problem</h3>
              <p>
                Most AI datasets lack diverse skin tones. Models trained primarily on 
                lighter skin often fail to recognize how conditions like Eczema present on darker tones.
              </p>
            </div>
            <div className="impact-card">
              <div className="indicator"></div>
              <h3>The Gap</h3>
              <p>
                When AI tools are not trained on diverse skin, accuracy drops for the 
                global population. ClarityScan documents these disparities.
              </p>
            </div>
            <div className="impact-card solution-highlight">
              <div className="indicator active"></div>
              <h3>The ResNet-18 Study</h3>
              <p>
                Using a ResNet-18 model trained on a diverse dataset to test the 
                limits of AI in recognizing diverse dermatological features.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2026 ClarityScan Research Project. Developed for educational purposes.</p>
        <p className="disclaimer-text">
          <strong>Notice:</strong> This model is a research prototype. It has demonstrated bias in 
          accuracy across different skin tones and is NOT for clinical diagnosis.
        </p>
      </footer>
    </div>
  );
};

export default Home;