import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import './css/login.css';
import { login } from './Auth'; // Import login function from Auth

// Utility function to set data in localStorage
function setLocalStorage(key, value) {
  localStorage.setItem(key, value); // Store user info in localStorage
}

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login function with the username and password
      const { user, error } = await login(username, password);

      if (user) {
        // If user is authenticated, set the authentication state and user info
        console.log('User logged in: ', user);

        // Call the setIsAuthenticated function with username and password for checking admin
        setIsAuthenticated(true, username, password); 

        // Redirect to the services page after login
        navigate('/services');
      } else {
        setErrorMessage(error || 'Invalid credentials');  // Display error if login failed
      }
    } catch (error) {
      setErrorMessage('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login">
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <h2>Log In</h2>
          <p>Welcome back! Please log in to continue.</p>

          {/* Display error message if any */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form className="login-form" onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Email" 
              className="login-input" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="login-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" className="login-button">Log In</button>
          </form>

          <div className="login-footer">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
