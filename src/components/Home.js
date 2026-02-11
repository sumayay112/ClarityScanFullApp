import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
       
            <div className="home-container">
                <header className="hero">
                    <div className="hero-content">
                        <h1 className="logo-text">Clarity Scan</h1>
                        <p className="hero-tagline">
                            Combating bias with a diverse, inclusive approach.
                        </p>
                        <div className="cta-buttons">
                            <button
                                className="btn-primary"
                                onClick={() => navigate('/signup')}
                            >
                                Start Skin Scan
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={() => navigate('/login')}
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                </header>
            </div>

<div className="secondheadercontainer">
    <h1>How it works</h1>
    <h2>Profile: Select 1 clear photo in natural light</h2>
    <h2>Capture: Take a clear photo in natural light</h2>
</div>
            

<div className="thirdheadercontainer">
    <h1>Why Diversity in AI Matters</h1>
    <h3>Most AI datasets lack diverse skin tones, in particular, darker skin tones.</h3>
    <h3>Clarity Scan is working to change that.</h3>
    <h3>Most dermatology AI models are trained on Caucasian skin, where inflammation (like Eczema or Psoriasis) 
        appears as bright red. However, on darker skin tones. 
        these same conditions often present as purple, grayish, or dark brown</h3>
    <h3>In medical research, there is a representation gap. If a doctor uses an AI tool that hasn't been trained on diverse skin, 
        that tool becomes less effective for a large portion of the global population.</h3>
        <h3>ClarityScan aims to be an inclusive AI Tool. </h3>
        <h3>ClarityScan model is trained on a balanced dataset representing three distinct skin
            tone categories ; Light, Medium and Dark.
             </h3>

</div>
           
        </>
    );
}