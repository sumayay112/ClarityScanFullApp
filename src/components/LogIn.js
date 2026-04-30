import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import './LogIn.css';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (userDoc.exists() && userDoc.data().skinTone) {
        navigate('/prediction');
      } else {
        navigate('/skin-tone');
      }
    } catch (err) {
      setError("Invalid login credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-beige">
      <div className="login-content-area">
        <div className="login-card-light">
          <div className="blue-accent-bar"></div>
          <h1>Welcome Back</h1>
          <p className="subtitle">Login to your ClarityScan account</p>

          {error && <div className="error-text">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="input-field">
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="login-btn-blue" disabled={loading}>
              {loading ? "Verifying..." : "Log In"}
            </button>
          </form>

          <div className="login-footer-links">
            <p>New to research? <Link to="/signup">Sign Up</Link></p>
            <Link to="/" className="home-link">← Back to Home</Link>
          </div>
        </div>
      </div>

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

export default LogIn;