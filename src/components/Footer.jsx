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
          <p>Handcrafted with ❤️ by Apoorva Tarsoliya</p>
          <p style={{ marginTop: '0.5rem', opacity: 0.6, fontSize: '0.8rem' }}>100% Custom Coded • No Templates Used</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
