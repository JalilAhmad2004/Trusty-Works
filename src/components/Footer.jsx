// src/components/Footer.jsx

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="footer-bottom">
        <p>&copy; 2024 Trusty Works. All Rights Reserved.</p>
      </div>
      <div className="footer-content">
        <div className="footer-section">
          <h2>Trusty Works</h2>
          <p>Your reliable partner in academic and project solutions.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>Phone: 123-456-7890</p>
          <p>Email: info@myuniv.ac.uk</p>
          <p>Address: 500 Terry Francine Street, San Francisco, CA 94158</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
