import React from 'react';
import './Resources.css';

const Resources = () => {
  
  const resourceList = [
    {
      category: "Medical Guidance",
      links: [
        { title: "NHS: Skin Conditions", url: "https://www.nhs.uk/conditions/", desc: "A comprehensive A-Z guide of common skin issues and treatments." },
        { title: "Mayo Clinic Dermatology", url: "https://www.mayoclinic.org/departments-centers/dermatology", desc: "World-class information on skin diseases and professional care." }
      ]
    },
    {
      category: "Inclusive Dermatology",
      // Important section: providing resources for darker skin tones to address the project's focus on AI bias.
      links: [
        { title: "Skin of Color Society", url: "https://skinofcolorsociety.org/", desc: "Resources specifically for dermatology in melanin-rich skin tones." },
        { title: "Black Skin Matters", url: "https://www.blackskinmatters.com/", desc: "A visual database focused on skin conditions on darker skin." }
      ]
    },
    {
      category: "Technical & AI Research",
      links: [
        { 
          // Link to the specific documentation for the model used in the backend (TensorFlow ResNet-18).
          title: "TensorFlow Hub: ResNet-18 Implementation", 
          url: "https://www.tensorflow.org/api_docs/python/tf/keras/applications/resnet", 
          desc: "Technical documentation for the ResNet-18 architecture implemented via Keras for feature extraction and classification in ClarityScan."
        },
        { 
          // Added to provide transparency on why AI bias happens in medical imaging.
          title: "Understanding AI Bias", 
          url: "https://www.ibm.com/topics/ai-bias", 
          desc: "Educational overview of how algorithmic bias happens and how to fix it." 
        }
      ]
    }
  ]; 

  return (
    <div className="resources-page">
      {/* Header section for page introduction */}
      <header className="resources-header">
        <h1>Educational Resources</h1>
        <p>Your health is a priority. Use these verified resources to learn more about skin health and professional care.</p>
      </header>

      {/* Main grid to display categories */}
      <div className="resources-grid">
        {/* Mapping through categories first */}
        {resourceList.map((section, index) => (
          <div key={index} className="resource-section">
            <h2 className="section-title">{section.category}</h2>
            
            <div className="card-container">
              {/* Nested map to generate individual resource cards for each category */}
              {section.links.map((link, i) => (
                <div 
                  key={i} 
                  className="resource-card" 
                  onClick={() => window.open(link.url, '_blank')} // Opens link in a new tab for better UX
                >
                  <h3>{link.title}</h3>
                  <p>{link.desc}</p>
                  <span className="visit-link">Visit Site →</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
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

export default Resources;