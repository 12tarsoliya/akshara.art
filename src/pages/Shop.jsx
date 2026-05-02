import React, { useState, useEffect } from 'react';
import PaintingCard from '../components/PaintingCard';
import { getPaintings } from '../data/paintings';
import './Shop.css';

const Shop = () => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    setPaintings(getPaintings());
  }, []);

  return (
    <div className="shop-container container">
      <div className="shop-header">
        <h1 className="shop-title">The Gallery</h1>
        <p className="shop-description">Explore original works and limited editions available for acquisition.</p>
      </div>

      <div className="masonry-grid">
        {paintings.map((painting, index) => (
          <div key={painting.id} style={{ animationDelay: `${index * 0.1}s` }}>
            <PaintingCard painting={painting} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
