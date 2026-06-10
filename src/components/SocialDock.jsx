import React from 'react';
import { MessageCircle } from 'lucide-react';
import './SocialDock.css';

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/-2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/-2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const SocialDock = () => {
  return (
    <div className="social-dock-container">
      <div className="social-dock glass-panel">
        <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noreferrer" className="dock-item" aria-label="WhatsApp">
          <MessageCircle size={22} />
          <span className="tooltip">WhatsApp</span>
        </a>
        <div className="divider"></div>
        <a href="https://www.linkedin.com/in/akshara-tarsoliya-b6455030a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="dock-item" aria-label="LinkedIn">
          <LinkedinIcon />
          <span className="tooltip">LinkedIn</span>
        </a>
        <div className="divider"></div>
        <a href="https://www.instagram.com/arti.stoul?igsh=MTVqdm0wb3o3NnZqeQ==" target="_blank" rel="noreferrer" className="dock-item" aria-label="Instagram">
          <InstagramIcon />
          <span className="tooltip">Instagram</span>
        </a>
      </div>
    </div>
  );
};

export default SocialDock;
