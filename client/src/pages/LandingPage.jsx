import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LandingPage.css';
import { FaCode, FaRocket, FaShieldAlt, FaBolt, FaUsers, FaCheckCircle, FaArrowRight, FaStar, FaBug, FaLightbulb, FaChartLine } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleTryDemo = () => {
    navigate('/login');
  };

  const handleGetApp = () => {
    alert('Coming Soon! 🚀\n\nOur mobile app is currently in development. Stay tuned for updates!');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      
      <header className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-title">
              Ready to Code
              <span className="highlight-text"> Smarter Today?</span>
            </h1>
            <p className="hero-subtitle">
              AI-Powered • Bug-Free • Performance-Optimized • Secure
            </p>
            <p className="hero-description">
              Your personal code review companion that adapts to your style, finds bugs instantly, and helps you write cleaner code - in any language.
            </p>
            <div className="hero-buttons">
              <button className="btn-get-started" onClick={handleGetStarted}>
                Get Started
              </button>
              <button className="btn-get-app" onClick={handleGetApp}>
                Get App Now
              </button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-image-placeholder">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>CodeAstra Review</span>
                </div>
                <div className="window-content">
                  <div className="review-item good">
                    <FaCheckCircle /> Code quality: Excellent
                  </div>
                  <div className="review-item warning">
                    <FaBug /> 2 potential bugs found
                  </div>
                  <div className="review-item suggestion">
                    <FaLightbulb /> 5 optimization suggestions
                  </div>
                  <div className="review-item performance">
                    <FaChartLine /> Performance score: 94/100
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="what-we-provide-section">
        <div className="container">
          <h2 className="section-title">What We Provide To Developers?</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-logo">01</div>
              <h3>Bug Detection</h3>
              <p>Smart Learning algorithms that find bugs before they reach production</p>
            </div>
            <div className="service-card">
              <div className="service-logo">02</div>
              <h3>Code Quality</h3>
              <p>Learning Path Generator that improves your coding standards</p>
            </div>
            <div className="service-card">
              <div className="service-logo">03</div>
              <h3>Performance</h3>
              <p>Skill Fusion AI that optimizes your code performance</p>
            </div>
            <div className="service-card">
              <div className="service-logo">04</div>
              <h3>Security Scan</h3>
              <p>Logic AI that detects security vulnerabilities</p>
            </div>
            <div className="service-card">
              <div className="service-logo">05</div>
              <h3>Best Practices</h3>
              <p>On Skill Course Suggestions for better coding practices</p>
            </div>
            <div className="service-card">
              <div className="service-logo">06</div>
              <h3>AI Assistant</h3>
              <p>Certified For Brain development with smart suggestions</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-helps-section">
        <div className="container">
          <h2 className="section-title">How CodeAstra Helps You Code Smarter?</h2>
          <div className="help-content">
            <div className="help-text">
              <h3>Tell Us Your Goals</h3>
              <p>Share your code and let our AI understand your coding style, project requirements, and improvement goals.</p>
            </div>
            <div className="help-visual">
              <div className="goal-input">
                <div className="input-field">
                  <span>Enter your code...</span>
                </div>
                <div className="analysis-preview">
                  <div className="analysis-item">🔍 Analyzing syntax...</div>
                  <div className="analysis-item">🛡️ Checking security...</div>
                  <div className="analysis-item">⚡ Optimizing performance...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Built by Developers, for Developers</h2>
              <p>
                CodeAstra was created by a team of experienced software engineers who understand 
                the challenges of maintaining high-quality code in fast-paced development environments.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <FaCheckCircle className="check-icon" />
                  <span>Trusted by 10,000+ developers worldwide</span>
                </div>
                <div className="about-feature">
                  <FaCheckCircle className="check-icon" />
                  <span>99.9% uptime with enterprise-grade security</span>
                </div>
                <div className="about-feature">
                  <FaCheckCircle className="check-icon" />
                  <span>Continuous learning AI that improves over time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Code?</h2>
            <p>Join thousands of developers who are already writing better code with CodeAstra</p>
            <button className="btn-primary large" onClick={handleGetStarted}>
              <span>Start Your Free Trial</span>
              <FaArrowRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>CodeAstra</h3>
              <p>AI-powered code review for modern developers</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#how-it-works">How it Works</a>
                <a href="/login">Demo</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#">Contact</a>
                <a href="#">Privacy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 CodeAstra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;