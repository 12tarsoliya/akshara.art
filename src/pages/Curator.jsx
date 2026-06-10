import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, X, ShoppingCart, Maximize2, Palette, Smile, DollarSign, Home as HomeIcon } from 'lucide-react';
import { getPaintings } from '../data/paintings';
import { getCuratorResponse } from '../data/curatorEngine';
import { useCart } from '../context/CartContext';
import './Curator.css';

const Curator = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'curator',
      text: "Namaste! I am Akshara's AI Art Curator. Let's find the perfect piece for your collection. Describe the kind of painting you are looking for—including style, colors, room type, mood, or budget. \n\nFor example, you could say: \"Looking for a calm, blue painting for my bedroom under 15,000\" or \"Show me something vibrant and energetic with red colors.\"",
      recommendations: []
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [paintings, setPaintings] = useState([]);
  
  const { addToCart } = useCart();
  const chatEndRef = useRef(null);

  // Load paintings
  useEffect(() => {
    setPaintings(getPaintings());
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      recommendations: []
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');

    // Trigger typing state
    setIsTyping(true);

    setTimeout(() => {
      // Analyze and respond
      const result = getCuratorResponse(text, paintings);
      
      const curatorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'curator',
        text: result.reply,
        recommendations: result.recommendedPaintings
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, curatorMessage]);
    }, 1200); // Realistic typing delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Quick suggestion chips
  const suggestions = [
    { label: "Calming bedroom art", query: "Find a calm and peaceful painting for my bedroom" },
    { label: "Vibrant with gold accents", query: "Looking for abstract paintings with gold and vibrant colors" },
    { label: "Affordable under ₹12,000", query: "Show me paintings under 12,000 budget" },
    { label: "Ocean resin waves", query: "I want an ocean themed resin painting for a relaxing mood" }
  ];

  return (
    <div className="curator-container">
      <div className="curator-page container animate-fade-in">
        <div className="curator-layout">
        {/* Left Side: Curator Info & Suggestions */}
        <div className="curator-info-panel glass-panel">
          <div className="curator-header-block">
            <div className="sparkle-badge">
              <Sparkles size={16} />
              <span>AI Curation Service</span>
            </div>
            <h1>Your Digital Art Curator</h1>
            <p className="curator-tagline">
              Discover original paintings that resonate with your inner state, space constraints, and style preferences.
            </p>
          </div>

          <div className="curator-instructions">
            <h3>How to describe your perfect art:</h3>
            <ul>
              <li>
                <Palette size={16} className="text-accent" />
                <span><strong>Colors:</strong> Gold, Blue, Red, Pastels</span>
              </li>
              <li>
                <Smile size={16} className="text-accent" />
                <span><strong>Mood:</strong> Calming, Energetic, Hopeful</span>
              </li>
              <li>
                <HomeIcon size={16} className="text-accent" />
                <span><strong>Room:</strong> Living room, Bedroom, Office, Bath</span>
              </li>
              <li>
                <DollarSign size={16} className="text-accent" />
                <span><strong>Budget:</strong> Under 10k, around 15,000, etc.</span>
              </li>
            </ul>
          </div>

          <div className="curator-suggestions">
            <h3>Quick Prompts</h3>
            <div className="suggestion-chips">
              {suggestions.map((chip, i) => (
                <button
                  key={i}
                  className="chip-btn"
                  onClick={() => handleSendMessage(chip.query)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Chat System */}
        <div className="curator-chat-panel glass-panel">
          <div className="chat-header">
            <div className="curator-avatar-wrapper">
              <div className="curator-avatar">AT</div>
              <div className="avatar-status"></div>
            </div>
            <div>
              <h3>Akshara's Curator</h3>
              <p className="chat-status">Online • Ready to assist</p>
            </div>
          </div>

          <div className="chat-messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}-row`}>
                <div className={`message-bubble ${msg.sender}-bubble`}>
                  <p className="message-text">{msg.text}</p>
                  
                  {/* Recommendations */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="recommendations-container">
                      {msg.recommendations.map((rec) => (
                        <div key={rec.id} className="rec-card glass-panel">
                          <img src={rec.image} alt={rec.title} className="rec-card-thumb" />
                          <div className="rec-card-content">
                            <div className="rec-card-header">
                              <h4>{rec.title}</h4>
                              <span className="rec-card-price">₹{rec.price.toLocaleString('en-IN')}</span>
                            </div>
                            <p className="rec-card-medium">{rec.medium} • {rec.dimensions}</p>
                            <p className="rec-card-reason">
                              <strong>Curator's Note:</strong> {rec.reason}
                            </p>
                            <button
                              className="view-rec-btn"
                              onClick={() => setSelectedPainting(rec)}
                            >
                              <Maximize2 size={13} /> View Painting
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-row curator-row">
                <div className="message-bubble curator-bubble typing-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-bar">
            <input
              type="text"
              placeholder="Describe your ideal painting (mood, style, room, color...)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isTyping}
            />
            <button 
              className="send-btn btn-primary" 
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox / Preview Modal */}
      {selectedPainting && (
        <div className="curator-modal-overlay" onClick={() => setSelectedPainting(null)}>
          <div className="curator-modal-content glass-panel animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPainting(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-grid">
              <div className="modal-image-pane">
                <img 
                  src={selectedPainting.image} 
                  alt={selectedPainting.title} 
                  className="modal-image"
                  draggable="false"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                />
              </div>
              <div className="modal-details-pane">
                <div>
                  <span className="modal-artist">{selectedPainting.artist}</span>
                  <h2 className="modal-title">{selectedPainting.title}</h2>
                  <div className="modal-price">₹{selectedPainting.price.toLocaleString('en-IN')}</div>
                  
                  <div className="modal-specs">
                    <div className="spec-item">
                      <span className="spec-label">Medium</span>
                      <span className="spec-value">{selectedPainting.medium}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Dimensions</span>
                      <span className="spec-value">{selectedPainting.dimensions}</span>
                    </div>
                  </div>

                  <p className="modal-description">{selectedPainting.description}</p>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn-primary modal-cart-btn"
                    onClick={() => {
                      addToCart(selectedPainting);
                      setSelectedPainting(null);
                    }}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Curator;
