import React, { useState } from 'react';
import './SignUp.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        if(e) e.preventDefault(); 
        
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Success! Account created.");
            navigate("/skin-tone"); 
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-page-beige">
            <div className="login-content-area">
                <div className="login-card-light">
                    <div className="blue-accent-bar"></div>
                    <h1>Create Account</h1>
                    <p className="subtitle">Join ClarityScan to begin your research journey.</p>
                    
                    <form onSubmit={handleSignUp}>
                        <div className="name-row">
                            <div className="input-field">
                                <label>First Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Jane" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="input-field">
                                <label>Last Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Doe" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="input-field">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                placeholder="name@email.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        
                        <div className="input-field">
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="terms-container">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">I agree to the research terms and conditions</label>
                        </div>
                        
                        <button type="submit" className="login-btn-blue">Create Account</button>
                    </form>

                    <div className="login-footer-light">
                        <p>Already have an account? <Link to="/login">Log In</Link></p>
                        <Link to="/" className="home-link">← Back to Home</Link>
                    </div>
                </div>
            </div>

            {/* SHARED RESEARCH FOOTER */}
            <footer className="home-footer">
                <p>&copy; 2026 ClarityScan Research Project. Developed for educational purposes.</p>
                <p className="disclaimer-text">
                    <strong>Notice:</strong> This model is a research prototype. It has demonstrated bias in 
                    accuracy across different skin tones and is NOT for clinical diagnosis.
                </p>
            </footer>
        </div>
    );
}