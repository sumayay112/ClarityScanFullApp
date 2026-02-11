import React, { useState } from 'react';
import './SignUp.css';
// Line below is changed from './firebase' to '../firebase'
import { auth } from '../firebase'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        // This prevents the page from reloading when you click the button
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
        <div className="SignUpContainer">
            <h1>Clarity Scan</h1>
            <p>Track your skin. See changes. Gain insights</p>
            
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />

            <p>
                <input type="checkbox" /> I agree to terms and conditions
            </p>
            
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}