// src/signup.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import './css/signup.css';
import { signUp, setCookie, initializePurchasedServices } from './Auth'; // Corrected import

function SignUp({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Call signUp function to register the user
      const { user, error } = await signUp(email, password);

      if (user) {
        // Set the userId in a cookie for persistent login
        setCookie("userId", user.uid, 7);  // Cookie expires in 7 days

        // Initialize empty purchasedServices array in the user's record (e.g., in Firestore)
        await initializePurchasedServices(user.uid);

        // Optionally store user info in state (or context)
        setIsAuthenticated(true, username);

        // Redirect to home page after signing up
        navigate('/');  // Redirect to home page after signup
      } else {
        setErrorMessage(error);  // Display error if signup failed
      }
    } catch (error) {
      setErrorMessage('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="signup">
      <Navbar />
      <div className="signup-page">
        <div className="signup-container">
          <h2>Sign Up</h2>
          <p>Create an account to access all features.</p>

          {/* Display error message if any */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form className="signup-form" onSubmit={handleSignUp}>
            <input 
              type="text" 
              placeholder="Username" 
              className="signup-input" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="signup-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="signup-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" className="signup-button">Sign Up</button>
          </form>

          <div className="signup-footer">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// **Ensure this is a default export**
export default SignUp;
