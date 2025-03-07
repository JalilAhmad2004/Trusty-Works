// src/ContactUs.jsx

import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import './css/contact.css';
import { FaWhatsapp } from 'react-icons/fa'; // Import Font Awesome WhatsApp icon

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <Navbar />
      <div className="contact-us-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>23, Avenue de Paris<br />75012 Paris</p>
          <p>hello@example.com</p>
          <p>+33619530144</p>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <p>Feel free to drop us a line below!</p>
          <form>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea placeholder="Type your message here..." required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <Footer />
      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/+923279546260" // Replace with actual WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default ContactUs;
