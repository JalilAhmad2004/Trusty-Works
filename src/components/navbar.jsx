// src/components/Navbar.jsx

import React from 'react';
import logo from '../images/trusty.png';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <img src={logo} alt="Trusty Works Logo" className="navbar-logo" />
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/signup">Sign Up</a>
        <a href="/services">Services</a>
        <a href="/projects">Projects</a>
        <a href="/contact">Contact Us</a>
      </nav>
    </header>
  );
};

export default Navbar;
