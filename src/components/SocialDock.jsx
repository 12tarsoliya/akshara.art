import React from 'react';
import { Linkedin, Instagram, MessageCircle } from 'lucide-react';
import './SocialDock.css';

const SocialDock = () => {
  return (
    <div className="social-dock-container">
      <div className="social-dock glass-panel">
        <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noreferrer" className="dock-item" aria-label="WhatsApp">
          <MessageCircle size={22} />
          <span className="tooltip">WhatsApp</span>
        </a>
        <div className="divider"></div>
        <a href="https://linkedin.com/in/tarsoliya12" target="_blank" rel="noreferrer" className="dock-item" aria-label="LinkedIn">
          <Linkedin size={22} />
          <span className="tooltip">LinkedIn</span>
        </a>
        <div className="divider"></div>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="dock-item" aria-label="Instagram">
          <Instagram size={22} />
          <span className="tooltip">Instagram</span>
        </a>
      </div>
    </div>
  );
};

export default SocialDock;
