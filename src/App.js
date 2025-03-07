import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './home';
import SignUp from './signup';
import Login from './login';
import Services from './services';
import Projects from './projects';
import ContactUs from './contact'; 

function App() {
  const adminCredentials = {
    username: 'admin@gmail.com',
    password: 'admin112233'
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    // Check authentication status and admin role on initial load
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []); // Only run on initial render

  const handleAuthentication = (status, username = '', password = '') => {
    // Set isAuthenticated to true for all users
    setIsAuthenticated(status);
    localStorage.setItem('isAuthenticated', status);

    // Set isAdmin only if the credentials match the admin credentials
    const isAdminUser = username === adminCredentials.username && password === adminCredentials.password;
    setIsAdmin(isAdminUser);
    localStorage.setItem('isAdmin', isAdminUser);

    if (!isAdminUser && !status) {
      alert('Invalid credentials');
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={handleAuthentication} />} />
          <Route path="/login" element={<Login setIsAuthenticated={handleAuthentication} />} />

          {/* Protected Routes */}
          <Route 
            path="/services" 
            element={
              isAuthenticated ? (
                <Services isAdmin={isAdmin} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/projects" 
            element={
              isAuthenticated ? (
                <Projects isAdmin={isAdmin} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/contact" 
            element={
              isAuthenticated ? (
                <ContactUs />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Catch-All for Undefined Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
