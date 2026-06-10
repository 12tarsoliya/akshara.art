import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MessageSquare, X, Send, Sparkles, Plus, Eye, ShoppingBag } from 'lucide-react';
import { getCuratorResponse } from '../data/curatorEngine';
import { getPaintings } from '../data/paintings';
import { useCart } from '../context/CartContext';
import './FloatingCuratorChat.css';

const FloatingCuratorChat = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! I am Akshara Tarsoliya's AI Art Curator. I can help you find the perfect painting that aligns with your space, budget, and personal aesthetic.\n\nDescribe what you are looking for—feel free to mention colors, moods, budget limits (e.g. 12k), or specific rooms (like a bedroom or workspace)!",
      recommendations: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [paintings, setPaintings] = useState([]);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [hasNewMessageAlert, setHasNewMessageAlert] = useState(false);

  const messagesEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  // Load paintings from database
  useEffect(() => {
    setPaintings(getPaintings());
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Auto-alert effect to draw attention to chatbot on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasNewMessageAlert(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // If path is admin, do not render chatbot at all
  if (location.pathname === '/admin') {
    return null;
  }

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessageAlert(false);
  };

  const handleSend = (text) => {
    const query = text || inputValue;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: query, recommendations: [] };
    setMessages(prev => [...prev, userMsg]);
    if (!text) setInputValue('');

    // Trigger typing indicator
    setIsTyping(true);

    setTimeout(() => {
      // Get AI recommendations
      const response = getCuratorResponse(query, paintings);
      const botMsg = {
        sender: 'bot',
        text: response.reply,
        recommendations: response.recommendedPaintings || []
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  const suggestionChips = [
    "Calm pastel painting for bedroom under 10k",
    "Fiery red vibrant living room art",
    "Teal resin ocean wave piece"
  ];

  const selectedPaintingWhatsappUrl = selectedPainting
    ? `https://wa.me/910000000000?text=${encodeURIComponent(`Namaste Akshara, I am interested in acquiring your painting: "${selectedPainting.title}" (Price: ₹${selectedPainting.price.toLocaleString('en-IN')}). Please let me know its availability.`)}`
    : '';

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className={`floating-chat-trigger-container ${isOpen ? 'active' : ''}`}>
        {hasNewMessageAlert && !isOpen && (
          <div className="chat-tooltip glass-panel animate-fade-in">
            <span className="tooltip-sparkle"><Sparkles size={12} /></span>
            <span>Ask Akshara's AI Art Curator!</span>
            <button className="tooltip-close" onClick={(e) => { e.stopPropagation(); setHasNewMessageAlert(false); }}>
              <X size={12} />
            </button>
          </div>
        )}
        <button 
          className={`floating-chat-btn ${hasNewMessageAlert ? 'pulse-btn' : ''}`}
          onClick={handleToggleChat}
          aria-label="Toggle AI Curator Chat"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          {!isOpen && <span className="sparkle-overlay"><Sparkles size={14} /></span>}
        </button>
      </div>

      {/* Chat Window Panel */}
      <div className={`curator-chat-window glass-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-window-header">
          <div className="curator-avatar-status">
            <div className="curator-avatar">
              <Sparkles size={18} className="text-accent" />
            </div>
            <div className="curator-meta">
              <h3>AI Art Curator</h3>
              <p><span className="status-dot"></span> Online & reading gallery</p>
            </div>
          </div>
          <button className="chat-close-btn" onClick={handleToggleChat}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="chat-window-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message-row ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="chat-bubble-avatar">
                  <Sparkles size={12} />
                </div>
              )}
              <div className="chat-bubble-container">
                <div className="chat-bubble">
                  {msg.text.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="chat-text-para">{paragraph}</p>
                  ))}
                </div>

                {/* Recommendations Cards list */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="recommendations-container">
                    {msg.recommendations.map((painting) => (
                      <div key={painting.id} className="rec-card glass-panel animate-fade-in">
                        <div className="rec-card-image-box">
                          <img 
                            src={painting.image} 
                            alt={painting.title}
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                          />
                        </div>
                        <div className="rec-card-details">
                          <h4>{painting.title}</h4>
                          <span className="rec-card-price">₹{painting.price.toLocaleString('en-IN')}</span>
                          <p className="rec-card-medium">{painting.medium} • {painting.dimensions}</p>
                          
                          {painting.reason && (
                            <p className="rec-card-reason">
                              <strong>Curator Note:</strong> {painting.reason}
                            </p>
                          )}

                          <div className="rec-card-actions">
                            <button 
                              className="btn-rec-view"
                              onClick={() => setSelectedPainting(painting)}
                            >
                              <Eye size={14} /> View Details
                            </button>
                            <button 
                              className="btn-rec-buy"
                              onClick={() => addToCart(painting)}
                            >
                              <Plus size={14} /> Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-message-row bot">
              <div className="chat-bubble-avatar">
                <Sparkles size={12} />
              </div>
              <div className="chat-bubble typing-bubble">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length === 1 && !isTyping && (
          <div className="suggestion-chips-container">
            <p className="suggestion-label">Try asking:</p>
            <div className="chips-list">
              {suggestionChips.map((chip, idx) => (
                <button 
                  key={idx} 
                  className="suggestion-chip glass-panel"
                  onClick={() => handleSuggestionClick(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Footer Area */}
        <div className="chat-window-footer">
          <input
            type="text"
            placeholder="Type your preferences..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <button 
            className="chat-send-btn" 
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send query"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Lightbox Details Modal */}
      {selectedPainting && (
        <div className="curator-lightbox-overlay" onClick={() => setSelectedPainting(null)}>
          <div className="curator-lightbox-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedPainting(null)} aria-label="Close Lightbox">
              <X size={24} />
            </button>
            <div className="lightbox-content-grid">
              <div className="lightbox-image-container">
                <img 
                  src={selectedPainting.image} 
                  alt={selectedPainting.title} 
                  className="lightbox-image"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                />
                <div className="anti-screenshot-indicator">Protected Artwork Preview</div>
              </div>
              <div className="lightbox-info-container">
                <div className="lightbox-header">
                  <span className="artist-label">Original Artwork by Akshara Tarsoliya</span>
                  <h2>{selectedPainting.title}</h2>
                  <div className="lightbox-price-tag">₹{selectedPainting.price.toLocaleString('en-IN')}</div>
                </div>
                
                <div className="lightbox-specs">
                  <div className="spec-row">
                    <span className="spec-label">Medium:</span>
                    <span className="spec-val">{selectedPainting.medium}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Dimensions:</span>
                    <span className="spec-val">{selectedPainting.dimensions}</span>
                  </div>
                </div>

                {selectedPainting.description && (
                  <div className="lightbox-description">
                    <h3>Artwork Narrative</h3>
                    <p>{selectedPainting.description}</p>
                  </div>
                )}

                <div className="lightbox-actions">
                  <button 
                    className="btn-primary flex items-center justify-center gap-2 w-full"
                    onClick={() => {
                      addToCart(selectedPainting);
                      setSelectedPainting(null); // Close lightbox upon adding
                    }}
                  >
                    <ShoppingBag size={18} /> Buy Now
                  </button>
                  <a 
                    href={selectedPaintingWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline flex items-center justify-center gap-2 w-full"
                    style={{ marginTop: '0.5rem', textDecoration: 'none' }}
                  >
                    <MessageCircle size={18} /> Enquire on WhatsApp
                  </a>
                  <Link
                    to={`/artwork/${selectedPainting.id}`}
                    className="btn-outline flex items-center justify-center gap-2 w-full"
                    style={{ marginTop: '0.5rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                    onClick={() => setSelectedPainting(null)}
                  >
                    <Eye size={18} /> View Full Details Page
                  </Link>
                  <button 
                    className="btn-outline flex items-center justify-center gap-2 w-full"
                    style={{ marginTop: '0.5rem', opacity: 0.7 }}
                    onClick={() => setSelectedPainting(null)}
                  >
                    Keep Chatting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCuratorChat;
