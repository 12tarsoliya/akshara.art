import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer border-t border-glass">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>Akshara<span className="text-accent">.</span></h3>
          <p>Where Emotion Meets Canvas.</p>
        </div>
        <div className="footer-links">
          <p>© {new Date().getFullYear()} Akshara Art. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
