import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          <p className="hero-subtitle">The Akshara Collection</p>
          <h1 className="hero-title">Where Emotion <br/><span className="text-accent">Meets Canvas</span></h1>
          <p className="hero-description">
            Discover a curated selection of premium artworks, each piece telling a unique story through masterful strokes and captivating colors.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-primary flex items-center gap-2">
              Explore Collection <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <div className="hero-image-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="hero-image-container glass-panel">
            <img 
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Featured Artwork" 
              className="hero-image"
            />
            <div className="featured-badge">Featured Piece</div>
          </div>
          <div className="glow-effect"></div>
        </div>
      </section>
      
      <section className="about-preview container">
        <div className="about-grid">
          <div className="about-text">
            <h2>The Vision</h2>
            <p>Every stroke is a word, every color a sentence. Akshara brings forth the unspoken emotions through a blend of contemporary and abstract forms. This gallery is a testament to the journey of finding beauty in the abstract.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card glass-panel">
              <h3>50+</h3>
              <p>Original Works</p>
            </div>
            <div className="stat-card glass-panel">
              <h3>3</h3>
              <p>Exhibitions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
