import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CodeAstra
        </Link>
        <ul className="nav-menu">
          {location.pathname === '/' && (
            <>
              <li className="nav-item">
                <a onClick={() => scrollToSection('features')} className="nav-links">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a onClick={() => scrollToSection('how-it-works')} className="nav-links">
                  How It Works
                </a>
              </li>
              <li className="nav-item">
                <a onClick={() => scrollToSection('about')} className="nav-links">
                  About
                </a>
              </li>
            </>
          )}

          {!token && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links-btn">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-links-btn">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;