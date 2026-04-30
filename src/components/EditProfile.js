import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (userDoc.exists()) {
            setDisplayName(userDoc.data().displayName || "");
            setSkinTone(userDoc.data().skinTone || "");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    setSaveLoading(true);
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, {
        displayName: displayName,
        skinTone: skinTone,
        updatedAt: new Date()
      }, { merge: true });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Save Error:", err);
      alert("Failed to save changes.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("CRITICAL: This will permanently delete your account and all associated data. Proceed?")) {
      try {
        const user = auth.currentUser;
        
        // 1. Delete the Firestore data first
        await deleteDoc(doc(db, "users", user.uid));
        
        // 2. Attempt to delete the Auth account
        await deleteUser(user);
        
        alert("Account deleted successfully.");
        navigate("/signup");
      } catch (err) {
        console.error("Delete Error:", err.code);
        
        // 3. Handle the Security Timeout (Recent Login Requirement)
        if (err.code === 'auth/requires-recent-login') {
          alert("Security Check: For your protection, you must have logged in recently to delete your account. Redirecting you to login...");
          navigate("/login");
        } else {
          alert("An error occurred during deletion. Please try again later.");
        }
      }
    }
  };

  if (loading) return (
    <div className="login-page-beige">
      <div className="login-card-light">
        <p className="loading-text">Loading secure profile...</p>
      </div>
    </div>
  );

  return (
    <div className="login-page-beige">
      <div className="login-card-light">
        <div className="blue-accent-bar"></div>
        <h1>{displayName ? `${displayName}'s Profile` : "Profile Settings"}</h1>
        <p className="subtitle">Manage your account and research preferences.</p>
        
        <div className="user-email-display">
          Connected as: <strong>{auth.currentUser?.email}</strong>
        </div>

        <div className="input-field">
          <label>Display Name</label>
          <input 
            type="text"
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)} 
            placeholder="Enter your name"
          />
        </div>

        <div className="input-field">
          <label>Skin Tone Selection</label>
          <select value={skinTone} onChange={(e) => setSkinTone(e.target.value)}>
            <option value="">-- Select Tone --</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        <button 
          className="login-btn-blue" 
          onClick={handleSaveChanges} 
          disabled={saveLoading}
        >
          {saveLoading ? "Saving..." : "Save Changes"}
        </button>

        <div className="profile-footer">
          <button className="delete-link" onClick={handleDeleteAccount}>
            Delete Account Permanently
          </button>
          <Link to="/" className="home-link">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;