import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';
import './PaintingCard.css';

const PaintingCard = ({ painting }) => {
  const { addToCart } = useCart();

  return (
    <div className="painting-card animate-fade-in">
      <div className="card-image-wrapper">
        <img src={painting.image} alt={painting.title} className="card-image" loading="lazy" />
        <div className="card-overlay glass-panel">
          <button className="add-to-cart-btn" onClick={() => addToCart(painting)}>
            <Plus size={20} /> Add to Cart
          </button>
        </div>
      </div>
      <div className="card-info">
        <div className="card-header">
          <h3 className="card-title">{painting.title}</h3>
          <span className="card-price">${painting.price}</span>
        </div>
        <p className="card-artist">{painting.artist}</p>
        <p className="card-medium">{painting.medium} • {painting.dimensions}</p>
      </div>
    </div>
  );
};

export default PaintingCard;
