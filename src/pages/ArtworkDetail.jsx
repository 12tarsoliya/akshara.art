import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getPaintings } from '../data/paintings';
import { ArrowLeft, ShoppingBag, MessageCircle, Shield, CheckCircle, Tag, Ruler, Palette, FileText } from 'lucide-react';
import './ArtworkDetail.css';

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  
  const [painting, setPainting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const list = getPaintings();
    const found = list.find(p => p.id.toString() === id.toString());
    setPainting(found || null);
    setLoading(false);
    
    // Scroll to top when loading a new artwork detail page
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="artwork-detail-container container loading-state">
        <div className="spinner-loader"></div>
        <p>Loading artwork details...</p>
      </div>
    );
  }

  if (!painting) {
    return (
      <div className="artwork-detail-container container error-state glass-panel">
        <h2>Artwork Not Found</h2>
        <p>The painting you are trying to view does not exist or has been removed from Akshara's collection.</p>
        <Link to="/shop" className="btn-primary flex items-center gap-2" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
          <ArrowLeft size={16} /> Return to Gallery
        </Link>
      </div>
    );
  }

  // Real-time Availability checking based on current Cart state
  const isAlreadyInCart = cartItems.some(item => item.id === painting.id);
  const availabilityStatus = isAlreadyInCart ? "Reserved in Cart" : "Available for Acquisition";

  // WhatsApp link generator
  const whatsappText = encodeURIComponent(`Namaste Akshara, I am interested in acquiring your painting: "${painting.title}" (Price: ₹${painting.price.toLocaleString('en-IN')}). Please let me know its availability.`);
  const whatsappUrl = `https://wa.me/910000000000?text=${whatsappText}`;

  // Parse tags
  const tagsArray = painting.tags 
    ? painting.tags.split(',').map(t => t.trim()) 
    : [painting.medium.toLowerCase(), "original", "akshara-art"];

  return (
    <div className="artwork-detail-container container">
      {/* Return Navigation */}
      <div className="detail-navigation">
        <button onClick={() => navigate(-1)} className="btn-back flex items-center gap-2">
          <ArrowLeft size={18} /> Back to previous page
        </button>
        <span className="nav-separator">/</span>
        <span className="nav-current-title">{painting.title}</span>
      </div>

      {/* Main Details Grid */}
      <div className="artwork-detail-grid">
        
        {/* Left Side: HD Image Display with Protection */}
        <div className="artwork-image-column glass-panel">
          <div className="artwork-hd-wrapper">
            <img 
              src={painting.image} 
              alt={painting.title}
              className="artwork-hd-image"
              loading="eager"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            />
            <div className="watermark-overlay">Akshara Tarsoliya ©</div>
          </div>
          <div className="protection-badge">
            <Shield size={14} className="text-accent" />
            <span>Digital Protection Enabled (Screenshot & Copy Prevention Active)</span>
          </div>
        </div>

        {/* Right Side: Specifications & Notes */}
        <div className="artwork-info-column">
          <div className="artwork-meta-header">
            <span className="artist-badge">Original Masterpiece by Akshara Tarsoliya</span>
            <h1 className="artwork-title-main">{painting.title}</h1>
            <div className="price-availability-row">
              <span className="artwork-price-tag">₹{painting.price.toLocaleString('en-IN')}</span>
              <span className={`availability-status-pill ${isAlreadyInCart ? 'reserved' : 'available'}`}>
                <span className="status-indicator-dot"></span>
                {availabilityStatus}
              </span>
            </div>
          </div>

          {/* Core Specifications Table */}
          <div className="specs-table glass-panel">
            <h3>Technical Specifications</h3>
            <div className="spec-table-row">
              <div className="spec-cell label">
                <Palette size={16} className="text-accent" />
                <span>Medium</span>
              </div>
              <div className="spec-cell value">{painting.medium}</div>
            </div>
            <div className="spec-table-row">
              <div className="spec-cell label">
                <Ruler size={16} className="text-accent" />
                <span>Dimensions</span>
              </div>
              <div className="spec-cell value">{painting.dimensions}</div>
            </div>
            <div className="spec-table-row">
              <div className="spec-cell label">
                <CheckCircle size={16} className="text-accent" />
                <span>Certificate</span>
              </div>
              <div className="spec-cell value">Signed by the artist (Includes Certificate of Authenticity)</div>
            </div>
          </div>

          {/* Narrative / Artist Notes */}
          <div className="artwork-narrative">
            <div className="narrative-header">
              <FileText size={18} className="text-accent" />
              <h3>Artist Notes & Concept Narrative</h3>
            </div>
            <p className="narrative-text">{painting.description || "Ye painting Akshara Tarsoliya ke naye vicharo aur bhavnao ko pradarshit karti hai."}</p>
          </div>

          {/* Action Callouts */}
          <div className="artwork-acquisitions-actions">
            <button 
              className="btn-primary buy-now-action-btn flex items-center justify-center gap-2"
              onClick={() => addToCart(painting)}
            >
              <ShoppingBag size={20} />
              <span>{isAlreadyInCart ? "Add Another to Cart" : "Buy Now (Add to Cart)"}</span>
            </button>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-outline whatsapp-action-btn flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>

          {/* Metadata Tags */}
          <div className="artwork-tags-section">
            <div className="tags-header">
              <Tag size={14} className="text-accent" />
              <span>Categorized Tags</span>
            </div>
            <div className="artwork-tags-list">
              {tagsArray.map((tag, idx) => (
                <span key={idx} className="artwork-tag-pill glass-panel">#{tag}</span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ArtworkDetail;
