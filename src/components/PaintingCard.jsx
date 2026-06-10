import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import './PaintingCard.css';

const PaintingCard = ({ painting }) => {
  const { addToCart } = useCart();

  const whatsappText = encodeURIComponent(`Namaste Akshara, I am interested in acquiring your painting: "${painting.title}" (Price: ₹${painting.price.toLocaleString('en-IN')}). Please let me know its availability.`);
  const whatsappUrl = `https://wa.me/910000000000?text=${whatsappText}`;

  return (
    <div className="painting-card animate-fade-in">
      <Link to={`/artwork/${painting.id}`} className="card-image-link">
        <div className="card-image-wrapper">
          <img 
            src={painting.image} 
            alt={painting.title} 
            className="card-image" 
            loading="lazy" 
            draggable="false"
            style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', pointerEvents: 'none' }}
          />
          <div className="card-overlay glass-panel">
            <span className="view-details-overlay-btn">View Details</span>
          </div>
        </div>
      </Link>
      <div className="card-info">
        <div className="card-header">
          <Link to={`/artwork/${painting.id}`} className="card-title-link">
            <h3 className="card-title">{painting.title}</h3>
          </Link>
          <span className="card-price">₹{painting.price.toLocaleString('en-IN')}</span>
        </div>
        <p className="card-artist">{painting.artist}</p>
        <p className="card-medium">{painting.medium} • {painting.dimensions}</p>
        {painting.description && (
          <p className="card-description" style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.8, lineHeight: '1.4' }}>
            {painting.description.length > 90 ? `${painting.description.substring(0, 90)}...` : painting.description}
          </p>
        )}
        
        {/* Buy Now & WhatsApp Actions */}
        <div className="card-cta-row">
          <button className="btn-buy-now btn-primary" onClick={() => addToCart(painting)}>
            <ShoppingBag size={14} /> Buy Now
          </button>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp btn-outline">
            <MessageCircle size={14} /> Enquire
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaintingCard;
